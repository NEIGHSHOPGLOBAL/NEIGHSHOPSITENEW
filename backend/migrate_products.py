"""One-off content migration: update all 3 Product records from content.md."""
from app import create_app
from app.extensions import db
from app.models import Product, Faq

app = create_app()

PRODUCTS = {
    "rapido-clone": {
        "new_slug": "rapido-clone",
        "name": "Rapido Clone",
        "category": "Ride-Sharing Platform",
        "description": "Launch your own bike taxi and cab booking business: rider app, driver app, admin panel, live GPS tracking, payments and source code, branded as your own.",
        "features": [
            "Android App", "iOS App", "Driver App", "Admin Panel", "Live GPS Tracking",
            "Payment Integration", "Source Code", "Deployment Support",
        ],
        "price_label": "On request",
        "meta_title": "Rapido Clone — Bike Taxi App Development | Neighshop Global",
        "meta_description": "Launch your bike taxi and cab booking business with our Rapido clone: rider app, driver app, admin panel, live GPS tracking, payments and source code.",
        "html": """
<p><em>Disclaimer: "Rapido" is a trademark of its respective owner. Neighshop Global is not affiliated with Rapido. "Rapido clone" describes the business model; your app launches under your own brand.</em></p>

<p>Bike taxis, auto rides and cab booking have changed how India commutes, and the opportunity in Tier-2 and Tier-3 cities, campus towns and niche mobility is far from saturated. Our Rapido clone is a ready-to-customise ride-hailing platform that gets you to market in weeks, not months. You get a rider app, a driver app and a complete admin panel, branded as your own.</p>

<h2>What You Get</h2>
<ul>
<li><strong>Rider app (Android &amp; iOS):</strong> Book bike taxis, autos or cabs, see fare estimates, track the driver live, pay in-app and rate the ride.</li>
<li><strong>Driver app (Android &amp; iOS):</strong> Go online/offline, accept rides, navigate, track earnings and upload documents.</li>
<li><strong>Admin panel:</strong> Manage riders, drivers, vehicle types, fares, zones, payouts, promotions and reports.</li>
<li><strong>Live GPS tracking:</strong> Real-time location for riders, drivers and admins.</li>
<li><strong>Payment integration:</strong> UPI, cards, wallets and cash, with driver commission settlement.</li>
<li><strong>Source code:</strong> Full source code ownership available.</li>
<li><strong>Deployment support:</strong> Server setup and Play Store/App Store publishing assistance.</li>
</ul>

<h2>Key Features</h2>
<p><strong>Rider side:</strong> OTP login · Multiple vehicle types (bike, auto, cab) · Fare estimate before booking · Scheduled rides · SOS/emergency button · Share live trip · Ride history &amp; invoices · Referral codes · Ratings &amp; feedback</p>
<p><strong>Driver side:</strong> Document verification (KYC) · Ride requests with accept/decline · In-app navigation · Daily/weekly earnings · Incentive tracking · Subscription or commission model support</p>
<p><strong>Admin side:</strong> Dashboard with live map · Zone and surge pricing · Driver approval workflow · Commission settings · Promo codes · Complaint management · Revenue reports · Push notifications</p>

<h2>Business Models Supported</h2>
<ul>
<li>Commission per ride</li>
<li>Driver subscription plans (popular for zero-commission positioning)</li>
<li>Corporate/B2B commute</li>
<li>Parcel and bike delivery add-on</li>
</ul>

<h2>Why Build with Neighshop Global?</h2>
<ul>
<li><strong>Faster launch:</strong> A pre-built core means you customise, not reinvent.</li>
<li><strong>Your brand, your rules:</strong> Custom logo, colours, pricing model and features.</li>
<li><strong>Scalable backend:</strong> Cloud-hosted on AWS for growth city by city.</li>
<li><strong>Support after launch:</strong> 3–6 months of post-launch support, depending on the agreement.</li>
</ul>
""",
        "faqs": [
            ("How long does it take to launch a Rapido clone?", "A branded launch with standard features is much faster than custom development. Timelines depend on customisations. Ask us for a schedule."),
            ("Can I add autos, cabs and parcel delivery?", "Yes. Vehicle types and services are configurable."),
            ("Do I get the source code?", "Full source code ownership is available."),
            ("Is it legal to run a bike taxi service?", "Bike taxi regulations vary by state in India. Please check local transport rules and licensing before launch. This is not legal advice."),
            ("What does it cost?", "Pricing depends on features and customisation. Request a demo and quote."),
        ],
    },
    "urban-company-clone": {
        "new_slug": "urban-company-clone",
        "name": "Urban Company Clone",
        "category": "Service Marketplace",
        "description": "Build your own on-demand home services marketplace: customer app, vendor app, admin dashboard, bookings, payments, reviews and source code, under your own brand.",
        "features": [
            "Customer App", "Vendor App", "Admin Dashboard", "Booking Management",
            "Payment Gateway", "Reviews & Ratings", "Source Code",
        ],
        "price_label": "On request",
        "meta_title": "Urban Company Clone — Home Services App | Neighshop Global",
        "meta_description": "Start your home services marketplace with our Urban Company clone: customer app, vendor app, admin dashboard, bookings, payments, reviews and source code.",
        "html": """
<p><em>Disclaimer: "Urban Company" is a trademark of its respective owner. Neighshop Global is not affiliated with Urban Company. "Urban Company clone" describes the business model; your app launches under your own brand.</em></p>

<p>Salon at home, AC repair, cleaning, plumbing, appliance servicing: consumers now expect to book trusted professionals in a few taps. Our Urban Company clone gives you a complete service marketplace that connects customers with verified service providers, with bookings, payments and reviews built in. Launch city-wide or own a niche like pet grooming, car washing or elder care.</p>

<h2>What You Get</h2>
<ul>
<li><strong>Customer app:</strong> Browse services, pick a time slot, book, pay, track the professional and leave a review.</li>
<li><strong>Vendor/partner app:</strong> Receive jobs, manage availability, navigate to customers, mark jobs complete and track earnings.</li>
<li><strong>Admin dashboard:</strong> Manage categories, pricing, partners, bookings, commissions, payouts, coupons and disputes.</li>
<li><strong>Booking management:</strong> Slot-based scheduling, auto-assignment, rescheduling and cancellations.</li>
<li><strong>Payment gateway:</strong> UPI, cards, wallets and pay-after-service options.</li>
<li><strong>Reviews &amp; ratings:</strong> Two-way ratings to build trust and quality.</li>
<li><strong>Source code:</strong> Full source code ownership available.</li>
</ul>

<h2>Key Features</h2>
<p>Service categories and sub-categories · Package and add-on pricing · Location-based partner matching · Partner KYC and verification · In-app chat and calling · Live job tracking · Invoices with GST · Referral and loyalty programs · Push, SMS and WhatsApp notifications · Multi-city management</p>

<h2>Niches You Can Launch</h2>
<p>Beauty &amp; salon at home · Cleaning &amp; pest control · Appliance &amp; AC repair · Plumbing &amp; electrical · Car wash &amp; detailing · Pet grooming &amp; care · Tutoring · Elder care &amp; nursing · Laundry · Packers &amp; movers</p>

<h2>Why Choose Neighshop Global?</h2>
<p>Our portfolio includes multiple service-provider marketplace concept and reference builds, from home services to local service marketplaces, so we understand the hard parts: partner supply, slot logic and trust.</p>
""",
        "faqs": [
            ("Can I start with one category and expand later?", "Yes. Most successful marketplaces start narrow and add categories over time."),
            ("How do service providers get paid?", "The admin panel calculates commission and supports scheduled payouts to partners."),
            ("Can customers pay after the service?", "Yes. Pay-after-service and prepaid options are configurable."),
            ("Do I get the source code?", "Full source code ownership is available."),
        ],
    },
    "crm-custom-software": {
        "new_slug": "crm-software",
        "name": "CRM & Custom Software",
        "category": "Business Software",
        "description": "Custom CRM and business software for sales, operations, inventory and HR, configured to match the way your business already runs.",
        "features": [
            "Operations Automation", "Productivity", "Custom Reporting", "Role-Based Access",
            "API Integrations", "Scalable Architecture",
        ],
        "price_label": "On request",
        "meta_title": "CRM Software for Business — Custom Built | Neighshop Global",
        "meta_description": "Custom CRM and business software for sales, operations, inventory and HR. Automation, custom reports, role-based access and API integrations. Book a demo today.",
        "html": """
<p>Stop losing leads in WhatsApp chats and Excel sheets. Neighshop Global's CRM and custom software platform brings your sales, operations, inventory and HR together in one secure system, configured to match the way your business already runs.</p>

<h2>Core Modules</h2>
<ul>
<li><strong>Sales CRM:</strong> Lead capture from website, ads and WhatsApp; pipelines; follow-ups; quotations.</li>
<li><strong>Operations:</strong> Tasks, approvals, job tracking and field-team management.</li>
<li><strong>Inventory:</strong> Stock, purchase orders, suppliers and multi-location warehouses.</li>
<li><strong>HR:</strong> Attendance, leave, payroll and employee records.</li>
<li><strong>Reports:</strong> Custom dashboards and exports for management.</li>
</ul>

<h2>Built-In Strengths</h2>
<p>Operations automation · Productivity tools · Custom reporting · Role-based access · API integrations · Scalable architecture</p>

<h2>See It in Action: Orbito CRM (Neighshop Demo)</h2>
<p>Orbito CRM is a clinic CRM demo built by Neighshop Global. It shows how appointments, patient follow-ups and clinic operations can be managed in one dashboard.</p>
""",
        "faqs": [
            ("Is this a SaaS subscription or a one-time build?", "It's custom software tailored to you. Ask us about licensing and pricing for your use case."),
            ("Can it integrate with WhatsApp and Tally?", "Yes. API integrations are a core feature."),
            ("Can it be hosted on our own server?", "Yes. We deploy on AWS, DigitalOcean or your preferred infrastructure."),
        ],
    },
}


def run():
    with app.app_context():
        updated, missed = [], []
        for old_slug, data in PRODUCTS.items():
            p = Product.query.filter_by(slug=old_slug).first()
            if not p:
                missed.append(old_slug)
                continue
            p.slug = data["new_slug"]
            p.name = data["name"]
            p.category = data["category"]
            p.description = data["description"]
            p.features = data["features"]
            p.price_label = data["price_label"]
            p.meta_title = data["meta_title"]
            p.meta_description = data["meta_description"]
            p.long_content_html = data["html"].strip()

            Faq.query.filter_by(product_id=p.id).delete()
            for i, (q, a) in enumerate(data["faqs"]):
                db.session.add(Faq(question=q, answer=a, display_order=i, is_global=False, product_id=p.id, category="product"))

            updated.append(data["new_slug"])
        db.session.commit()
        print("Updated:", updated)
        print("Missed:", missed)


if __name__ == "__main__":
    run()
