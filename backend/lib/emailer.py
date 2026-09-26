"""Managed email sending for Quircle signups (Emergent Resend proxy)."""

import ipaddress
import logging
import os
import re
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse

import httpx

logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Quircle")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")

SITE_URL = "https://quircle-hub.preview.emergentagent.com"

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY not set; skipping email to %s", to)
        return None
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        email_id = resp.json().get("id")
        logger.info("Email sent to %s (id=%s)", to, email_id)
        return email_id
    except Exception as exc:
        logger.error("Email send failed to %s: %s", to, exc)
        return None


def _welcome_html(name: str) -> str:
    n = escape(name)
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="background:#FFF8F3;padding:32px 16px;font-family:Arial,Helvetica,sans-serif">'
        '<tr><td align="center"><table role="presentation" width="560" cellpadding="0" cellspacing="0" '
        'style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E6E0EB">'
        '<tr><td style="background:#43216A;padding:28px 32px">'
        '<span style="font-size:24px;font-weight:bold;color:#ffffff">Quircle</span>'
        '<span style="font-size:24px;font-weight:bold;color:#EC772D">.</span>'
        '<p style="margin:8px 0 0;font-size:12px;letter-spacing:2px;color:#CBB8E6">YOUR RECORDS. YOUR MEMORIES. YOUR PEOPLE.</p>'
        '</td></tr>'
        '<tr><td style="padding:32px">'
        f'<p style="margin:0 0 16px;font-size:18px;font-weight:bold;color:#252032">Namaste {n}, you are on the list.</p>'
        '<p style="margin:0 0 16px;font-size:14px;line-height:22px;color:#6B6375">'
        'Thanks for registering your interest in Quircle — a connected space for organizing important '
        'documents, keeping health records together, sharing photo moments and exploring everyday buying '
        'and selling. We will write to you when new features land, including the planned Find a Friend '
        'matching.</p>'
        '<p style="margin:24px 0"><a href="' + SITE_URL + '" '
        'style="display:inline-block;background:#43216A;color:#ffffff;text-decoration:none;'
        'font-size:14px;font-weight:bold;padding:14px 28px;border-radius:10px">Visit the Quircle preview site</a></p>'
        '<p style="margin:0;font-size:14px;line-height:22px;color:#6B6375">Meanwhile, you can download the '
        'four-page brochure and ten-page feature catalogue from the site.</p>'
        '</td></tr>'
        '<tr><td style="padding:20px 32px;border-top:1px solid #E6E0EB">'
        '<p style="margin:0;font-size:11px;line-height:18px;color:#6B6375">Sent by Quircle because you '
        'registered your email on the Quircle preview website. We never ask for passwords, codes or card '
        'details by email.</p>'
        '</td></tr></table></td></tr></table>'
    )


def _owner_alert_html(name: str, email: str, city: str, family_size: int, role: str) -> str:
    rows = "".join(
        f'<tr><td style="padding:8px 12px;font-size:13px;color:#6B6375;border-bottom:1px solid #E6E0EB">{label}</td>'
        f'<td style="padding:8px 12px;font-size:13px;font-weight:bold;color:#252032;border-bottom:1px solid #E6E0EB">{escape(value)}</td></tr>'
        for label, value in [
            ("Name", name), ("Email", email), ("City", city),
            ("Family size", str(family_size)), ("Role", role),
        ]
    )
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="background:#FFF8F3;padding:32px 16px;font-family:Arial,Helvetica,sans-serif">'
        '<tr><td align="center"><table role="presentation" width="560" cellpadding="0" cellspacing="0" '
        'style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E6E0EB">'
        '<tr><td style="background:#43216A;padding:20px 32px">'
        '<span style="font-size:18px;font-weight:bold;color:#ffffff">Quircle</span>'
        '<span style="font-size:18px;font-weight:bold;color:#EC772D">.</span>'
        '<span style="font-size:12px;color:#CBB8E6"> — new launch-list signup</span></td></tr>'
        f'<tr><td style="padding:24px 32px"><table role="presentation" width="100%" '
        f'cellpadding="0" cellspacing="0" style="border:1px solid #E6E0EB;border-radius:8px">{rows}</table>'
        '<p style="margin:16px 0 0;font-size:11px;color:#6B6375">Sent by the Quircle preview website '
        'signup form.</p></td></tr></table></td></tr></table>'
    )


async def send_signup_emails(name: str, email: str, city: str, family_size: int, role: str) -> None:
    """Fire-and-forget: welcome the subscriber, alert the owner if configured. Never raises."""
    try:
        await send_email(
            to=email,
            subject="Welcome to Quircle — you are on the list",
            html=_welcome_html(name),
        )
    except Exception:
        logger.exception("welcome email failed for %s", email)
    owner = os.environ.get("OWNER_EMAIL")
    if owner:
        try:
            await send_email(
                to=owner,
                subject=f"New Quircle signup: {name}",
                html=_owner_alert_html(name, email, city, family_size, role),
            )
        except Exception:
            logger.exception("owner alert failed for signup %s", email)
