# -*- coding: utf-8 -*-
"""One-off content migration: populate Location.content_html from content.md B17-B19."""
from app import create_app
from app.extensions import db
from app.models import Location

app = create_app()

LOCATIONS = {
    "delhi": """
<p>Neighshop Global is headquartered in Delhi, and that's where most of our team works. We help Delhi NCR startups, retailers, clinics, institutes, manufacturers and service businesses go digital with custom websites, mobile apps, CRM software, e-commerce stores and growth marketing. When you work with a local team, you can meet in person, move faster and talk to people who understand the Delhi market.</p>

<h2>Services for Delhi Businesses</h2>
<p>Website Development · Mobile App Development · CRM &amp; Custom Software · E-Commerce Development · SEO &amp; Local SEO · Social Media Marketing · Branding · Video &amp; UGC · Landing Pages</p>

<h2>Areas We Serve</h2>
<p>North Delhi (Narela, Rohini, Pitampura, Model Town), Central Delhi (Connaught Place, Karol Bagh), South Delhi (Saket, Nehru Place, Okhla), West Delhi (Janakpuri, Rajouri Garden, Dwarka), East Delhi (Laxmi Nagar, Preet Vihar), and across NCR: Gurugram, Noida, Greater Noida, Ghaziabad, Faridabad and Sonipat.</p>

<h2>Why Delhi Businesses Choose Us</h2>
<ul>
<li>A local team for in-person meetings and faster decisions</li>
<li>Experience across e-commerce, healthcare, logistics and service marketplaces</li>
<li>Local SEO expertise to help you win "near me" searches in Delhi NCR</li>
<li>Source code ownership on eligible projects and 3–6 months of post-launch support</li>
</ul>

<h2>Learn With Us in Delhi</h2>
<p>Our Industry Internship Program runs at our Narela training centre.</p>
""",
    "jaipur": """
<p><strong>Our Jaipur presence is currently under maintenance.</strong> Jaipur projects are fully supported by our Delhi team, remotely and with on-site visits when needed.</p>

<p>From handicraft and textile exporters to hotels, jewellers and fast-growing startups, Jaipur businesses are selling to the world online. Neighshop Global builds the e-commerce stores, booking platforms, apps and marketing that make that possible. Popular Jaipur projects include export e-commerce websites, hotel and travel booking sites, jewellery catalogues, and CRM software for traders and manufacturers.</p>
""",
    "bangalore": """
<p>Bangalore is India's startup capital, and we're on our way. Until our local presence opens, Bangalore founders can work with our Delhi-based team remotely for MVP development, cross-platform apps, SaaS web platforms, AI integrations and growth marketing, with the same process, the same team and the same support.</p>
""",
}

TITLES = {
    "delhi": "Software, App & Website Development Company in Delhi",
    "jaipur": "App & Website Development for Jaipur Businesses",
    "bangalore": "Neighshop Global in Bangalore: Coming Soon",
}


def run():
    with app.app_context():
        updated = []
        for slug, html in LOCATIONS.items():
            loc = Location.query.filter_by(slug=slug).first()
            if not loc:
                continue
            loc.content_html = html.strip()
            updated.append(slug)
        db.session.commit()
        print("Updated:", updated)


if __name__ == "__main__":
    run()
