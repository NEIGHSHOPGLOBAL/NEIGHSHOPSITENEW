from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from slugify import slugify
from werkzeug.utils import secure_filename
from flask import current_app
import os
import re
import uuid

from ..extensions import db
from ..models import (
    Service, Product, PortfolioItem, Post, Faq, TeamMember, Location, Lead, Setting, MediaAsset
)
from ..seed import DEFAULT_TRACKING

admin_bp = Blueprint("admin", __name__)


def apply_fields(obj, data, field_map):
    """field_map: {json_key: attr_name}. Only keys present in data are applied."""
    for json_key, attr_name in field_map.items():
        if json_key in data:
            setattr(obj, attr_name, data[json_key])


def unique_slug(model, base, current_id=None):
    base = slugify(base) or "item"
    slug = base
    i = 2
    while True:
        q = model.query.filter_by(slug=slug)
        if current_id is not None:
            q = q.filter(model.id != current_id)
        if not q.first():
            return slug
        slug = f"{base}-{i}"
        i += 1


# ---------------- Dashboard ----------------

@admin_bp.get("/dashboard")
@jwt_required()
def dashboard():
    return jsonify({
        "posts": Post.query.count(),
        "publishedPosts": Post.query.filter_by(status="PUBLISHED").count(),
        "draftPosts": Post.query.filter_by(status="DRAFT").count(),
        "services": Service.query.count(),
        "products": Product.query.count(),
        "portfolio": PortfolioItem.query.count(),
        "leadsNew": Lead.query.filter_by(status="NEW").count(),
        "leadsTotal": Lead.query.count(),
        "team": TeamMember.query.count(),
        "media": MediaAsset.query.count(),
    })


# ---------------- Services ----------------
SERVICE_FIELDS = {
    "name": "name", "shortDesc": "short_desc", "longContentHtml": "long_content_html",
    "iconKey": "icon_key", "heroImage": "hero_image", "heroImageAlt": "hero_image_alt",
    "features": "features",
    "techTags": "tech_tags", "displayOrder": "display_order", "status": "status",
    "metaTitle": "meta_title", "metaDescription": "meta_description",
}


@admin_bp.get("/services")
@jwt_required()
def list_services():
    items = Service.query.order_by(Service.display_order).all()
    return jsonify([s.to_dict() for s in items])


@admin_bp.post("/services")
@jwt_required()
def create_service():
    data = request.get_json() or {}
    s = Service(name=data.get("name", "Untitled"), short_desc=data.get("shortDesc", ""))
    apply_fields(s, data, SERVICE_FIELDS)
    s.slug = unique_slug(Service, data.get("slug") or s.name)
    db.session.add(s)
    db.session.commit()
    return jsonify(s.to_dict()), 201


@admin_bp.patch("/services/<int:item_id>")
@jwt_required()
def update_service(item_id):
    s = db.session.get(Service, item_id)
    if not s:
        return jsonify({"error": "Not found"}), 404
    data = request.get_json() or {}
    apply_fields(s, data, SERVICE_FIELDS)
    if "slug" in data or "name" in data:
        s.slug = unique_slug(Service, data.get("slug") or s.name, current_id=s.id)
    db.session.commit()
    return jsonify(s.to_dict())


@admin_bp.delete("/services/<int:item_id>")
@jwt_required()
def delete_service(item_id):
    s = db.session.get(Service, item_id)
    if not s:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(s)
    db.session.commit()
    return jsonify({"success": True})


# ---------------- Products ----------------
PRODUCT_FIELDS = {
    "name": "name", "category": "category", "description": "description",
    "features": "features", "priceLabel": "price_label", "demoUrl": "demo_url",
    "coverImage": "cover_image", "coverImageAlt": "cover_image_alt",
    "displayOrder": "display_order", "status": "status",
    "metaTitle": "meta_title", "metaDescription": "meta_description",
}


@admin_bp.get("/products")
@jwt_required()
def list_products():
    items = Product.query.order_by(Product.display_order).all()
    return jsonify([p.to_dict() for p in items])


