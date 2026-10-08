from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models import Service, Product, PortfolioItem, Post, Faq, TeamMember, Location, Lead, Setting

public_bp = Blueprint("public", __name__)


@public_bp.get("/settings")
def get_all_settings():
    rows = Setting.query.all()
    return jsonify({row.key: row.value for row in rows})


@public_bp.get("/services")
def list_services():
    items = Service.query.filter_by(status="PUBLISHED").order_by(Service.display_order).all()
    return jsonify([s.to_dict() for s in items])


@public_bp.get("/services/<slug>")
def get_service(slug):
    s = Service.query.filter_by(slug=slug, status="PUBLISHED").first()
    if not s:
        return jsonify({"error": "Not found"}), 404
    data = s.to_dict()
    faqs = Faq.query.filter_by(service_id=s.id).order_by(Faq.display_order).all()
    data["faqs"] = [f.to_dict() for f in faqs]
    return jsonify(data)


@public_bp.get("/products")
def list_products():
    items = Product.query.filter_by(status="PUBLISHED").order_by(Product.display_order).all()
    return jsonify([p.to_dict() for p in items])


@public_bp.get("/products/<slug>")
def get_product(slug):
    p = Product.query.filter_by(slug=slug, status="PUBLISHED").first()
    if not p:
        return jsonify({"error": "Not found"}), 404
    data = p.to_dict()
    faqs = Faq.query.filter_by(product_id=p.id).order_by(Faq.display_order).all()
    data["faqs"] = [f.to_dict() for f in faqs]
    return jsonify(data)


@public_bp.get("/portfolio")
def list_portfolio():
    q = PortfolioItem.query.filter_by(status="PUBLISHED")
    category = request.args.get("category")
    if category and category != "All":
        q = q.filter_by(category=category)
    items = q.order_by(PortfolioItem.display_order).all()
    return jsonify([p.to_dict() for p in items])


@public_bp.get("/portfolio/<slug>")
def get_portfolio_item(slug):
    p = PortfolioItem.query.filter_by(slug=slug, status="PUBLISHED").first()
    if not p:
        return jsonify({"error": "Not found"}), 404
    return jsonify(p.to_dict())


@public_bp.get("/posts")
def list_posts():
    q = Post.query.filter_by(status="PUBLISHED")
    category = request.args.get("category")
    if category and category != "All":
        q = q.filter_by(category=category)
    search = request.args.get("q")
    if search:
        q = q.filter(Post.title.ilike(f"%{search}%"))
    items = q.order_by(Post.published_at.desc()).all()
    return jsonify([p.to_dict() for p in items])


@public_bp.get("/posts/<slug>")
def get_post(slug):
    p = Post.query.filter_by(slug=slug, status="PUBLISHED").first()
    if not p:
        return jsonify({"error": "Not found"}), 404
    related = Post.query.filter(
        Post.category == p.category, Post.id != p.id, Post.status == "PUBLISHED"
    ).limit(3).all()
    data = p.to_dict()
    data["related"] = [r.to_dict() for r in related]
    faqs = Faq.query.filter_by(post_id=p.id).order_by(Faq.display_order).all()
    data["faqs"] = [f.to_dict() for f in faqs]
    return jsonify(data)


@public_bp.get("/faqs")
def list_faqs():
    items = Faq.query.filter_by(is_global=True).order_by(Faq.display_order).all()
    return jsonify([f.to_dict() for f in items])


@public_bp.get("/team")
def list_team():
    items = TeamMember.query.filter_by(is_visible=True).order_by(TeamMember.display_order).all()
    return jsonify([t.to_dict() for t in items])


@public_bp.get("/locations")
def list_locations():
    items = Location.query.order_by(Location.display_order).all()
    return jsonify([l.to_dict() for l in items])


@public_bp.get("/locations/<slug>")
def get_location(slug):
    l = Location.query.filter_by(slug=slug).first()
    if not l:
        return jsonify({"error": "Not found"}), 404
    return jsonify(l.to_dict())


@public_bp.post("/leads")
def create_lead():
    data = request.get_json() or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    message = (data.get("message") or "").strip()

    if not name or not email or not message:
        return jsonify({"error": "Name, email and message are required"}), 400

    lead = Lead(
        name=name, email=email, phone=data.get("phone", ""), company=data.get("company", ""),
        service=data.get("service", ""), budget=data.get("budget", ""), message=message,
        source_page=data.get("sourcePage", ""), status="NEW",
    )
    db.session.add(lead)
    db.session.commit()
    return jsonify({"success": True, "id": lead.id}), 201
