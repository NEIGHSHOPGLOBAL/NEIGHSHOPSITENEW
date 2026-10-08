"""One-off content migration: update PortfolioItem descriptions/meta from content.md B15."""
from app import create_app
from app.extensions import db
from app.models import PortfolioItem

app = create_app()

PORTFOLIO = {
    "knyamed": (
        "Medical apparel & healthcare e-commerce platform with product variants, sizing and secure checkout.",
        "Medical apparel and healthcare e-commerce build: product variants, size guides, secure payments and order management.",
    ),
    "sardar-fashions": (
        "Fashion retail online storefront with collections, filters and mobile-first checkout.",
        "Fashion retail e-commerce storefront: collections, smart filters, mobile-first checkout and inventory management.",
    ),
    "iymbulan": (
        "Brand-led e-commerce experience focused on storytelling and conversion.",
        "Brand-led e-commerce experience combining storytelling, fast product pages and conversion-focused checkout.",
    ),
    "gymshark": (
        "Study of a high-performance sportswear commerce model.",
        "Reference study of a high-performance sportswear e-commerce model: catalogue, drops and mobile shopping UX.",
    ),
    "starfusion": (
        "Product catalogue and online sales platform.",
        "Product catalogue and online sales platform with category browsing, enquiries and online ordering.",
    ),
    "coutloot": (
        "Resale marketplace for fashion & lifestyle with seller listings.",
        "Fashion and lifestyle resale marketplace build: seller listings, buyer offers, payments and shipping.",
    ),
    "coutloot-app": (
        "Android marketplace app for buying and selling fashion.",
        "Android marketplace app build for buying and reselling fashion and lifestyle products.",
    ),
    "broomees": (
        "On-demand home & lifestyle services platform.",
        "On-demand home and lifestyle services platform: bookings, verified professionals and slot scheduling.",
    ),
    "hoora": (
        "Service booking and provider management platform.",
        "Service booking and provider platform with scheduling, partner management and customer notifications.",
    ),
    "knockman": (
        "Local service provider marketplace.",
        "Local service provider marketplace connecting customers with nearby professionals.",
    ),
    "homiq24": (
        "Home services on-demand platform.",
        "On-demand home services platform with booking, payments and partner tracking.",
    ),
    "taskrabbit": (
        "Reference study of a task-based service marketplace.",
        "Reference study of a task-based service marketplace model: task posting, tasker matching and payments.",
    ),
    "apricott-care": (
        "Care & wellness platform.",
        "Care and wellness platform build: service discovery, bookings and caregiver management.",
    ),
    "kwikmedi": (
        "Medicine delivery & pharmacy technology.",
        "Medicine delivery and pharmacy technology build: prescription upload, catalogue and doorstep delivery.",
    ),
    "max-lab": (
        "Diagnostics & lab services platform.",
        "Diagnostics and lab services platform: test booking, home sample collection and digital reports.",
    ),
    "orbito-crm": (
        "Clinic CRM demo by Neighshop Global.",
        "Orbito CRM, a clinic CRM demo by Neighshop Global: appointments, patient follow-ups and clinic dashboards.",
    ),
    "loadnow": (
        "Freight & logistics operations platform.",
        "Freight and logistics operations platform: load booking, fleet tracking and delivery management.",
    ),
    "red-taxi": (
        "Ride booking platform.",
        "Ride booking platform build with rider and driver apps, live tracking and fare management.",
    ),
    "the-pet-nest": (
        "Pet care services & booking.",
        "Pet care services and booking platform: grooming, boarding and vet appointment scheduling.",
    ),
    "sploot": (
        "Pet wellness & care platform.",
        "Pet wellness and care platform build: content, services and pet parent community features.",
    ),
    "gopuff": (
        "Reference study of an instant-delivery commerce model.",
        "Reference study of an instant-delivery quick-commerce model: dark-store inventory, fast checkout and tracking.",
    ),
    "nymph": (
        "Social dating product experience.",
        "Social dating app build: profiles, matching, chat and safety features.",
    ),
}


def run():
    with app.app_context():
        updated, missed = [], []
        for slug, (desc, meta_desc) in PORTFOLIO.items():
            item = PortfolioItem.query.filter_by(slug=slug).first()
            if not item:
                missed.append(slug)
                continue
            item.description = desc
            item.meta_description = meta_desc
            updated.append(slug)
        db.session.commit()
        print("Updated:", len(updated))
        print("Missed:", missed)


if __name__ == "__main__":
    run()