@admin_bp.post("/products")
@jwt_required()
def create_product():
    data = request.get_json() or {}
    p = Product(name=data.get("name", "Untitled"), description=data.get("description", ""))
    apply_fields(p, data, PRODUCT_FIELDS)
    p.slug = unique_slug(Product, data.get("slug") or p.name)
    db.session.add(p)
    db.session.commit()
    return jsonify(p.to_dict()), 201


@admin_bp.patch("/products/<int:item_id>")
@jwt_required()
def update_product(item_id):
    p = db.session.get(Product, item_id)
    if not p:
        return jsonify({"error": "Not found"}), 404
    data = request.get_json() or {}
    apply_fields(p, data, PRODUCT_FIELDS)
    if "slug" in data or "name" in data:
        p.slug = unique_slug(Product, data.get("slug") or p.name, current_id=p.id)
    db.session.commit()
    return jsonify(p.to_dict())


@admin_bp.delete("/products/<int:item_id>")
@jwt_required()
def delete_product(item_id):
    p = db.session.get(Product, item_id)
    if not p:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(p)
    db.session.commit()
    return jsonify({"success": True})


# ---------------- Portfolio ----------------
PORTFOLIO_FIELDS = {
    "name": "name", "category": "category", "description": "description",
    "portfolioType": "portfolio_type", "clientName": "client_name",
    "clientApproved": "client_approved", "challenge": "challenge", "solution": "solution",
    "results": "results", "techUsed": "tech_used", "liveUrl": "live_url",
    "coverImage": "cover_image", "coverImageAlt": "cover_image_alt",
    "isFeatured": "is_featured", "displayOrder": "display_order",
    "status": "status", "metaTitle": "meta_title", "metaDescription": "meta_description",
}


@admin_bp.get("/portfolio")
@jwt_required()
def list_portfolio():
    items = PortfolioItem.query.order_by(PortfolioItem.display_order).all()
    return jsonify([p.to_dict() for p in items])


@admin_bp.post("/portfolio")
@jwt_required()
def create_portfolio():
    data = request.get_json() or {}
    p = PortfolioItem(name=data.get("name", "Untitled"), description=data.get("description", ""))
    apply_fields(p, data, PORTFOLIO_FIELDS)
    p.slug = unique_slug(PortfolioItem, data.get("slug") or p.name)
    db.session.add(p)
    db.session.commit()
    return jsonify(p.to_dict()), 201


@admin_bp.patch("/portfolio/<int:item_id>")
@jwt_required()
def update_portfolio(item_id):
    p = db.session.get(PortfolioItem, item_id)
    if not p:
        return jsonify({"error": "Not found"}), 404
    data = request.get_json() or {}
    apply_fields(p, data, PORTFOLIO_FIELDS)
    if "slug" in data or "name" in data:
        p.slug = unique_slug(PortfolioItem, data.get("slug") or p.name, current_id=p.id)
    db.session.commit()
    return jsonify(p.to_dict())


@admin_bp.delete("/portfolio/<int:item_id>")
@jwt_required()
def delete_portfolio(item_id):
    p = db.session.get(PortfolioItem, item_id)
    if not p:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(p)
    db.session.commit()
    return jsonify({"success": True})


# ---------------- Blog Posts ----------------
POST_FIELDS = {
    "title": "title", "excerpt": "excerpt", "contentHtml": "content_html",
    "coverImage": "cover_image", "coverImageAlt": "cover_image_alt",
    "category": "category", "tags": "tags",
    "authorName": "author_name", "status": "status", "isFeatured": "is_featured",
    "readingTimeMin": "reading_time_min", "metaTitle": "meta_title",
    "metaDescription": "meta_description",
}


@admin_bp.get("/posts")
@jwt_required()
def list_posts_admin():
    items = Post.query.order_by(Post.created_at.desc()).all()
    return jsonify([p.to_dict() for p in items])


@admin_bp.get("/posts/<int:item_id>")
@jwt_required()
def get_post_admin(item_id):
    p = db.session.get(Post, item_id)
    if not p:
        return jsonify({"error": "Not found"}), 404
    return jsonify(p.to_dict())


