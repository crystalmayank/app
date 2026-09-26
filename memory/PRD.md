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

## Backlog
- P0: none blocking
- P1: real email sending for notify list (Resend); permanent app-store links when owner supplies them; Hindi adaptation of copy (owner has approved Hindi lines)
- P2: PDF preview modal; admin view of signups/analytics; section-view tracking; OG/social share image
