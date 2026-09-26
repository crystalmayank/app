#!/usr/bin/env python3
"""Compose the Quircle social share card (1200x630) for WhatsApp/OG previews."""

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
DEEP = (67, 33, 106)
PURPLE_DARK = (88, 44, 139)
ORANGE = (236, 119, 45)
LAV = (203, 184, 230)
WHITE = (255, 255, 255)

FONT_DIR = "/usr/share/fonts/truetype/liberation"
BOLD = f"{FONT_DIR}/LiberationSans-Bold.ttf"
BOLD_IT = f"{FONT_DIR}/LiberationSans-BoldItalic.ttf"
REG = f"{FONT_DIR}/LiberationSans-Regular.ttf"

img = Image.new("RGB", (W, H), DEEP)
d = ImageDraw.Draw(img)

d.ellipse([880, -220, 1460, 360], fill=PURPLE_DARK)
d.ellipse([-240, 440, 240, 920], fill=PURPLE_DARK)
d.ellipse([980, -120, 1340, 240], fill=DEEP)

# photo panel, right side, rounded
photo = Image.open("/app/frontend/public/assets/family.jpg").convert("RGB")
pw, ph = 470, H
scale = ph / photo.height
photo = photo.resize((int(photo.width * scale), ph))
x0 = int(photo.width * 0.42)  # keep the family (center-right of the frame)
photo = photo.crop((x0, 0, x0 + pw, ph))
mask = Image.new("L", (pw, ph), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, pw, ph], radius=56, fill=255)
img.paste(photo, (W - pw, 0), mask)
ImageDraw.Draw(img).rounded_rectangle([W - pw, 0, W - 1, ph - 1], radius=56, outline=(255, 255, 255), width=6)
d = ImageDraw.Draw(img)

# official logo mark (rounded app icon) + wordmark
logo = Image.open("/app/frontend/public/assets/quircle-logo.png").convert("RGBA").resize((92, 92))
lmask = Image.new("L", (92, 92), 0)
ImageDraw.Draw(lmask).rounded_rectangle([0, 0, 92, 92], radius=24, fill=255)
img.paste(logo, (72, 62), lmask)
d = ImageDraw.Draw(img)
d.text((182, 80), "Quircle.", font=ImageFont.truetype(BOLD, 46), fill=WHITE)

# headline
d.text((72, 236), "Your family life,", font=ImageFont.truetype(BOLD, 78), fill=WHITE)
d.text((72, 330), "connected.", font=ImageFont.truetype(BOLD_IT, 78), fill=ORANGE)

# tagline + url
d.text((74, 452), "DOCUMENTS. MEMORIES. YOUR PEOPLE.", font=ImageFont.truetype(BOLD, 26), fill=LAV)
d.text((74, 528), "Keep important records close. Share meaningful moments.", font=ImageFont.truetype(REG, 26), fill=WHITE)
d.text((74, 562), "Reconnect with people and discover everyday value.", font=ImageFont.truetype(REG, 26), fill=WHITE)

img.save("/app/frontend/public/assets/og-share.jpg", quality=88, optimize=True)
print("og-share.jpg written", img.size)
