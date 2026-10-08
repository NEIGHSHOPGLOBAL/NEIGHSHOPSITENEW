"""One-off content migration: replace global FAQs with the categorized set from content.md B20."""
from app import create_app
from app.extensions import db
from app.models import Faq

app = create_app()

GROUPS = [
    ("general", "General", [
        ("Do you provide source code?", "Yes. Full source code ownership is available for eligible projects and products."),
        ("Do you provide hosting?", "Yes. We set up hosting and help with deployment on AWS, DigitalOcean or shared hosting."),
        ("How long does development take?", "Landing pages take a few weeks. Complex applications can take several months, depending on scope."),
        ("Do you provide post-launch support?", "Yes. Post-launch support is generally 3–6 months, depending on the project agreement."),
        ("Can you build fully custom software?", "Yes. We build software around your business requirements and workflows."),
    ]),
    ("working-with-us", "Working With Us", [
        ("Where are you located?", "Our head office is in Delhi, India. We work with clients across India and internationally."),
        ("Do you work with international clients?", "Yes. We serve clients in India and abroad, with remote collaboration across time zones."),
        ("How do I get a quote?", "Share your requirements through our contact form, phone or WhatsApp. We'll schedule a discovery call and send a scope and quote."),
        ("What technologies do you use?", "React, Next.js, TypeScript, Node.js, Python, Django, React Native, Flutter, PostgreSQL, MongoDB, Firebase, AWS, Docker, REST, GraphQL and AI/LLM integrations."),
        ("Do you sign an NDA?", "Yes, we're happy to sign an NDA before you share confidential details."),
        ("What are your payment terms?", "Payments are typically milestone-based, tied to project phases. Exact terms are set out in your project agreement."),
    ]),
    ("products", "Products", [
        ("What are your ready-made products?", "A Rapido-style ride-hailing platform, an Urban Company-style home services marketplace, and CRM & custom business software."),
        ("Can ready-made products be customised?", "Yes. Branding, features and business rules can be customised."),
    ]),
    ("training", "Training", [
        ("What is the Industry Internship Program?", "A 45-day offline full-stack + AI internship in Narela, Delhi, for a maximum of 10 students per batch, priced at ₹5,499."),
    ]),
]


def run():
    with app.app_context():
        Faq.query.filter_by(is_global=True, service_id=None, product_id=None, post_id=None).delete()
        order = 0
        for category, _label, items in GROUPS:
            for q, a in items:
                db.session.add(Faq(question=q, answer=a, category=category, display_order=order, is_global=True))
                order += 1
        db.session.commit()
        print("Inserted", order, "global FAQs across", len(GROUPS), "categories")


if __name__ == "__main__":
    run()
