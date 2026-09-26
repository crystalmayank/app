import asyncio
import csv
import io
import logging
import os
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Optional

import bcrypt
import jwt
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel, Field, EmailStr
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from lib.db import client, db, ensure_indexes
from lib.emailer import send_signup_emails

JWT_ALGORITHM = "HS256"
JWT_SECRET = os.environ.get("JWT_SECRET")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "").lower()
ADMIN_PASSWORD_HASH = os.environ.get("ADMIN_PASSWORD_HASH", "")

MAX_ATTEMPTS = 5
LOCK_MINUTES = 15
TOKEN_HOURS = 12


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.index_task = asyncio.create_task(ensure_indexes())
    yield
    client.close()


app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")


class NotifyRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    city: str = Field(min_length=1, max_length=120)
    family_size: int = Field(ge=1, le=50)
    role: str = Field(min_length=1, max_length=60)


class NotifyResponse(BaseModel):
    ok: bool
    message: str
    total: int
    already_registered: bool = False


class StatsResponse(BaseModel):
    signups: int
    brochure_downloads: int
    catalogue_downloads: int
    preview_clicks: int


class AnalyticsEvent(BaseModel):
    event: str = Field(min_length=1, max_length=80)
    label: Optional[str] = Field(default=None, max_length=160)


class AnalyticsResponse(BaseModel):
    ok: bool


class AdminLoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class AdminLoginResponse(BaseModel):
    ok: bool
    token: str
    email: str


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except ValueError:
        return False


def create_admin_token(email: str) -> str:
    payload = {
        "sub": "quircle-owner",
        "email": email,
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(hours=TOKEN_HOURS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_admin(request: Request) -> dict:
    auth = request.headers.get("Authorization", "")
    token = auth[7:] if auth.startswith("Bearer ") else None
    if not token or not JWT_SECRET:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    if payload.get("type") != "access" or payload.get("email", "").lower() != ADMIN_EMAIL:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"email": payload["email"]}


def serialize_signup(doc: dict) -> dict:
    created = doc.get("created_at")
    return {
        "name": doc.get("name", ""),
        "email": doc.get("email", ""),
        "city": doc.get("city", ""),
        "family_size": doc.get("family_size", ""),
        "role": doc.get("role", ""),
        "created_at": created.isoformat() if isinstance(created, datetime) else str(created or ""),
    }


@api_router.get("/")
async def root():
    return {"message": "Quircle API"}


@api_router.post("/notify", response_model=NotifyResponse)
async def create_notify(input: NotifyRequest):
    email = input.email.lower()
    existing = await db.notify_signups.find_one({"email": email})
    if not existing:
        doc = input.model_dump()
        doc["email"] = email
        doc["id"] = str(uuid.uuid4())
        doc["created_at"] = datetime.now(timezone.utc)
        await db.notify_signups.insert_one(doc)
        asyncio.create_task(
            send_signup_emails(input.name.strip(), email, input.city.strip(), input.family_size, input.role)
        )
    total = await db.notify_signups.count_documents({})
    message = "You are already on the list." if existing else "You are on the list. We will write to you soon."
    return NotifyResponse(ok=True, message=message, total=total, already_registered=bool(existing))


@api_router.get("/stats", response_model=StatsResponse)
async def get_stats():
    signups = await db.notify_signups.count_documents({})
    brochure = await db.analytics_events.count_documents({"event": "brochure_download"})
    catalogue = await db.analytics_events.count_documents({"event": "catalogue_download"})
    previews = await db.analytics_events.count_documents({"event": "preview_click"})
    return StatsResponse(
        signups=signups,
        brochure_downloads=brochure,
        catalogue_downloads=catalogue,
        preview_clicks=previews,
    )


@api_router.post("/analytics/event", response_model=AnalyticsResponse)
async def track_event(ev: AnalyticsEvent):
    await db.analytics_events.insert_one({
        "id": str(uuid.uuid4()),
        "event": ev.event,
        "label": ev.label,
        "created_at": datetime.now(timezone.utc),
    })
    return AnalyticsResponse(ok=True)


@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(input: AdminLoginRequest, request: Request):
    email = input.email.lower()
    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:{email}"
    now = datetime.now(timezone.utc)
    attempts = await db.login_attempts.find_one({"identifier": identifier})
    if attempts and attempts.get("locked_until"):
        locked_until = datetime.fromisoformat(attempts["locked_until"])
        if locked_until > now:
            raise HTTPException(status_code=429, detail="Too many attempts. Try again in 15 minutes.")

    ok = bool(ADMIN_PASSWORD_HASH) and email == ADMIN_EMAIL and verify_password(input.password, ADMIN_PASSWORD_HASH)
    if not ok:
        count = (attempts.get("count", 0) if attempts else 0) + 1
        update = {"identifier": identifier, "count": count}
        if count >= MAX_ATTEMPTS:
            update["locked_until"] = (now + timedelta(minutes=LOCK_MINUTES)).isoformat()
        await db.login_attempts.update_one({"identifier": identifier}, {"$set": update}, upsert=True)
        raise HTTPException(status_code=401, detail="Invalid email or password")

    await db.login_attempts.delete_one({"identifier": identifier})
    return AdminLoginResponse(ok=True, token=create_admin_token(email), email=email)


@api_router.get("/admin/signups")
async def admin_signups(admin: dict = Depends(get_admin)):
    docs = await db.notify_signups.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    signups = [serialize_signup(d) for d in docs]
    return {"total": len(signups), "signups": signups}


@api_router.get("/admin/signups.csv")
async def admin_signups_csv(admin: dict = Depends(get_admin)):
    docs = await db.notify_signups.find({}, {"_id": 0}).sort("created_at", -1).to_list(5000)
    buf = io.StringIO()
    writer = csv.writer(buf)
    writer.writerow(["name", "email", "city", "family_size", "role", "created_at"])
    for d in docs:
        row = serialize_signup(d)
        writer.writerow([row["name"], row["email"], row["city"], row["family_size"], row["role"], row["created_at"]])
    return Response(
        content=buf.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=quircle-signups.csv"},
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