@admin_bp.post("/posts")
@jwt_required()
def create_post():
    data = request.get_json() or {}
    p = Post(title=data.get("title", "Untitled post"))
    apply_fields(p, data, POST_FIELDS)
    p.slug = unique_slug(Post, data.get("slug") or p.title)
    if p.status == "PUBLISHED" and not p.published_at:
        p.published_at = datetime.utcnow()
    db.session.add(p)
    db.session.commit()
    return jsonify(p.to_dict()), 201


@admin_bp.patch("/posts/<int:item_id>")
@jwt_required()
def update_post(item_id):
    p = db.session.get(Post, item_id)
    if not p:
        return jsonify({"error": "Not found"}), 404
    data = request.get_json() or {}
    was_published = p.status == "PUBLISHED"
    apply_fields(p, data, POST_FIELDS)
    if "slug" in data or "title" in data:
        p.slug = unique_slug(Post, data.get("slug") or p.title, current_id=p.id)
    if p.status == "PUBLISHED" and not was_published and not p.published_at:
        p.published_at = datetime.utcnow()
    db.session.commit()
    return jsonify(p.to_dict())


@admin_bp.delete("/posts/<int:item_id>")
@jwt_required()
def delete_post(item_id):
    p = db.session.get(Post, item_id)
    if not p:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(p)
    db.session.commit()
    return jsonify({"success": True})


# ---------------- FAQs ----------------
FAQ_FIELDS = {
    "question": "question", "answer": "answer", "category": "category",
    "displayOrder": "display_order", "isGlobal": "is_global",
}


@admin_bp.get("/faqs")
@jwt_required()
def list_faqs_admin():
    items = Faq.query.order_by(Faq.display_order).all()
    return jsonify([f.to_dict() for f in items])


@admin_bp.post("/faqs")
@jwt_required()
def create_faq():
    data = request.get_json() or {}
    f = Faq(question=data.get("question", ""), answer=data.get("answer", ""))
    apply_fields(f, data, FAQ_FIELDS)
    db.session.add(f)
    db.session.commit()
    return jsonify(f.to_dict()), 201


@admin_bp.patch("/faqs/<int:item_id>")
@jwt_required()
def update_faq(item_id):
    f = db.session.get(Faq, item_id)
    if not f:
        return jsonify({"error": "Not found"}), 404
    apply_fields(f, request.get_json() or {}, FAQ_FIELDS)
    db.session.commit()
    return jsonify(f.to_dict())


@admin_bp.delete("/faqs/<int:item_id>")
@jwt_required()
def delete_faq(item_id):
    f = db.session.get(Faq, item_id)
    if not f:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(f)
    db.session.commit()
    return jsonify({"success": True})


# ---------------- Team ----------------
TEAM_FIELDS = {
    "name": "name", "role": "role", "bio": "bio", "photo": "photo",
    "expertise": "expertise", "linkedin": "linkedin", "displayOrder": "display_order",
    "isVisible": "is_visible",
}


@admin_bp.get("/team")
@jwt_required()
def list_team_admin():
    items = TeamMember.query.order_by(TeamMember.display_order).all()
    return jsonify([t.to_dict() for t in items])


@admin_bp.post("/team")
@jwt_required()
def create_team():
    data = request.get_json() or {}
    t = TeamMember(name=data.get("name", "Unnamed"))
    apply_fields(t, data, TEAM_FIELDS)
    db.session.add(t)
    db.session.commit()
    return jsonify(t.to_dict()), 201


@admin_bp.patch("/team/<int:item_id>")
@jwt_required()
def update_team(item_id):
    t = db.session.get(TeamMember, item_id)
    if not t:
        return jsonify({"error": "Not found"}), 404
    apply_fields(t, request.get_json() or {}, TEAM_FIELDS)
    db.session.commit()
    return jsonify(t.to_dict())


@admin_bp.delete("/team/<int:item_id>")
@jwt_required()
def delete_team(item_id):
    t = db.session.get(TeamMember, item_id)
    if not t:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(t)
    db.session.commit()
    return jsonify({"success": True})


