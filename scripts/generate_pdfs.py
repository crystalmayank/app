#!/usr/bin/env python3
"""Generate the Quircle brochure (4pp) and feature catalogue (10pp) PDFs."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Image,
    NextPageTemplate, PageBreak, Table, TableStyle,
)

DEEP = HexColor("#43216A")
PURPLE = HexColor("#7044B7")
ORANGE = HexColor("#EC772D")
INK = HexColor("#252032")
MUTED = HexColor("#6B6375")
LAV = HexColor("#F4F0FA")
WARM = HexColor("#FFF3E9")

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm
PHOTO = "/tmp/quircle/family_pdf.jpg"

S = {
    "kicker": ParagraphStyle("kicker", fontName="Helvetica-Bold", fontSize=8.5, leading=12, textColor=PURPLE, spaceAfter=6),
    "cover_title": ParagraphStyle("cover_title", fontName="Helvetica-Bold", fontSize=34, leading=38, textColor=DEEP, spaceAfter=10),
    "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=22, leading=26, textColor=DEEP, spaceAfter=8),
    "intro": ParagraphStyle("intro", fontName="Helvetica", fontSize=11.5, leading=17, textColor=INK, spaceAfter=14),
    "h": ParagraphStyle("h", fontName="Helvetica-Bold", fontSize=12.5, leading=16, textColor=INK, spaceBefore=4, spaceAfter=3),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=10.5, leading=15.5, textColor=INK, spaceAfter=6),
    "muted": ParagraphStyle("muted", fontName="Helvetica", fontSize=9.5, leading=14, textColor=MUTED, spaceAfter=6),
    "caption": ParagraphStyle("caption", fontName="Helvetica-Oblique", fontSize=9.5, leading=13, textColor=MUTED),
    "num": ParagraphStyle("num", fontName="Helvetica-Bold", fontSize=13, leading=15, textColor=ORANGE),
    "box_h": ParagraphStyle("box_h", fontName="Helvetica-Bold", fontSize=11, leading=15, textColor=DEEP, spaceAfter=4),
    "box_b": ParagraphStyle("box_b", fontName="Helvetica", fontSize=10, leading=14.5, textColor=INK),
}


def kicker(text):
    return Paragraph(text.upper().replace(" ", "&nbsp;"), S["kicker"])


def item(num, heading, body):
    left = Paragraph(num, S["num"])
    right = [Paragraph(heading, S["h"]), Paragraph(body, S["body"])]
    t = Table([[left, right]], colWidths=[14 * mm, PAGE_W - 2 * MARGIN - 14 * mm])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return t


def note_box(heading, body, bg=LAV):
    inner = [Paragraph(heading, S["box_h"]), Paragraph(body, S["box_b"])]
    t = Table([[inner]], colWidths=[PAGE_W - 2 * MARGIN])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("ROUNDEDCORNERS", [6, 6, 6, 6]),
    ]))
    return t


def make_doc(path, footer_label):
    doc = BaseDocTemplate(
        path, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN, topMargin=30 * mm, bottomMargin=20 * mm,
        title=f"Quircle - {footer_label}", author="Quircle",
    )
    frame = Frame(MARGIN, 20 * mm, PAGE_W - 2 * MARGIN, PAGE_H - 50 * mm, id="main")
    cover_frame = Frame(MARGIN, 20 * mm, PAGE_W - 2 * MARGIN, PAGE_H - 70 * mm, id="cover")

    def footer(canvas, page_num, cover=False):
        canvas.saveState()
        canvas.setFillColor(DEEP)
        canvas.rect(0, PAGE_H - (54 * mm if cover else 20 * mm), PAGE_W, 54 * mm if cover else 20 * mm, stroke=0, fill=1)
        canvas.setFillColor(white)
        canvas.setFont("Helvetica-Bold", 15 if cover else 10)
        canvas.drawString(MARGIN, PAGE_H - (30 * mm if cover else 13.5 * mm), "Quircle")
        canvas.setFillColor(ORANGE)
        canvas.circle(MARGIN + (24 if cover else 22) * mm, PAGE_H - (28.8 * mm if cover else 11.6 * mm), 2.2 * mm if cover else 1.6 * mm, stroke=0, fill=1)
        if cover:
            canvas.setFillColor(HexColor("#D9C9EF"))
            canvas.setFont("Helvetica", 9)
            canvas.drawString(MARGIN, PAGE_H - 38 * mm, "YOUR RECORDS. YOUR MEMORIES. YOUR PEOPLE.")
            canvas.setFont("Helvetica-Bold", 8.5)
            canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 30 * mm, "PRODUCT PREVIEW")
        else:
            canvas.setFillColor(HexColor("#CBB8E6"))
            canvas.setFont("Helvetica", 8)
            canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 13.2 * mm, footer_label.upper())
        canvas.setFillColor(MUTED)
        canvas.setFont("Helvetica", 8)
        canvas.drawString(MARGIN, 11 * mm, f"QUIRCLE / {footer_label.upper()} / SEPTEMBER 2026")
        canvas.drawRightString(PAGE_W - MARGIN, 11 * mm, f"{page_num:02d}")
        canvas.setStrokeColor(HexColor("#E6E0EB"))
        canvas.setLineWidth(0.6)
        canvas.line(MARGIN, 15 * mm, PAGE_W - MARGIN, 15 * mm)
        canvas.restoreState()

    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[cover_frame], onPage=lambda c, d: footer(c, 1, cover=True)),
        PageTemplate(id="page", frames=[frame], onPage=lambda c, d: footer(c, d.page)),
    ])
    return doc


def photo(width=150 * mm):
    return Image(PHOTO, width=width, height=width * 1024 / 1536)


def build_brochure(path):
    doc = make_doc(path, "Brochure")
    story = [
        Paragraph("Your family life,<br/>connected.", S["cover_title"]),
        Paragraph("A shared place for important records, meaningful memories and everyday possibilities.", S["intro"]),
        photo(),
        Spacer(1, 4 * mm),
        Paragraph("More together. Less scattered.", S["caption"]),
        NextPageTemplate("page"),
        PageBreak(),

        kicker("A little less searching. A lot more living."),
        Paragraph("Keep what matters<br/>within reach.", S["title"]),
        Paragraph("Quircle brings documents, health information and family connections into the same app experience.", S["intro"]),
        item("01", "A document when you need it",
             "Organize important files in a document vault. Use folders and search, then review sharing options for the people you choose. A selected certificate or document can be easier to find when family needs it."),
        item("02", "Health history with more context",
             "Bring reports, prescriptions, medicines, allergies and hospital history together. Prepare for a doctor conversation with the records that matter to that visit."),
        item("03", "A family connection that stays active",
             "Explore family relationships, keep conversations going in chat, and share photo memories with a chosen audience. Everyday moments deserve a place alongside life's practical details."),
        Spacer(1, 4 * mm),
        note_box("Share thoughtfully",
                 "Check the recipient and scope before sharing. Family membership is not automatic permission to access private documents or health records. Copies already downloaded may remain with recipients."),
        PageBreak(),

        kicker("More possibilities in your Quircle"),
        Paragraph("Reconnect. Discover.<br/>Participate.", S["title"]),
        item("01", "Find a Friend - planned matching experience",
             "Reconnect through schools, colleges and workplaces. The planned 'Find your people' flow uses optional campus, batch and year details to suggest relevant connections, with discovery and connection choices controlled by the user."),
        item("02", "A marketplace for everyday needs",
             "Browse products, compare listings and explore selling. Clear photographs, item condition, pricing and delivery terms help buyers and sellers make informed choices."),
        item("03", "Live bidding, with your budget in mind",
             "Explore auctions and place eligible bids within your spending limit. Bidding can create an opportunity for better value, but final prices can rise. Discounts and winning are not guaranteed."),
        item("04", "Useful help, closer to hand",
             "Quick Help and Hire Pro bring service discovery and booking options into the same experience. Categories, coverage and provider availability vary."),
        Spacer(1, 4 * mm),
        note_box("What makes the idea distinctive",
                 "Quircle connects practical family organization with social connections and commerce. This is its positioning opportunity; it is not a claim that no other app offers similar features.", bg=WARM),
        PageBreak(),

        kicker("Your Quircle starts small."),
        Paragraph("Start with one<br/>useful moment.", S["title"]),
        Paragraph("Explore a feature that solves a need today, then add more as it becomes useful.", S["intro"]),
        item("1", "Explore your space", "Find Documents, Family and Health on the home screen."),
        item("2", "Bring one thing together", "Begin with a non-sensitive sample document or a memory you are comfortable sharing."),
        item("3", "Review your choices", "Check audiences, recipients and access settings before inviting others or sharing records."),
        Spacer(1, 4 * mm),
        note_box("Explore the Quircle app preview",
                 "Preview access may require Expo Go or a refreshed link. Permanent download links and app-store availability are not confirmed."),
        Spacer(1, 4 * mm),
        note_box("About this edition",
                 "Prepared from the accessible web preview and current Quircle specifications on 26 September 2026. Feature screens were reviewed; transactions, security enforcement and native-device workflows were not certified. Institution/batch matching is planned. Advanced consultation and payment changes remain under review. Lifestyle photograph is illustrative.", bg=WARM),
    ]
    doc.build(story)


def build_catalogue(path):
    doc = make_doc(path, "Feature Catalogue")
    P = []

    def page(*flowables):
        P.extend(flowables)
        P.append(PageBreak())

    P.extend([
        Paragraph("Everyday life.<br/>Connected.", S["cover_title"]),
        Paragraph("Feature catalogue | Uses, benefits, information needs and availability.", S["intro"]),
        photo(),
        Spacer(1, 4 * mm),
        Paragraph("More together. Less scattered.", S["caption"]),
        NextPageTemplate("page"),
        PageBreak(),
    ])

    page(
        kicker("The product at a glance"),
        Paragraph("One app.<br/>Several everyday needs.", S["title"]),
        Paragraph("Quircle's purpose is to reduce the effort of organizing personal information, maintaining relationships and finding products or services.", S["intro"]),
        item("01", "Documents", "Store and organize uploaded files; search, scan and explore chosen-recipient sharing."),
        item("02", "Health", "Maintain a record of reports, prescriptions, medicines and medical history for future reference."),
        item("03", "People & memories", "Explore family relationships, share photo posts, chat and build meaningful connections."),
        item("04", "Marketplace & services", "Browse items, explore selling and bidding, and discover professional or quick-help services."),
        Spacer(1, 4 * mm),
        note_box("A connected product story",
                 "Lead with one useful need. Introduce related features after users experience value, rather than asking them to use every module on day one."),
    )

    page(
        kicker("01 / Document Vault"),
        Paragraph("Documents that are<br/>easier to find.", S["title"]),
        Paragraph("For families, working professionals and anyone managing important records.", S["intro"]),
        Paragraph("What the preview shows", S["h"]),
        Paragraph("Upload, Scan, Scan QR, New folder, document search, quick access, expiry/verification categories and a Vault Assistant entry.", S["body"]),
        Paragraph("An everyday use", S["h"]),
        Paragraph("Keep a certificate in an appropriate folder, find it later and review sharing options for a named family member or friend.", S["body"]),
        Paragraph("Information involved", S["h"]),
        Paragraph("The uploaded file, its title/category and available metadata. Avoid adding unnecessary identifiers to filenames or descriptions.", S["body"]),
        Paragraph("Sharing with intention", S["h"]),
        Paragraph("The interface includes Shared by me, Shared with me, sharing activity, Manage access and Pause sharing. Review the scope carefully, especially for whole-vault access.", S["body"]),
        Spacer(1, 3 * mm),
        note_box("Availability note",
                 "Controls were visible in the current preview. This review did not upload files, validate OCR, test government verification or certify access revocation."),
    )

    page(
        kicker("02 / Health Records"),
        Paragraph("A health history<br/>you can bring along.", S["title"]),
        Paragraph("Support better-prepared conversations by keeping relevant records together.", S["intro"]),
        Paragraph("What the preview shows", S["h"]),
        Paragraph("Personal/family records, prescriptions, lab reports, medicines, allergies, hospital records, vaccines, record search, reminders and lab-trend tools.", S["body"]),
        Paragraph("An everyday use", S["h"]),
        Paragraph("Before an appointment, collect the relevant reports and prescription history, then check the patient and selected files before sharing.", S["body"]),
        Paragraph("Information involved", S["h"]),
        Paragraph("Health files and details the user chooses to add; patient identity, dates and medicine information where relevant. Handle these as sensitive information.", S["body"]),
        Paragraph("Care and consultation", S["h"]),
        Paragraph("Doctor-sharing and request interfaces exist. The proposed expanded Quircle Care flow, specialty-search corrections and direct UPI/QR payments still require implementation or verification.", S["body"]),
        Spacer(1, 3 * mm),
        note_box("What this does not promise",
                 "Quircle records support organization. They do not establish a diagnosis, guarantee doctor availability, replace medical care or provide emergency treatment.", bg=WARM),
    )

    page(
        kicker("03 / Family, Social & Chat"),
        Paragraph("Keep your people<br/>and memories close.", S["title"]),
        Paragraph("A shared record of life includes people and moments, as well as files.", S["intro"]),
        Paragraph("Family & Network", S["h"]),
        Paragraph("The current interface presents a family tree, Members, Circles and Timeline, with relationship filters and search by email, mobile or Quircle ID.", S["body"]),
        Paragraph("Photo memories", S["h"]),
        Paragraph("The current product direction is photo-focused social posting. The dated review records photo choices, captions, location, audience controls, interaction switches and drafts.", S["body"]),
        Paragraph("Conversations", S["h"]),
        Paragraph("Chat is linked from the home screen. Direct and group communication can support family and community connections; this review did not certify delivery or attachment integrity.", S["body"]),
        Paragraph("Information and audience", S["h"]),
        Paragraph("Family relationships, chosen profile details, photo content, captions, chat content and selected audiences. Review what a post reveals about other people before publishing.", S["body"]),
        Paragraph("An everyday use", S["h"]),
        Paragraph("Share a celebration with the intended audience and continue the conversation in chat. Keep documents and health information separate from social posts.", S["body"]),
    )

    page(
        kicker("04 / Planned Institution & Batch Matching"),
        Paragraph("Find a Friend.<br/>Reconnect through places.", S["title"]),
        Paragraph("Designed to help school friends, college batches and current or former colleagues find one another.", S["intro"]),
        item("1", "Add a shared place", "Choose a school, college or workplace, with the correct institution and campus or office branch. Similar names alone should not create a match."),
        item("2", "Add the time and context", "Optional attendance or employment years; course and graduation batch where relevant. Unknown details should remain unknown, without invented dates."),
        item("3", "Choose discovery", "Opt in to being found through that affiliation. Review suggestions based on a relevant shared institution, batch or overlapping period."),
        item("4", "Choose the connection", "Send or accept a connection request. A suggested match does not prove someone's identity or guarantee that a lost contact will be found."),
        Spacer(1, 3 * mm),
        note_box("Availability: planned",
                 "The current specification defines this flow. Existing family search was visible, but a completed institution/batch matching release was not verified in this review.", bg=WARM),
    )

    page(
        kicker("05 / Marketplace & Live Bidding"),
        Paragraph("Buy thoughtfully.<br/>Sell clearly. Bid wisely.", S["title"]),
        Paragraph("A place to discover products and explore value while keeping the final decision with the user.", S["intro"]),
        Paragraph("Marketplace discovery", S["h"]),
        Paragraph("The current preview shows product search, categories, filters, locations, item condition, prices, seller badges and a Sell entry. Badges were not independently audited.", S["body"]),
        Paragraph("Seller journey", S["h"]),
        Paragraph("Prepare accurate item details and photographs, price and delivery terms, and follow seller eligibility requirements. Listing and order completion were not tested here.", S["body"]),
        Paragraph("Live bidding", S["h"]),
        Paragraph("Auction interfaces display current price, bid count and remaining time. The dated review also records a next-bid amount. Minimums, increments and deadlines must follow the listing rules.", S["body"]),
        Spacer(1, 3 * mm),
        note_box("Budget example - illustration only",
                 "If your total limit is Rs 2,000 and delivery is Rs 150, keep the item bid at or below Rs 1,850 before any other charges. Check all fees and comparable prices first."),
        Spacer(1, 3 * mm),
        note_box("Price and transaction limits",
                 "Bidding does not guarantee a discount or a win. Payment, winner selection, fulfilment, cancellation and refund workflows need end-to-end validation before broad promotion.", bg=WARM),
    )

    page(
        kicker("06 / Quick Help & Hire Pro"),
        Paragraph("Find help for<br/>everyday tasks.", S["title"]),
        Paragraph("Service discovery extends the product beyond personal records and social connection.", S["intro"]),
        Paragraph("Quick Help", S["h"]),
        Paragraph("The dated review observed service categories, scheduling controls, availability summaries and booking-status information.", S["body"]),
        Paragraph("Hire Pro", S["h"]),
        Paragraph("The home and marketplace link to freelancers and professionals. Service requests can capture job details so providers understand the work.", S["body"]),
        Paragraph("An everyday use", S["h"]),
        Paragraph("Select a relevant service, provide the scope, review the duration and total charge, then check the date, address and confirmation state.", S["body"]),
        Paragraph("Information involved", S["h"]),
        Paragraph("Service requirements, requested time, service location and contact details needed for fulfilment. Give only the information needed for the requested job.", S["body"]),
        Spacer(1, 3 * mm),
        note_box("Coverage and availability",
                 "Services depend on actual providers and supported locations. A visible booking screen is not evidence of a completed provider dispatch or a nationwide service network."),
    )

    page(
        kicker("07 / Data and User Benefit"),
        Paragraph("Understand what<br/>you choose to add.", S["title"]),
        Paragraph("A feature-level explanation of information use, not a substitute for the app's current privacy notice.", S["intro"]),
        Paragraph("Account and profile", S["h"]),
        Paragraph("Supports account access and recognition by other users. Review public versus private profile fields and the current registration requirements.", S["body"]),
        Paragraph("Documents and health records", S["h"]),
        Paragraph("Supports organization, retrieval and selected sharing. Confirm recipient, patient, file scope and any expiry option; family affiliation alone should not grant access.", S["body"]),
        Paragraph("Photos, social activity and affiliations", S["h"]),
        Paragraph("Supports memories, conversations and planned discovery. Review audience and location settings; planned school/work discovery is optional.", S["body"]),
        Paragraph("Listings, bids and service requests", S["h"]),
        Paragraph("Supports discovery, transaction records and fulfilment. Delivery and payment information should be handled only through the applicable flow.", S["body"]),
        Spacer(1, 3 * mm),
        note_box("The exact policy must be confirmed",
                 "This review did not audit storage locations, retention, deletion, encryption, processors, analytics or legal compliance. Do not infer these from this catalogue or UI labels.", bg=WARM),
    )

    P.extend([
        kicker("08 / Availability & Review Notes"),
        Paragraph("Know what is visible.<br/>Know what is next.", S["title"]),
        Paragraph("Evidence status as of 26 September 2026. This catalogue is a product overview, not an end-to-end test certificate.", S["intro"]),
        Paragraph("Observed directly in this review", S["h"]),
        Paragraph("Home; document-vault organization and sharing entries; Health Records; Family & Network; marketplace listings, filters, auction entries and selling entry; social composer audience controls.", S["body"]),
        Paragraph("Additional current evidence", S["h"]),
        Paragraph("The 26 September verification report records targeted display checks for live bidding, Quick Help, social, chat attachments and news. These limited checks are not full workflow passes.", S["body"]),
        Paragraph("Planned or requiring further confirmation", S["h"]),
        Paragraph("Institution/batch discovery, expanded online consultation, revised specialty matching and direct doctor UPI/QR payments. No release date or live service readiness is asserted.", S["body"]),
        Paragraph("Explore and ask informed questions", S["h"]),
        Paragraph("Open the current app preview to inspect available features. Check supported platforms, pricing, provider coverage, permissions, payment/refund terms and current notices before relying on a workflow.", S["body"]),
        Spacer(1, 3 * mm),
        note_box("Sources and access",
                 "User-supplied Emergent preview; current Quircle Verification and Correction, Find Your People, and Quircle Care specifications, all dated 26 September 2026. Preview links can expire."),
    ])

    doc.build(P)


if __name__ == "__main__":
    out = "/app/frontend/public/downloads"
    build_brochure(f"{out}/Quircle_Brochure.pdf")
    build_catalogue(f"{out}/Quircle_Feature_Catalogue.pdf")
    print("PDFs written to", out)
