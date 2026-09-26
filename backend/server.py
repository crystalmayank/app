import asyncio
import logging
import os
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter
from pydantic import BaseModel, Field, EmailStr
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from lib.db import client, db, ensure_indexes
from lib.emailer import send_signup_emails


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
