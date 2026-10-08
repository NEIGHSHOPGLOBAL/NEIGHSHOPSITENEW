from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash
from slugify import slugify
from .extensions import db
from .models import (
    Admin, Service, Product, PortfolioItem, Post, Faq, TeamMember, Location, Setting
)

SERVICES = [
    {"name": "Custom Website Development", "shortDesc": "Professional business, corporate, portfolio, SaaS websites and web applications.",
     "features": ["Responsive", "Admin Panel", "API Integrations", "SEO-Friendly"], "icon": "globe"},
    {"name": "Mobile App Development", "shortDesc": "Android and iOS applications using modern technologies and scalable architecture.",
     "features": ["Android", "iOS", "E-Commerce", "Healthcare", "Fintech"], "icon": "smartphone"},
    {"name": "CRM & Custom Software", "shortDesc": "Custom CRM, ERP, inventory, HR and business automation systems.",
     "features": ["Automation", "Productivity", "Reporting", "Role-Based Access", "API Integrations"], "icon": "layout-grid"},
    {"name": "Search Engine Optimization", "shortDesc": "SEO strategies focused on rankings, organic traffic and visibility.",
     "features": ["On-Page SEO", "Backlinks", "Technical SEO"], "icon": "search"},
    {"name": "Social Media Marketing", "shortDesc": "Social media management and marketing for business growth.",
     "features": ["Instagram", "Facebook", "LinkedIn", "YouTube"], "icon": "share-2"},
    {"name": "E-Commerce Development", "shortDesc": "Scalable online stores with payments, inventory and administration.",
     "features": ["Payments", "Inventory", "Admin Panel"], "icon": "shopping-cart"},
    {"name": "Graphic Design & Branding", "shortDesc": "Brand identity, UI/UX, social creatives and marketing materials.",
     "features": ["Brand Identity", "UI/UX", "Social Media", "Brochures"], "icon": "palette"},
    {"name": "Video Editing & UGC", "shortDesc": "Video production and editing for advertisements, social media and YouTube.",
     "features": ["Ads", "YouTube", "UGC Content"], "icon": "video"},
    {"name": "Landing Page Design", "shortDesc": "High-converting landing pages for lead generation and product launches.",
     "features": ["Lead Generation", "A/B Ready", "Fast Loading"], "icon": "layout-template"},
]

PRODUCTS = [
    {"name": "Rapido Clone", "category": "Ride-Sharing Platform",
     "description": "Bike taxi, ride-sharing and cab-booking platform.",
     "features": ["Android App", "iOS App", "Driver App", "Admin Panel", "Live GPS Tracking", "Payment Integration", "Source Code", "Deployment Support"],
     "priceLabel": "On request"},
    {"name": "Urban Company Clone", "category": "Service Marketplace",
     "description": "Marketplace connecting customers with professional service providers.",
     "features": ["Customer App", "Vendor App", "Admin Dashboard", "Booking Management", "Payment Gateway", "Reviews & Ratings", "Source Code"],
     "priceLabel": "On request"},
    {"name": "CRM & Custom Software", "category": "Business Software",
     "description": "Custom CRM, ERP, inventory, HR and business automation software.",
     "features": ["Operations Automation", "Productivity", "Custom Reporting", "Role-Based Access", "API Integrations", "Scalable Architecture"],
     "priceLabel": "Starting at request"},
]

