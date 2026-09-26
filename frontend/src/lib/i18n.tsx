import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "hi";

const STRINGS = {
  en: {
    nav_features: "What you can do",
    nav_people: "Find a Friend",
    nav_services: "Quick Help",
    nav_data: "Your information",
    nav_downloads: "Brochure & catalogue",
    nav_preview: "Open app preview",

    hero_eyebrow: "Documents. Memories. Your people.",
    hero_h1a: "Your family life,",
    hero_h1b: "connected",
    hero_sub:
      "Keep important records close. Share meaningful moments. Reconnect with people and discover everyday value — all within Quircle.",
    hero_cta1: "Discover Quircle",
    hero_cta2: "Get the brochure",
    hero_note: "Product preview · Explore the features below",
    hero_caption: "More together. Less scattered.",

    ribbon_1: "One place for what matters",
    ribbon_2: "Family & friends",
    ribbon_3: "Personal records",
    ribbon_4: "Everyday possibilities",

    feat_eyebrow: "Meet your everyday Quircle",
    features_h2a: "Less searching.",
    features_h2b: "More living.",
    feat_intro:
      "From finding a document to finding a familiar face, Quircle brings useful parts of daily life into one connected space.",
    feat1_meta: "01 / Documents",
    feat1_h: "Your important papers. A place to belong.",
    feat1_b:
      "Organize IDs, certificates and other files in a document vault. Use folders, search and sharing controls to make chosen documents easier to reach.",
    feat1_q: "For the moment someone asks, “Can you send that document?”",
    feat1_link: "See how sharing fits your life",
    feat1_search: "Search “birth certificate”",
    feat1_f1: "IDs & certificates",
    feat1_f2: "Property papers",
    feat1_f3: "School records",
    feat1_f4: "Insurance",
    feat2_meta: "02 / Health Records",
    feat2_h: "A clearer health history.",
    feat2_b:
      "Keep reports, prescriptions, medicine details and hospital records together. Bring the right information to your next doctor conversation.",
    feat2_c1: "Prescriptions",
    feat2_c2: "Lab reports",
    feat2_c3: "Medicines",
    feat2_c4: "Allergies",
    feat2_c5: "Vaccines",
    feat2_c6: "Reminders",
    feat2_note: "Records support care; they do not replace it.",
    feat3_meta: "03 / Family & Memories",
    feat3_h: "Keep the connection going.",
    feat3_b:
      "Explore your family network, share photo memories, and stay in touch through chat. Choose the audience for each social post.",
    feat3_c1: "Family tree",
    feat3_c2: "Circles",
    feat3_c3: "Timeline",
    feat3_c4: "Photo memories",
    feat3_c5: "Chat",
    feat3_note: "Everyday moments, shared thoughtfully.",
    feat4_meta: "04 / Marketplace & Live Bid",
    feat4_h: "Discover it. Compare it. Bid for it.",
    feat4_b:
      "Browse products, explore selling, and take part in bidding. Compare the full cost with your budget before committing.",
    feat4_auction: "Illustrative auction",
    feat4_item: "Pre-loved teak bookshelf",
    feat4_bid: "Current bid",
    feat4_bids: "Bids",
    feat4_ends: "Ends in",
    feat4_note: "A chance to find better value. Savings are not guaranteed.",

    share_eyebrow: "A practical family benefit",
    sharing_h2a: "Be there.",
    sharing_h2b: "Even from elsewhere.",
    share_p1:
      "A selected document for a sibling. A report ready for an appointment. A photograph that brings everyone back to the same moment.",
    share_p2:
      "Quircle’s family, vault and health areas are designed around these everyday needs. A family connection should never be treated as permission to see every private record.",
    share_s1t: "Bring it together",
    share_s1b: "Add the documents, records or photos relevant to you.",
    share_s2t: "Choose what to share",
    share_s2b: "Review the file, audience and access options before sending.",
    share_s3t: "Keep access intentional",
    share_s3b:
      "Use the available sharing controls and review who can see your information. Downloaded copies may remain with recipients.",

    ppl_eyebrow: "Find a Friend",
    people_badge: "Planned matching experience",
    people_h2a: "Remember the place.",
    people_h2b: "Rediscover the people.",
    ppl_p1:
      "The school where it started. The college batch you still remember. The workplace where friendships grew.",
    ppl_p2:
      "Quircle’s planned “Find your people” experience uses optional school, college, workplace and year details to suggest relevant connections. You choose whether to be discoverable and whether to connect.",
    ppl_status_b: "Where it stands today:",
    ppl_status:
      "existing family search was visible in the preview. Institution and batch matching is specified for development; release availability is not confirmed.",
    ppl_btn: "Get notified when it ships",
    ppl_panel: "The connection starts with common ground",
    ppl_s1t: "Your institution",
    ppl_s1b: "School, college or workplace",
    ppl_s2t: "Your time there",
    ppl_s2b: "Campus, batch or overlapping years",
    ppl_s3t: "Your choice",
    ppl_s3b: "Opt in, review a suggestion, send a request",
    ppl_close: "A shared past can be the start of a new conversation.",

    mkt_eyebrow: "Buy • Sell • Bid",
    market_h2a: "Everyday finds.",
    market_h2b: "Your price decision.",
    mkt_p:
      "Look for products you need. Give useful items a new home. Explore live auctions with a clear spending limit.",
    mkt_buy_h: "For buyers",
    mkt_buy_b:
      "Check the item’s condition, seller details, delivery charges and total price. Bid only within the amount you are comfortable paying.",
    mkt_sell_h: "For sellers",
    mkt_sell_b:
      "Present products clearly, set accurate terms and follow the app’s eligibility and verification process before selling.",
    mkt_note:
      "An auction’s final price can rise. Winning, discounts, stock and delivery depend on the listing and applicable terms.",

    svc_eyebrow: "More of daily life, in the same place",
    services_h2a: "Help around the house.",
    services_h2b: "People around your life.",
    svc1_h: "Quick Help & Hire Pro",
    svc1_b:
      "Explore service categories, professional profiles and booking options. Availability depends on location and providers.",
    svc2_h: "Chat & circles",
    svc2_b: "Continue conversations and keep personal connections within your Quircle experience.",
    svc3_h: "News Room",
    svc3_b:
      "Explore stories across topics and follow each one back to its original source — inside the same Quircle experience.",
    svc4_h: "Health sharing",
    svc4_b:
      "The preview includes doctor-sharing and consultation-request options. Live consultation readiness and new payment flows remain under review.",
    svc_list_h: "Service categories seen in the preview",
    svc_c1: "Electricians",
    svc_c2: "Plumbers",
    svc_c3: "Caregivers",
    svc_c4: "Tutors",
    svc_c5: "Drivers",
    svc_c6: "Home help",
    svc_c7: "Babysitters",

    data_eyebrow: "Understand your information",
    data_h2a: "Useful details.",
    data_h2b: "A clear purpose.",
    data_p:
      "These examples explain how information supports Quircle’s features. Check the app’s current notices and permission screens for the exact collection, access and retention terms.",
    data_th1: "Information",
    data_th2: "Why it is useful",
    data_th3: "What to review",
    data_r1a: "Account & profile details",
    data_r1b: "Access your account and identify yourself to connections.",
    data_r1c: "Which profile fields are visible.",
    data_r2a: "Documents & file details",
    data_r2b: "Organize, search and share chosen records.",
    data_r2c: "Recipients, scope and link access.",
    data_r3a: "Health records",
    data_r3b: "Keep a history for you and authorized care conversations.",
    data_r3c: "Patient, selected reports and sharing consent.",
    data_r4a: "Photos & social activity",
    data_r4b: "Share memories and keep conversations going.",
    data_r4c: "Audience and location before posting.",
    data_r5a: "Education & work details",
    data_r5b: "Suggest people with a relevant shared institution or period.",
    data_r5c: "Optional discovery and connection choices.",
    data_r5badge: "Planned matching",
    data_r6a: "Listings, bids & order details",
    data_r6b: "Support product discovery and transaction follow-up.",
    data_r6c: "Total cost, seller terms and delivery details.",
    data_note:
      "This page explains product use; it is not a privacy policy or a security certification. This website stores the details you submit in the early-access form and records simple, anonymous counts of button clicks (downloads and preview opens). The optional translate button is provided by Google Translate and loads Google’s script only when you use it.",

    dl_eyebrow: "Take a closer look",
    downloads_h2a: "Your Quircle",
    downloads_h2b: "introduction kit.",
    dl_p: "Share the overview, explore the feature catalogue, or open the app preview.",
    dl1_t: "The brochure",
    dl1_b: "A concise introduction to Quircle’s purpose and benefits.",
    dl1_cta: "Download brochure",
    dl2_t: "The feature catalogue",
    dl2_b: "Use cases, information needs and availability notes.",
    dl2_cta: "Download catalogue",
    dl_flip: "Flip through",
    dl_modal_hint: "flip with the arrows",
    dl_download: "Download",
    dl_prefer: "Prefer to explore first?",
    dl_open: "Open the app preview",

    nt_eyebrow: "Get launch updates",
    notify_h2a: "Be the first to know",
    notify_h2b: "when Quircle opens up.",
    nt_p:
      "Leave your details and we will write to you when new features land — including the planned Find a Friend matching. No spam, no selling your details.",
    nt_count: "{n} people have registered interest so far.",
    nt_empty: "Be among the first to register your interest.",
    nt_name: "Your name",
    nt_email: "Email",
    nt_city: "City",
    nt_family: "Family size",
    nt_role: "I am a…",
    nt_select: "Select",
    nt_fs1: "1–2 people",
    nt_fs2: "3–4 people",
    nt_fs3: "5 or more",
    nt_r1: "Parent / household organizer",
    nt_r2: "Elder family member",
    nt_r3: "Young adult",
    nt_r4: "Working professional",
    nt_r5: "Something else",
    nt_submit: "Notify me at launch",
    nt_saving: "Saving…",
    nt_note: "Your details are stored only to contact you about Quircle. Nothing else.",

    ga_eyebrow: "Get the app",
    getapp_h2a: "Quircle,",
    getapp_h2b: "in your pocket.",
    ga_p:
      "See your family life come together on your phone — documents, health, memories and the marketplace in one Quircle home screen.",
    ga_open: "Open app preview",
    ga_copy: "Copy app link",
    ga_send_h: "Send the link to a mobile number",
    ga_send_note:
      "Opens WhatsApp with the app link ready to send to that number. For numbers outside India, include the country code.",
    ga_caveat:
      "The current preview may require Expo Go or renewed access. App-store availability and a permanent download link are not yet confirmed.",
    ga_qr: "Scan to open on your phone",
    ga_badge: "Live preview",

    cl_eyebrow: "Keep what matters close",
    closing_h2a: "Your records. Your memories.",
    closing_h2b: "Your people. Your Quircle.",
    closing_cta1: "Open app preview",
    closing_cta2: "Get the brochure",
    cl_note:
      "The current preview may require Expo Go or renewed access. App-store availability and a permanent launch link are not yet confirmed.",

    ft_tag: "Your family life, connected. Product overview · September 2026.",
    ft_explore: "Explore",
    ft_product: "Product",
    ft_preview: "Open app preview",
    ft_notify: "Get launch updates",
    ft_info: "Information & choices",
    ft_getapp: "Get the app",
    ft_legal:
      "Features and availability may change. Lifestyle and feature images are illustrative. This is a product preview website, not an app-store listing.",
  },
  hi: {
    nav_features: "आप क्या कर सकते हैं",
    nav_people: "दोस्त खोजें",
    nav_services: "क्विक हेल्प",
    nav_data: "आपकी जानकारी",
    nav_downloads: "ब्रोशर और कैटलॉग",
    nav_preview: "ऐप प्रीव्यू खोलें",

    hero_eyebrow: "दस्तावेज़. यादें. आपके अपने.",
    hero_h1a: "आपके परिवार का जीवन,",
    hero_h1b: "जुड़ा हुआ",
    hero_sub:
      "Quircle पर ज़रूरी दस्तावेज़ व्यवस्थित करें, स्वास्थ्य रिकॉर्ड एक जगह रखें और अपनों के साथ फोटो यादें साझा करें। खरीदारी और बोली के विकल्प भी देखें। साझा करने से पहले सही व्यक्ति और अनुमति जाँचें।",
    hero_cta1: "Quircle को जानें",
    hero_cta2: "ब्रोशर डाउनलोड करें",
    hero_note: "प्रोडक्ट प्रीव्यू · नीचे सुविधाएँ देखें",
    hero_caption: "ज़रूरी कागज़, सेहत के रिकॉर्ड और अपनों की यादें — सब एक जगह।",

    ribbon_1: "जो मायने रखता है, सब एक जगह",
    ribbon_2: "परिवार और दोस्त",
    ribbon_3: "निजी रिकॉर्ड",
    ribbon_4: "रोज़ की नई संभावनाएँ",

    feat_eyebrow: "आपकी रोज़ की Quircle से मिलिए",
    features_h2a: "कम खोज.",
    features_h2b: "ज़्यादा ज़िंदगी.",
    feat_intro:
      "दस्तावेज़ खोजने से लेकर किसी परिचित चेहरे तक — Quircle रोज़ की ज़रूरी चीज़ों को एक जुड़ी हुई जगह पर लाता है।",
    feat1_meta: "01 / दस्तावेज़",
    feat1_h: "आपके ज़रूरी कागज़. अपनी जगह पर.",
    feat1_b:
      "आईडी, प्रमाणपत्र और अन्य फ़ाइलें डॉक्यूमेंट वॉल्ट में व्यवस्थित रखें। फ़ोल्डर, खोज और शेयरिंग नियंत्रणों से चुने हुए दस्तावेज़ आसानी से मिलें।",
    feat1_q: "उस पल के लिए जब कोई पूछे, “क्या आप वह दस्तावेज़ भेज सकते हैं?”",
    feat1_link: "देखें शेयरिंग आपकी ज़िंदगी में कैसे उतरती है",
    feat1_search: "खोजें “जन्म प्रमाणपत्र”",
    feat1_f1: "आईडी और प्रमाणपत्र",
    feat1_f2: "संपत्ति के कागज़",
    feat1_f3: "स्कूल रिकॉर्ड",
    feat1_f4: "बीमा",
    feat2_meta: "02 / स्वास्थ्य रिकॉर्ड",
    feat2_h: "साफ़ और सटीक स्वास्थ्य इतिहास.",
    feat2_b:
      "रिपोर्ट, नुस्खे, दवाओं की जानकारी और अस्पताल के रिकॉर्ड एक साथ रखें। अगली डॉक्टर से बातचीत के लिए सही जानकारी तैयार रखें।",
    feat2_c1: "नुस्खे",
    feat2_c2: "लैब रिपोर्ट",
    feat2_c3: "दवाएँ",
    feat2_c4: "एलर्जी",
    feat2_c5: "टीके",
    feat2_c6: "रिमाइंडर",
    feat2_note: "रिकॉर्ड देखभाल में मदद करते हैं; उसकी जगह नहीं लेते.",
    feat3_meta: "03 / परिवार और यादें",
    feat3_h: "रिश्ते को जीवंत रखें.",
    feat3_b:
      "अपने पारिवारिक नेटवर्क को देखें, फोटो यादें साझा करें और चैट से जुड़े रहें। हर पोस्ट के लिए दर्शक खुद चुनें।",
    feat3_c1: "फैमिली ट्री",
    feat3_c2: "सर्कल",
    feat3_c3: "टाइमलाइन",
    feat3_c4: "फोटो यादें",
    feat3_c5: "चैट",
    feat3_note: "रोज़ के पल, सोच-समझकर साझा.",
    feat4_meta: "04 / मार्केटप्लेस और लाइव बिड",
    feat4_h: "खोजें. तुलना करें. बोली लगाएँ.",
    feat4_b:
      "प्रोडक्ट देखें, बेचने के विकल्प जानें और बोली में हिस्सा लें। फ़ैसला करने से पहले कुल लागत की तुलना अपने बजट से करें।",
    feat4_auction: "उदाहरण नीलामी",
    feat4_item: "पुरानी सागौन की बुकशेल्फ़",
    feat4_bid: "मौजूदा बोली",
    feat4_bids: "बोलियाँ",
    feat4_ends: "समाप्ति में",
    feat4_note: "बेहतर दाम मिलने की संभावना. बचत की गारंटी नहीं.",

    share_eyebrow: "परिवार के लिए व्यावहारिक सुविधा",
    sharing_h2a: "साथ रहें.",
    sharing_h2b: "दूर से भी.",
    share_p1:
      "भाई-बहन के लिए चुना हुआ दस्तावेज़. अपॉइंटमेंट के लिए तैयार रिपोर्ट. एक फोटो जो सबको उसी पल में ले जाए.",
    share_p2:
      "Quircle के फैमिली, वॉल्ट और हेल्थ सेक्शन इन्हीं रोज़ की ज़रूरतों के लिए बने हैं। पारिवारिक संबंध का मतलब हर निजी रिकॉर्ड देखने की अनुमति कभी नहीं होना चाहिए।",
    share_s1t: "सब एक जगह लाएँ",
    share_s1b: "अपने लिए ज़रूरी दस्तावेज़, रिकॉर्ड या फोटो जोड़ें.",
    share_s2t: "चुनें क्या साझा करना है",
    share_s2b: "भेजने से पहले फ़ाइल, दर्शक और एक्सेस विकल्प जाँचें.",
    share_s3t: "एक्सेस सोच-समझकर दें",
    share_s3b:
      "उपलब्ध शेयरिंग नियंत्रणों का उपयोग करें और देखें कौन आपकी जानकारी देख सकता है। डाउनलोड की गई कॉपी प्राप्तकर्ता के पास रह सकती है।",

    ppl_eyebrow: "दोस्त खोजें",
    people_badge: "योजनाबद्ध मिलान सुविधा",
    people_h2a: "जगह याद है?",
    people_h2b: "लोगों को फिर से खोजें.",
    ppl_p1: "वह स्कूल जहाँ से शुरुआत हुई. वह कॉलेज बैच जो आज भी याद है. वह कार्यस्थल जहाँ दोस्तियाँ बनीं.",
    ppl_p2:
      "Quircle की प्रस्तावित “Find your people” सुविधा वैकल्पिक स्कूल, कॉलेज, कार्यस्थल और वर्ष की जानकारी से प्रासंगिक लोगों के सुझाव देती है। खुद को खोजने योग्य बनाना या जुड़ना — फ़ैसला आपका।",
    ppl_status_b: "आज की स्थिति:",
    ppl_status:
      "प्रीव्यू में मौजूदा फैमिली सर्च दिखाई दी। संस्थान और बैच मिलान विकास के लिए निर्धारित है; रिलीज़ की उपलब्धता अभी तय नहीं है।",
    ppl_btn: "लॉन्च होने पर सूचना पाएँ",
    ppl_panel: "रिश्ता साझा धरातल से शुरू होता है",
    ppl_s1t: "आपका संस्थान",
    ppl_s1b: "स्कूल, कॉलेज या कार्यस्थल",
    ppl_s2t: "वहाँ बिताया समय",
    ppl_s2b: "कैंपस, बैच या एक ही समय के वर्ष",
    ppl_s3t: "आपकी पसंद",
    ppl_s3b: "ऑप्ट-इन करें, सुझाव देखें, रिक्वेस्ट भेजें",
    ppl_close: "साझा अतीत नई बातचीत की शुरुआत हो सकता है।",

    mkt_eyebrow: "खरीदें • बेचें • बोली लगाएँ",
    market_h2a: "रोज़ की खोजें.",
    market_h2b: "कीमत का फ़ैसला आपका.",
    mkt_p: "अपनी ज़रूरत की चीज़ें खोजें. उपयोगी सामान को नया घर दें. तय खर्च-सीमा के साथ लाइव नीलामी देखें.",
    mkt_buy_h: "खरीदारों के लिए",
    mkt_buy_b:
      "सामान की स्थिति, विक्रेता की जानकारी, डिलीवरी शुल्क और कुल कीमत जाँचें। केवल उतनी ही बोली लगाएँ जितना आप आराम से चुका सकें।",
    mkt_sell_h: "विक्रेताओं के लिए",
    mkt_sell_b:
      "प्रोडक्ट स्पष्ट रूप से प्रस्तुत करें, सही शर्तें तय करें और बेचने से पहले ऐप की पात्रता व सत्यापन प्रक्रिया पूरी करें।",
    mkt_note:
      "नीलामी की अंतिम कीमत बढ़ सकती है। जीत, छूट, स्टॉक और डिलीवरी लिस्टिंग और लागू शर्तों पर निर्भर करती है।",

    svc_eyebrow: "रोज़ की और भी चीज़ें, उसी जगह",
    services_h2a: "घर के कामों में मदद.",
    services_h2b: "आपके लोग, आपके साथ.",
    svc1_h: "Quick Help & Hire Pro",
    svc1_b:
      "सेवा श्रेणियाँ, प्रोफेशनल प्रोफ़ाइल और बुकिंग विकल्प देखें। उपलब्धता स्थान और सेवा-प्रदाताओं पर निर्भर करती है।",
    svc2_h: "चैट और सर्कल",
    svc2_b: "बातचीत जारी रखें और अपने निजी संबंध Quircle के अंदर ही बनाए रखें।",
    svc3_h: "News Room",
    svc3_b: "विभिन्न विषयों की खबरें पढ़ें और हर खबर को उसके मूल स्रोत तक जाएँ — उसी Quircle अनुभव के भीतर।",
    svc4_h: "हेल्थ शेयरिंग",
    svc4_b:
      "प्रीव्यू में डॉक्टर-शेयरिंग और कंसल्टेशन-रिक्वेस्ट विकल्प मौजूद हैं। लाइव कंसल्टेशन और नए पेमेंट फ़्लो अभी समीक्षा में हैं।",
    svc_list_h: "प्रीव्यू में दिखी सेवा श्रेणियाँ",
    svc_c1: "इलेक्ट्रीशियन",
    svc_c2: "प्लंबर",
    svc_c3: "देखभालकर्ता",
    svc_c4: "ट्यूटर",
    svc_c5: "ड्राइवर",
    svc_c6: "घरेलू सहायता",
    svc_c7: "बेबीसिटर",

    data_eyebrow: "अपनी जानकारी को समझें",
    data_h2a: "उपयोगी जानकारी.",
    data_h2b: "स्पष्ट उद्देश्य.",
    data_p:
      "ये उदाहरण बताते हैं कि जानकारी Quircle की सुविधाओं में कैसे काम आती है। सटीक संग्रह, एक्सेस और रखरखाव की शर्तों के लिए ऐप के मौजूदा नोटिस और अनुमति स्क्रीन देखें।",
    data_th1: "जानकारी",
    data_th2: "यह क्यों उपयोगी है",
    data_th3: "क्या जाँचें",
    data_r1a: "खाता और प्रोफ़ाइल विवरण",
    data_r1b: "अपना खाता एक्सेस करें और संपर्कों के सामने अपनी पहचान दें.",
    data_r1c: "कौन से प्रोफ़ाइल फ़ील्ड दिख रहे हैं.",
    data_r2a: "दस्तावेज़ और फ़ाइल विवरण",
    data_r2b: "चुने हुए रिकॉर्ड व्यवस्थित करें, खोजें और साझा करें.",
    data_r2c: "प्राप्तकर्ता, दायरा और लिंक एक्सेस.",
    data_r3a: "स्वास्थ्य रिकॉर्ड",
    data_r3b: "अपने लिए और अधिकृत देखभाल चर्चाओं के लिए इतिहास रखें.",
    data_r3c: "मरीज़, चुनी हुई रिपोर्ट और शेयरिंग की सहमति.",
    data_r4a: "फोटो और सोशल गतिविधि",
    data_r4b: "यादें साझा करें और बातचीत जारी रखें.",
    data_r4c: "पोस्ट करने से पहले दर्शक और लोकेशन.",
    data_r5a: "शिक्षा और कार्य विवरण",
    data_r5b: "संबंधित साझा संस्थान या समय के लोगों के सुझाव.",
    data_r5c: "वैकल्पिक खोज और कनेक्शन विकल्प.",
    data_r5badge: "योजनाबद्ध मिलान",
    data_r6a: "लिस्टिंग, बोली और ऑर्डर विवरण",
    data_r6b: "प्रोडक्ट खोज और लेन-देन की जानकारी.",
    data_r6c: "कुल लागत, विक्रेता शर्तें और डिलीवरी विवरण.",
    data_note:
      "यह पेज उत्पाद के उपयोग को समझाता है; यह गोपनीयता नीति या सुरक्षा प्रमाणन नहीं है। यह वेबसाइट अर्ली-एक्सेस फ़ॉर्म में दी गई जानकारी सहेजती है और बटन-क्लिक (डाउनलोड और प्रीव्यू ओपन) की साधारण, गुमनाम गिनती रखती है। वैकल्पिक अनुवाद बटन Google Translate द्वारा दिया गया है और आपके उपयोग करने पर ही Google की स्क्रिप्ट लोड करता है।",

    dl_eyebrow: "करीब से देखें",
    downloads_h2a: "आपकी Quircle",
    downloads_h2b: "परिचय किट.",
    dl_p: "ओवरव्यू साझा करें, फ़ीचर कैटलॉग देखें, या ऐप प्रीव्यू खोलें.",
    dl1_t: "ब्रोशर",
    dl1_b: "Quircle के उद्देश्य और लाभों का संक्षिप्त परिचय.",
    dl1_cta: "ब्रोशर डाउनलोड करें",
    dl2_t: "फ़ीचर कैटलॉग",
    dl2_b: "उपयोग के उदाहरण, जानकारी की ज़रूरतें और उपलब्धता नोट्स.",
    dl2_cta: "कैटलॉग डाउनलोड करें",
    dl_flip: "पलटकर देखें",
    dl_modal_hint: "तीरों से पेज पलटें",
    dl_download: "डाउनलोड",
    dl_prefer: "पहले खुद देखना चाहेंगे?",
    dl_open: "ऐप प्रीव्यू खोलें",

    nt_eyebrow: "लॉन्च अपडेट पाएँ",
    notify_h2a: "सबसे पहले जानें",
    notify_h2b: "जब Quircle सबके लिए खुले.",
    nt_p:
      "अपनी जानकारी दें; नई सुविधाएँ आने पर — योजनाबद्ध Find a Friend मिलान समेत — हम आपको लिखेंगे। न स्पैम, न आपकी जानकारी की बिक्री.",
    nt_count: "अभी तक {n} लोगों ने रुचि दर्ज कराई है.",
    nt_empty: "रुचि दर्ज कराने वालों में पहले बनें.",
    nt_name: "आपका नाम",
    nt_email: "ईमेल",
    nt_city: "शहर",
    nt_family: "परिवार का आकार",
    nt_role: "मैं हूँ…",
    nt_select: "चुनें",
    nt_fs1: "1–2 लोग",
    nt_fs2: "3–4 लोग",
    nt_fs3: "5 या अधिक",
    nt_r1: "माता-पिता / घर संचालक",
    nt_r2: "वरिष्ठ परिजन",
    nt_r3: "युवा",
    nt_r4: "कार्यरत प्रोफेशनल",
    nt_r5: "अन्य",
    nt_submit: "लॉन्च पर मुझे सूचित करें",
    nt_saving: "सहेजा जा रहा है…",
    nt_note: "आपकी जानकारी केवल Quircle के बारे में संपर्क के लिए सहेजी जाती है। बस.",

    ga_eyebrow: "ऐप पाएँ",
    getapp_h2a: "Quircle,",
    getapp_h2b: "अब आपकी जेब में.",
    ga_p:
      "अपने फोन पर पारिवारिक जीवन को एक साथ देखें — दस्तावेज़, स्वास्थ्य, यादें और मार्केटप्लेस, एक ही Quircle होम स्क्रीन पर.",
    ga_open: "ऐप प्रीव्यू खोलें",
    ga_copy: "ऐप लिंक कॉपी करें",
    ga_send_h: "लिंक किसी मोबाइल नंबर पर भेजें",
    ga_send_note:
      "WhatsApp खुलता है, उस नंबर पर भेजने के लिए लिंक तैयार रहता है। भारत के बाहर के नंबर के लिए कंट्री कोड डालें.",
    ga_caveat:
      "मौजूदा प्रीव्यू के लिए Expo Go या नवीनीकृत एक्सेस की ज़रूरत हो सकती है। ऐप-स्टोर उपलब्धता और स्थायी डाउनलोड लिंक अभी तय नहीं हैं.",
    ga_qr: "अपने फोन पर खोलने के लिए स्कैन करें",
    ga_badge: "लाइव प्रीव्यू",

    cl_eyebrow: "जो मायने रखता है, उसे पास रखें",
    closing_h2a: "आपके रिकॉर्ड. आपकी यादें.",
    closing_h2b: "आपके लोग. आपका Quircle.",
    closing_cta1: "ऐप प्रीव्यू खोलें",
    closing_cta2: "ब्रोशर पाएँ",
    cl_note:
      "मौजूदा प्रीव्यू के लिए Expo Go या नवीनीकृत एक्सेस ज़रूरी हो सकता है। ऐप-स्टोर उपलब्धता और स्थायी लॉन्च लिंक अभी तय नहीं हैं.",

    ft_tag: "आपका पारिवारिक जीवन, जुड़ा हुआ। प्रोडक्ट ओवरव्यू · सितंबर 2026.",
    ft_explore: "देखें",
    ft_product: "प्रोडक्ट",
    ft_preview: "ऐप प्रीव्यू खोलें",
    ft_notify: "लॉन्च अपडेट पाएँ",
    ft_info: "जानकारी और विकल्प",
    ft_getapp: "ऐप पाएँ",
    ft_legal:
      "सुविधाएँ और उपलब्धता बदल सकती है। लाइफ़स्टाइल और फ़ीचर छवियाँ प्रस्तुतिकरण के लिए हैं। यह एक प्रोडक्ट प्रीव्यू वेबसाइट है, ऐप-स्टोर लिस्टिंग नहीं.",
  },
} as const;

export type StringKey = keyof (typeof STRINGS)["en"];

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: StringKey) => string;
}>({
  lang: "en",
  setLang: () => {},
  t: (k) => STRINGS.en[k],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (k: StringKey) => STRINGS[lang][k];
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
