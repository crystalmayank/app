# Quircle — Promotional Landing Page PRD

## Original problem statement
"Build a landing page: Create modern and use theme our quircle App. Don't Missed anything like services and features."
Backed by the owner's full content package (Quircle_Website_Brochure_Catalogue_Emergent_Prompt.txt + Quircle_Family_Photograph.png). User confirmed: full landing page with all sections + working brochure/catalogue PDF downloads; purple/orange brand theme (#43216A / #7044B7 / #EC772D) with bolder modern reinterpretation; app preview CTA → supplied Emergent preview URL; notify-me email form + light analytics; must include Quick Help & services.

## Architecture
- Frontend: Vite + React 19 + TS, Tailwind v4, motion (framer), lenis smooth scroll, shadcn/ui.
  - src/pages/Landing.tsx composes 12 sections under src/components/sections/* + layout/{Header,Footer}.tsx
  - src/lib/content.ts — shared links/copy constants; src/lib/analytics.ts — fire-and-forget tracking
  - Fonts: Plus Jakarta Sans (display), DM Sans (body), Lora (editorial italics), Geist Mono
- Backend: FastAPI + Mongo (motor). Routes: GET /api/, POST /api/notify, GET /api/stats, POST /api/analytics/event
- PDFs: /app/scripts/generate_pdfs.py (reportlab) → frontend/public/downloads/{Quircle_Brochure.pdf (4pp), Quircle_Feature_Catalogue.pdf (10pp)}. Re-run script after copy changes.
- Photo: /app/assets/Quircle_Family_Photograph.png (original preserved); web JPEG at frontend/public/assets/family.jpg

## User personas
Adult families / household organizers, alumni & former colleagues, local sellers and budget-aware buyers in India.

## Core requirements (static)
Faithful copy from owner's Appendix A; planned-status honesty for Find a Friend; no invented stats/certifications; family photo in hero with caption "More together. Less scattered."; working PDF downloads; anchors #features #people #services #data #downloads #sharing; app preview CTA with Expo Go caveat.

## Implemented (26 Sep 2026)
- Kinetic hero: masked line-by-line reveal, asymmetric clipped photo, parallax + floating chips
- Editorial marquee ribbon, bento feature grid (Documents/Health/Family/Marketplace), 3-step sharing journey
- Find a Friend with "Planned matching experience" badge; Marketplace buyers/sellers + auction caveat
- Quick Help & Hire Pro + Chat & circles + Health sharing; service category chips
- Information-use table with planned badge; honest analytics disclosure
- Downloads section (real 4pp brochure + 10pp catalogue PDFs, verified page counts)
- Notify-me form → POST /api/notify (dedupe by email), live signup count from /api/stats
- Closing CTA (dark #210C38) + footer with illustrative-image note
- Original SVG logo mark + favicon; light analytics (page_view, downloads, preview clicks)
- Verified: curl smoke on all endpoints incl. 422 negative case; yarn typecheck clean; browser pass desktop+mobile incl. form submission

## Implemented (26 Sep 2026, iteration 2)
- Real launch emails via Emergent-managed Resend (backend/lib/emailer.py): welcome email to every new signup; owner alert fires when OWNER_EMAIL is added to backend/.env (user hasn't supplied an address yet). Verified: 202 Accepted, email id 01a0dd44...
- EN/हिं language toggle (header) — hero, nav, CTAs, section headings, ribbon switch to Hindi using the owner's approved Hindi lines (src/lib/i18n.tsx); body copy stays English by user choice
- Google Translate floating widget (bottom-right, 10 Indian languages) — src/components/GoogleTranslate.tsx; disclosed in the information-use section
- Social share card: /assets/og-share.jpg (1200x630, official logo + family photo) wired via OG/Twitter meta in index.html; regenerate with scripts/make_og_image.py
- Official Quircle logo (user-supplied) replaces the placeholder mark: header/footer (QuircleLogo.tsx), favicon (/assets/icon-192.png), OG card
- PDF flip-through preview modals: every PDF page pre-rendered to /downloads/preview/{slug}-{n}.jpg (scripts via pymupdf); modal with arrows, dots, page indicator, in-modal download
- User-supplied feature illustrations placed across the site: document-vault, health-records, photo-memories, live-bidding (bento), family-tree (sharing), find-friend (people), marketplace (commerce), quick-help, chat, news-room (services grid, News Room added as 4th card)
- Deployment readiness (26 Sep 2026): deployment_agent health check PASS after two fixes — SITE_URL now from APP_URL env (emailer.py), app preview link moved to frontend/.env VITE_APP_PREVIEW_URL (import.meta.env)
- Get the App section (#get-app, between notify and closing): phone mockup with real app home screenshot (/assets/app-home.jpg), Open app preview CTA, Copy app link (clipboard + toast), Send to mobile via wa.me prefilled WhatsApp message (no SMS gateway — visitor confirms send); footer link added; i18n keys getapp_h2a/h2b

## Implemented (26 Sep 2026, iteration 3)
- Private owner area at /admin: env-based single admin (ADMIN_EMAIL + single-quoted bcrypt ADMIN_PASSWORD_HASH, JWT_SECRET in backend/.env), POST /api/admin/login (JWT 12h, Bearer), GET /api/admin/signups (JSON) + GET /api/admin/signups.csv, 5-attempt/15-min brute-force lockout via login_attempts collection; React Admin.tsx: login card, dashboard (stats + table + Download CSV via fetch/blob), logout, 401 handling. Auth testing protocol saved to /app/auth_testing.md
- Owner alert emails: code ready (send_signup_emails fires when OWNER_EMAIL set) — address still not supplied by user; Twilio SMS declined by user (WhatsApp wa.me flow stays)
- Bugfix (user-reported): Google Translate widget was restricted to 10 Indian languages with no English — removed includedLanguages so all 249 languages incl. English are offered and switching back to English works; added notranslate to logo wordmark and EN/हिं toggle. Verified in browser: ES/FR translate → English reappears → revert restores text, toggle/brand intact

## Implemented (26 Sep 2026, iteration 4)
- Full Hindi page: i18n dictionary expanded to ~230 keys (EN/हिं) covering every section — body copy, steps, info table, downloads, notify form labels/options, get-app, closing, footer. Verified in browser: full-page Hindi renders, English revert clean. Google Translate widget remains for 249 other languages
- QR code beside phone mockup in Get App section: /assets/app-qr.png (purple-on-white, error-correction M) pointing at the app preview URL; regenerate via python qrcode lib if URL changes
- Twilio SMS: declined by user again (WhatsApp wa.me flow remains the send-to-mobile path)
- Owner alerts: STILL PENDING — user keeps selecting "I'll type my email" without typing it; code armed, needs OWNER_EMAIL in backend/.env only

## Backlog
- P0: OWNER_EMAIL from user (one-line .env addition turns owner alerts on)
- P1: Twilio SMS (declined twice by user — only revisit if they ask); permanent app-store links when owner supplies them
- P2: Hindi versions of the brochure/catalogue PDFs; section-view tracking; downloadable signup list filters (date range) on /admin