PORTFOLIO = [
    {"name": "Knyamed", "category": "E-Commerce", "description": "Medical apparel & healthcare e-commerce platform", "type": "REFERENCE_CONCEPT"},
    {"name": "Sardar Fashions", "category": "E-Commerce", "description": "Fashion retail & online storefront", "type": "REFERENCE_CONCEPT"},
    {"name": "Iymbulan", "category": "E-Commerce", "description": "Brand-led e-commerce experience", "type": "REFERENCE_CONCEPT"},
    {"name": "Gymshark", "category": "E-Commerce", "description": "High-performance sportswear commerce", "type": "REFERENCE_CONCEPT"},
    {"name": "Starfusion", "category": "E-Commerce", "description": "Product catalog & online sales", "type": "REFERENCE_CONCEPT"},
    {"name": "Coutloot", "category": "E-Commerce", "description": "Resale marketplace for fashion & lifestyle", "type": "REFERENCE_CONCEPT"},
    {"name": "Coutloot App", "category": "Mobile App", "description": "Android marketplace app", "type": "REFERENCE_CONCEPT"},
    {"name": "Broomees", "category": "Service Provider", "description": "On-demand home & lifestyle services", "type": "REFERENCE_CONCEPT"},
    {"name": "Hoora", "category": "Service Provider", "description": "Service booking & provider platform", "type": "REFERENCE_CONCEPT"},
    {"name": "Knockman", "category": "Service Provider", "description": "Local service provider marketplace", "type": "REFERENCE_CONCEPT"},
    {"name": "Homiq24", "category": "Service Provider", "description": "Home services on-demand platform", "type": "REFERENCE_CONCEPT"},
    {"name": "TaskRabbit", "category": "Service Provider", "description": "Task-based service marketplace reference", "type": "REFERENCE_CONCEPT"},
    {"name": "Apricott Care", "category": "Healthcare", "description": "Care & wellness platform", "type": "REFERENCE_CONCEPT"},
    {"name": "Kwikmedi", "category": "Healthcare", "description": "Medicine delivery & pharmacy technology", "type": "REFERENCE_CONCEPT"},
    {"name": "Max Lab", "category": "Healthcare", "description": "Diagnostics & lab services platform", "type": "REFERENCE_CONCEPT"},
    {"name": "Orbito CRM", "category": "Software / CRM", "description": "Clinic CRM — demo by Neighshop Global", "type": "INTERNAL_DEMO"},
    {"name": "LoadNow", "category": "Logistics", "description": "Freight & logistics operations platform", "type": "REFERENCE_CONCEPT"},
    {"name": "Red Taxi", "category": "Cab Booking", "description": "Ride booking platform", "type": "REFERENCE_CONCEPT"},
    {"name": "The Pet Nest", "category": "Pet Care", "description": "Pet care services & booking", "type": "REFERENCE_CONCEPT"},
    {"name": "Sploot", "category": "Pet Care", "description": "Pet wellness & care platform", "type": "REFERENCE_CONCEPT"},
    {"name": "GoPuff", "category": "Quick Delivery", "description": "Instant delivery commerce model", "type": "REFERENCE_CONCEPT"},
    {"name": "Nymph", "category": "Dating App", "description": "Social dating product experience", "type": "REFERENCE_CONCEPT"},
]

TEAM = [
    {"name": "Aakarshan Mishra", "role": "Founder & CEO", "expertise": ["Full Stack", "AI", "IoT", "Strategy"]},
    {"name": "Aryan Mangla", "role": "Chief Technology Officer", "expertise": ["Architecture", "Engineering", "Innovation"]},
    {"name": "Lokesh Chopra", "role": "Chief Operating Officer", "expertise": ["Operations", "Projects", "Client Success"]},
]

FAQ = [
    {"question": "Do you provide source code?", "answer": "Yes. Full source code ownership is available for eligible projects and products."},
    {"question": "Do you provide hosting?", "answer": "Yes. Hosting setup and deployment assistance are offered on AWS, DigitalOcean or shared hosting."},
    {"question": "How long does development take?", "answer": "A few weeks for landing pages to several months for complex applications, depending on scope."},
    {"question": "Do you provide post-launch support?", "answer": "Yes. Post-launch support is generally 3–6 months depending on the project agreement."},
    {"question": "Can you build fully custom software?", "answer": "Yes. Fully customized software can be built around the client's business requirements and workflows."},
]

LOCATIONS = [
    {"city": "Delhi", "status": "Active", "address": "Delhi, India", "phone": "+91 8307802643"},
    {"city": "Jaipur", "status": "Maintenance", "address": "Jaipur, Rajasthan", "phone": "+91 8307802643"},
    {"city": "Bangalore", "status": "Coming Soon", "address": "Bangalore, Karnataka", "phone": "+91 8307802643"},
]