# ---------------- Locations ----------------
LOCATION_FIELDS = {
    "city": "city", "status": "status", "address": "address", "phone": "phone",
    "contentHtml": "content_html", "displayOrder": "display_order",
}


@admin_bp.get("/locations")
@jwt_required()
def list_locations_admin():
    items = Location.query.order_by(Location.display_order).all()
    return jsonify([l.to_dict() for l in items])


@admin_bp.post("/locations")
@jwt_required()
def create_location():
    data = request.get_json() or {}
    l = Location(city=data.get("city", "Unnamed"))
    apply_fields(l, data, LOCATION_FIELDS)
    l.slug = unique_slug(Location, data.get("slug") or l.city)
    db.session.add(l)
    db.session.commit()
    return jsonify(l.to_dict()), 201


@admin_bp.patch("/locations/<int:item_id>")
@jwt_required()
def update_location(item_id):
    l = db.session.get(Location, item_id)
    if not l:
        return jsonify({"error": "Not found"}), 404
    data = request.get_json() or {}
    apply_fields(l, data, LOCATION_FIELDS)
    if "slug" in data or "city" in data:
        l.slug = unique_slug(Location, data.get("slug") or l.city, current_id=l.id)
    db.session.commit()
    return jsonify(l.to_dict())


@admin_bp.delete("/locations/<int:item_id>")
@jwt_required()
def delete_location(item_id):
    l = db.session.get(Location, item_id)
    if not l:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(l)
    db.session.commit()
    return jsonify({"success": True})


# ---------------- Leads ----------------

@admin_bp.get("/leads")
@jwt_required()
def list_leads():
    items = Lead.query.order_by(Lead.created_at.desc()).all()
    return jsonify([l.to_dict() for l in items])


@admin_bp.patch("/leads/<int:item_id>")
@jwt_required()
def update_lead(item_id):
    l = db.session.get(Lead, item_id)
    if not l:
        return jsonify({"error": "Not found"}), 404
    data = request.get_json() or {}
    if "status" in data:
        l.status = data["status"]
    if "notes" in data:
        l.notes = data["notes"]
    db.session.commit()
    return jsonify(l.to_dict())


@admin_bp.delete("/leads/<int:item_id>")
@jwt_required()
def delete_lead(item_id):
    l = db.session.get(Lead, item_id)
    if not l:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(l)
    db.session.commit()
    return jsonify({"success": True})


# ---------------- Settings ----------------

@admin_bp.get("/settings")
@jwt_required()
def get_settings_admin():
    rows = Setting.query.all()
    return jsonify({row.key: row.value for row in rows})


TRACKING_PATTERNS = {
    "gtmId": r"^GTM-[A-Z0-9]+$",
    "ga4Id": r"^G-[A-Z0-9]+$",
    "googleAdsId": r"^AW-\d+$",
    "googleAdsLabel": r"^[A-Za-z0-9_-]{1,80}$",
    "metaPixelId": r"^\d{5,20}$",
    "linkedinPartnerId": r"^\d{4,12}$",
    "tiktokPixelId": r"^[A-Z0-9]{8,32}$",
    "twitterPixelId": r"^[A-Za-z0-9]{4,20}$",
    "pinterestTagId": r"^\d{5,20}$",
    "clarityId": r"^[A-Za-z0-9]{6,20}$",
    "hotjarId": r"^\d{4,12}$",
    "searchConsoleVerification": r"^[A-Za-z0-9_-]{8,128}$",
    "bingVerification": r"^[A-Za-z0-9]{8,128}$",
    "facebookDomainVerification": r"^[A-Za-z0-9]{8,128}$",
}
MEDIA_FOLDERS = {"general", "blog", "services", "products", "portfolio", "team"}
ALLOWED_EXT = {"png", "jpg", "jpeg", "webp", "gif", "svg"}