POSTS = [
    {"title": "Why Startups Should Invest in Custom Software Early",
     "excerpt": "Off-the-shelf tools break down as you scale. Here's when to go custom.",
     "category": "Strategy", "tags": ["Startups", "Software"]},
    {"title": "Rapido Clone vs Building From Scratch: What Costs Less?",
     "excerpt": "A breakdown of ready-made ride-sharing platforms versus ground-up development.",
     "category": "Products", "tags": ["Ride-sharing", "Cost"]},
    {"title": "SEO Fundamentals Every Business Website Needs in 2026",
     "excerpt": "Technical SEO, content and backlinks — the essentials that still move rankings.",
     "category": "SEO", "tags": ["SEO", "Marketing"]},
]


def _service_long_content(s):
    feats = "".join(f"<li>{f}</li>" for f in s["features"])
    return f"<p>{s['shortDesc']}</p><h2>What's included</h2><ul>{feats}</ul>"


def run_seed():
    if Admin.query.first():
        return

    admin = Admin(
        name="Neighshop Admin",
        email="info.neighshopglobal@gmail.com",
        password_hash=generate_password_hash("Neighshop@123"),
    )
    db.session.add(admin)

    for i, s in enumerate(SERVICES):
        db.session.add(Service(
            name=s["name"], slug=slugify(s["name"]), short_desc=s["shortDesc"],
            long_content_html=_service_long_content(s), icon_key=s["icon"],
            features=s["features"], tech_tags=[], display_order=i, status="PUBLISHED",
            meta_title=f"{s['name']} | Neighshop Global",
            meta_description=s["shortDesc"][:155],
        ))

    for i, p in enumerate(PRODUCTS):
        db.session.add(Product(
            name=p["name"], slug=slugify(p["name"]), category=p["category"],
            description=p["description"], features=p["features"], price_label=p["priceLabel"],
            demo_url="", display_order=i, status="PUBLISHED",
            meta_title=f"{p['name']} | Neighshop Global",
            meta_description=p["description"][:155],
        ))

    for i, pf in enumerate(PORTFOLIO):
        db.session.add(PortfolioItem(
            name=pf["name"], slug=slugify(pf["name"]), category=pf["category"],
            description=pf["description"], portfolio_type=pf["type"],
            client_approved=False, display_order=i, status="PUBLISHED",
            results=[], tech_used=[],
            meta_title=f"{pf['name']} | Neighshop Global Portfolio",
            meta_description=pf["description"][:155],
        ))

    for i, t in enumerate(TEAM):
        db.session.add(TeamMember(
            name=t["name"], role=t["role"], bio=f"{t['role']} at Neighshop Global, focused on {', '.join(t['expertise']).lower()}.",
            expertise=t["expertise"], display_order=i, is_visible=True,
        ))

    for i, f in enumerate(FAQ):
        db.session.add(Faq(question=f["question"], answer=f["answer"], display_order=i, is_global=True, category="general"))

    for i, l in enumerate(LOCATIONS):
        db.session.add(Location(
            city=l["city"], slug=slugify(l["city"]), status=l["status"],
            address=l["address"], phone=l["phone"], display_order=i,
            content_html=f"<p>Neighshop Global in {l['city']} — {l['status']}.</p>",
        ))

    now = datetime.utcnow()
    for i, p in enumerate(POSTS):
        body = f"<p>{p['excerpt']}</p><h2>Overview</h2><p>At Neighshop Global we work with startups and growing businesses across {', '.join(p['tags'])}. This article covers the key considerations our team walks clients through during discovery.</p><h2>Key takeaways</h2><ul><li>Start with a clear scope and measurable goals</li><li>Pick the right technology for your stage, not the trendiest one</li><li>Plan for 3-6 months of post-launch support</li></ul>"
        db.session.add(Post(
            title=p["title"], slug=slugify(p["title"]), excerpt=p["excerpt"],
            content_html=body, category=p["category"], tags=p["tags"],
            author_name="Neighshop Team", status="PUBLISHED", is_featured=(i == 0),
            reading_time_min=4 + i, published_at=now - timedelta(days=i * 3),
            meta_title=f"{p['title']} | Neighshop Global Blog",
            meta_description=p["excerpt"][:155],
        ))

    settings = {
        "company": {
            "companyName": "Neighshop Global",
            "website": "https://neighshopglobal.com/",
            "industry": ["Software Development", "IT Services", "Digital Marketing", "Product Engineering", "Business Automation"],
            "positioning": "End-to-end software engineering and digital growth partner",
            "market": "India and international",
            "headOffice": "Delhi, India",
            "phone": "+91 8307802643",
            "email": "info@neighshopglobal.com",
            "mission": "Make high-quality technology accessible to startups and businesses without excessive software development costs.",
            "specializations": ["Software Development", "Mobile Applications", "Web Applications", "Business Automation", "Digital Marketing", "Branding", "Product Engineering"],
        },
        "stats": {
            "clientsServed": "100+", "teamMembers": "25+", "yearsExperience": "7+",
            "projectsDelivered": "100+", "postLaunchSupport": "3-6 months",
        },
        "technology": {
            "frontend": ["React", "Next.js", "TypeScript"],
            "backend": ["Node.js", "Python", "Django", "Flask"],
            "mobile": ["React Native", "Flutter"],
            "databases": ["PostgreSQL", "MongoDB", "Firebase"],
            "cloudDevops": ["AWS", "Docker"],
            "ai": ["AI / LLMs"],
            "api": ["REST APIs", "GraphQL"],
        },
        "industries": ["Healthcare & MedTech", "Fintech & Payments", "EdTech & E-Learning", "Logistics & Supply Chain", "Real Estate & PropTech", "E-Commerce & Retail"],
        "process": [
            {"step": 1, "name": "Discovery & Consultation"},
            {"step": 2, "name": "Requirement Analysis"},
            {"step": 3, "name": "Design & Planning"},
            {"step": 4, "name": "Development"},
            {"step": 5, "name": "Testing & QA"},
            {"step": 6, "name": "Deployment & Support"},
        ],
        "commercialFlow": ["Discovery Call", "Scope & Quote", "Design & Build", "Launch & Support"],
        "training": {
            "program": "Industry Internship Program",
            "duration": "45 Days",
            "mode": "Offline",
            "location": "Narela, Delhi",
            "batchSize": "Maximum 10 students",
            "price": "₹5,499",
            "eligibility": "Students / Graduates with basic computer knowledge",
            "curriculum": ["HTML", "CSS", "JavaScript", "Responsive Design", "MongoDB", "Express", "React", "Node.js", "API Development", "AI & Prompt Engineering", "Git & GitHub", "AWS", "cPanel"],
            "projects": ["3 Mini Projects", "2 Major Projects", "1+ Real Client Project"],
            "address": "3rd Floor WeWork, Dayanand Tower, above DN charitable clinic, pkt-3, Sector A9, Narela, Delhi, 110040",
            "trainingPhone": "+91 7688877547",
            "website": "https://training.neighshopglobal.com/",
        },
    }
    for key, value in settings.items():
        db.session.add(Setting(key=key, value=value))

    db.session.add(Setting(key="tracking", value=dict(DEFAULT_TRACKING)))
    db.session.commit()


DEFAULT_TRACKING = {
    "enabled": True,
    "gtmId": "",
    "ga4Id": "",
    "googleAdsId": "",
    "googleAdsLabel": "",
    "metaPixelId": "",
    "linkedinPartnerId": "",
    "tiktokPixelId": "",
    "twitterPixelId": "",
    "pinterestTagId": "",
    "clarityId": "",
    "hotjarId": "",
    "searchConsoleVerification": "",
    "bingVerification": "",
    "facebookDomainVerification": "",
    "customHeadHtml": "",
    "customBodyHtml": "",
}


def ensure_defaults():
    """Fill settings that older databases were seeded without."""
    row = db.session.get(Setting, "tracking")
    if not row:
        db.session.add(Setting(key="tracking", value=dict(DEFAULT_TRACKING)))
    else:
        current = row.value if isinstance(row.value, dict) else {}
        row.value = {**DEFAULT_TRACKING, **current}
    db.session.commit()