def _clean_tracking(value):
    if not isinstance(value, dict):
        return None, "Tracking settings must be an object"
    cleaned = dict(DEFAULT_TRACKING)
    cleaned.update(value)
    cleaned["enabled"] = bool(cleaned.get("enabled", True))
    for key, pattern in TRACKING_PATTERNS.items():
        raw = cleaned.get(key) or ""
        if not isinstance(raw, str):
            return None, f"{key} must be text"
        raw = raw.strip()
        if raw and not re.fullmatch(pattern, raw):
            return None, f"{key} is not in the expected format"
        cleaned[key] = raw
    for key in ("customHeadHtml", "customBodyHtml"):
        raw = cleaned.get(key) or ""
        if not isinstance(raw, str):
            return None, f"{key} must be text"
        if len(raw) > 20000:
            return None, f"{key} is too long"
        cleaned[key] = raw
    return {k: cleaned.get(k, DEFAULT_TRACKING[k]) for k in DEFAULT_TRACKING}, None


@admin_bp.put("/settings/<key>")
@jwt_required()
def update_setting(key):
    value = request.get_json()
    if key == "tracking":
        value, error = _clean_tracking(value)
        if error:
            return jsonify({"error": error}), 400
    row = db.session.get(Setting, key)
    if not row:
        row = Setting(key=key, value=value)
        db.session.add(row)
    else:
        row.value = value
    db.session.commit()
    return jsonify({key: row.value})


# ---------------- Media library ----------------

def _usage_count(url):
    return (
        Post.query.filter_by(cover_image=url).count()
        + Service.query.filter_by(hero_image=url).count()
        + Product.query.filter_by(cover_image=url).count()
        + PortfolioItem.query.filter_by(cover_image=url).count()
        + TeamMember.query.filter_by(photo=url).count()
    )


def _media_dict(asset):
    data = asset.to_dict()
    data["usageCount"] = _usage_count(asset.url)
    return data


@admin_bp.get("/media")
@jwt_required()
def list_media():
    q = MediaAsset.query
    folder = request.args.get("folder")
    if folder and folder != "all":
        q = q.filter_by(folder=folder)
    items = q.order_by(MediaAsset.created_at.desc()).all()
    return jsonify([_media_dict(item) for item in items])


@admin_bp.post("/media/upload")
@jwt_required()
def upload_media():
    file = request.files.get("file")
    if not file or not file.filename:
        return jsonify({"error": "No file provided"}), 400
    ext = file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else ""
    if ext not in ALLOWED_EXT:
        return jsonify({"error": "Use PNG, JPG, WEBP, GIF or SVG"}), 400
    folder = (request.form.get("folder") or "general").strip().lower()
    if folder not in MEDIA_FOLDERS:
        folder = "general"
    alt = (request.form.get("alt") or "").strip()[:300]
    filename = f"{uuid.uuid4().hex}.{ext}"
    safe_name = secure_filename(filename)
    path = os.path.join(current_app.config["UPLOAD_FOLDER"], safe_name)
    file.save(path)
    size = os.path.getsize(path)
    asset = MediaAsset(
        filename=safe_name,
        original_name=secure_filename(file.filename)[:255],
        url=f"/uploads/{safe_name}",
        alt=alt,
        mime=file.mimetype or "",
        size_bytes=size,
        folder=folder,
    )
    db.session.add(asset)
    db.session.commit()
    return jsonify(_media_dict(asset)), 201


@admin_bp.patch("/media/<int:item_id>")
@jwt_required()
def update_media(item_id):
    asset = db.session.get(MediaAsset, item_id)
    if not asset:
        return jsonify({"error": "Not found"}), 404
    data = request.get_json() or {}
    if "alt" in data:
        asset.alt = str(data.get("alt") or "")[:300]
    if "folder" in data and data["folder"] in MEDIA_FOLDERS:
        asset.folder = data["folder"]
    db.session.commit()
    return jsonify(_media_dict(asset))


@admin_bp.delete("/media/<int:item_id>")
@jwt_required()
def delete_media(item_id):
    asset = db.session.get(MediaAsset, item_id)
    if not asset:
        return jsonify({"error": "Not found"}), 404
    path = os.path.join(current_app.config["UPLOAD_FOLDER"], asset.filename)
    if os.path.isfile(path):
        os.remove(path)
    db.session.delete(asset)
    db.session.commit()
    return jsonify({"success": True})
