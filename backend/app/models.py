from datetime import datetime
from .extensions import db


def now():
    return datetime.utcnow()


class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=now)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "email": self.email}


class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(160), nullable=False)
    slug = db.Column(db.String(160), unique=True, nullable=False)
    short_desc = db.Column(db.Text, nullable=False)
    long_content_html = db.Column(db.Text, default="")
    icon_key = db.Column(db.String(60), default="code")
    hero_image = db.Column(db.String(500), default="")
    hero_image_alt = db.Column(db.String(300), default="")
    features = db.Column(db.JSON, default=list)
    tech_tags = db.Column(db.JSON, default=list)
    display_order = db.Column(db.Integer, default=0)
    status = db.Column(db.String(20), default="PUBLISHED")
    meta_title = db.Column(db.String(160), default="")
    meta_description = db.Column(db.String(300), default="")
    created_at = db.Column(db.DateTime, default=now)
    updated_at = db.Column(db.DateTime, default=now, onupdate=now)

    def to_dict(self):
        return {
            "id": self.id, "name": self.name, "slug": self.slug,
            "shortDesc": self.short_desc, "longContentHtml": self.long_content_html,
            "iconKey": self.icon_key, "heroImage": self.hero_image,
            "heroImageAlt": self.hero_image_alt or "",
            "features": self.features or [], "techTags": self.tech_tags or [],
            "displayOrder": self.display_order, "status": self.status,
            "metaTitle": self.meta_title, "metaDescription": self.meta_description,
        }


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(160), nullable=False)
    slug = db.Column(db.String(160), unique=True, nullable=False)
    category = db.Column(db.String(120), default="")
    description = db.Column(db.Text, nullable=False)
    long_content_html = db.Column(db.Text, default="")
    features = db.Column(db.JSON, default=list)
    price_label = db.Column(db.String(80), default="")
    demo_url = db.Column(db.String(255), default="")
    cover_image = db.Column(db.String(500), default="")
    cover_image_alt = db.Column(db.String(300), default="")
    display_order = db.Column(db.Integer, default=0)
    status = db.Column(db.String(20), default="PUBLISHED")
    meta_title = db.Column(db.String(160), default="")
    meta_description = db.Column(db.String(300), default="")

    def to_dict(self):
        return {
            "id": self.id, "name": self.name, "slug": self.slug, "category": self.category,
            "description": self.description, "longContentHtml": self.long_content_html or "",
            "features": self.features or [],
            "priceLabel": self.price_label, "demoUrl": self.demo_url,
            "coverImage": self.cover_image, "coverImageAlt": self.cover_image_alt or "",
            "displayOrder": self.display_order,
            "status": self.status, "metaTitle": self.meta_title, "metaDescription": self.meta_description,
        }


class PortfolioItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(160), nullable=False)
    slug = db.Column(db.String(160), unique=True, nullable=False)
    category = db.Column(db.String(120), default="")
    description = db.Column(db.Text, default="")
    portfolio_type = db.Column(db.String(30), default="REFERENCE_CONCEPT")
    client_name = db.Column(db.String(160), default="")
    client_approved = db.Column(db.Boolean, default=False)
    challenge = db.Column(db.Text, default="")
    solution = db.Column(db.Text, default="")
    results = db.Column(db.JSON, default=list)
    tech_used = db.Column(db.JSON, default=list)
    live_url = db.Column(db.String(255), default="")
    cover_image = db.Column(db.String(500), default="")
    cover_image_alt = db.Column(db.String(300), default="")
    is_featured = db.Column(db.Boolean, default=False)
    display_order = db.Column(db.Integer, default=0)
    status = db.Column(db.String(20), default="PUBLISHED")
    meta_title = db.Column(db.String(160), default="")
    meta_description = db.Column(db.String(300), default="")

    def to_dict(self):
        return {
            "id": self.id, "name": self.name, "slug": self.slug, "category": self.category,
            "description": self.description, "portfolioType": self.portfolio_type,
            "clientName": self.client_name, "clientApproved": self.client_approved,
            "challenge": self.challenge, "solution": self.solution,
            "results": self.results or [], "techUsed": self.tech_used or [],
            "liveUrl": self.live_url, "coverImage": self.cover_image,
            "coverImageAlt": self.cover_image_alt or "",
            "isFeatured": self.is_featured, "displayOrder": self.display_order,
            "status": self.status, "metaTitle": self.meta_title, "metaDescription": self.meta_description,
        }


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    slug = db.Column(db.String(200), unique=True, nullable=False)
    excerpt = db.Column(db.Text, default="")
    content_html = db.Column(db.Text, default="")
    cover_image = db.Column(db.String(500), default="")
    cover_image_alt = db.Column(db.String(300), default="")
    category = db.Column(db.String(120), default="General")
    tags = db.Column(db.JSON, default=list)
    author_name = db.Column(db.String(120), default="Neighshop Team")
    status = db.Column(db.String(20), default="DRAFT")
    is_featured = db.Column(db.Boolean, default=False)
    reading_time_min = db.Column(db.Integer, default=3)
    published_at = db.Column(db.DateTime, nullable=True)
    meta_title = db.Column(db.String(160), default="")
    meta_description = db.Column(db.String(300), default="")
    created_at = db.Column(db.DateTime, default=now)
    updated_at = db.Column(db.DateTime, default=now, onupdate=now)

    def to_dict(self):
        return {
            "id": self.id, "title": self.title, "slug": self.slug, "excerpt": self.excerpt,
            "contentHtml": self.content_html, "coverImage": self.cover_image,
            "coverImageAlt": self.cover_image_alt or "",
            "category": self.category, "tags": self.tags or [], "authorName": self.author_name,
            "status": self.status, "isFeatured": self.is_featured,
            "readingTimeMin": self.reading_time_min,
            "publishedAt": self.published_at.isoformat() if self.published_at else None,
            "metaTitle": self.meta_title, "metaDescription": self.meta_description,
            "createdAt": self.created_at.isoformat() if self.created_at else None,
        }


class Faq(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(60), default="general")
    display_order = db.Column(db.Integer, default=0)
    is_global = db.Column(db.Boolean, default=True)
    service_id = db.Column(db.Integer, db.ForeignKey("service.id"), nullable=True)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"), nullable=True)
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"), nullable=True)

    def to_dict(self):
        return {
            "id": self.id, "question": self.question, "answer": self.answer,
            "category": self.category, "displayOrder": self.display_order, "isGlobal": self.is_global,
            "serviceId": self.service_id, "productId": self.product_id, "postId": self.post_id,
        }


class TeamMember(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(160), default="")
    bio = db.Column(db.Text, default="")
    photo = db.Column(db.String(500), default="")
    expertise = db.Column(db.JSON, default=list)
    linkedin = db.Column(db.String(255), default="")
    display_order = db.Column(db.Integer, default=0)
    is_visible = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            "id": self.id, "name": self.name, "role": self.role, "bio": self.bio,
            "photo": self.photo, "expertise": self.expertise or [], "linkedin": self.linkedin,
            "displayOrder": self.display_order, "isVisible": self.is_visible,
        }


class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(120), nullable=False)
    slug = db.Column(db.String(120), unique=True, nullable=False)
    status = db.Column(db.String(30), default="Active")
    address = db.Column(db.String(255), default="")
    phone = db.Column(db.String(60), default="")
    content_html = db.Column(db.Text, default="")
    display_order = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            "id": self.id, "city": self.city, "slug": self.slug, "status": self.status,
            "address": self.address, "phone": self.phone, "contentHtml": self.content_html,
            "displayOrder": self.display_order,
        }


class Lead(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(160), nullable=False)
    phone = db.Column(db.String(40), default="")
    company = db.Column(db.String(160), default="")
    service = db.Column(db.String(160), default="")
    budget = db.Column(db.String(80), default="")
    message = db.Column(db.Text, default="")
    source_page = db.Column(db.String(160), default="")
    status = db.Column(db.String(20), default="NEW")
    notes = db.Column(db.Text, default="")
    created_at = db.Column(db.DateTime, default=now)

    def to_dict(self):
        return {
            "id": self.id, "name": self.name, "email": self.email, "phone": self.phone,
            "company": self.company, "service": self.service, "budget": self.budget,
            "message": self.message, "sourcePage": self.source_page, "status": self.status,
            "notes": self.notes, "createdAt": self.created_at.isoformat() if self.created_at else None,
        }


class Setting(db.Model):
    key = db.Column(db.String(60), primary_key=True)
    value = db.Column(db.JSON, default=dict)


class MediaAsset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    original_name = db.Column(db.String(255), default="")
    url = db.Column(db.String(500), nullable=False)
    alt = db.Column(db.String(300), default="")
    mime = db.Column(db.String(80), default="")
    size_bytes = db.Column(db.Integer, default=0)
    folder = db.Column(db.String(40), default="general")
    created_at = db.Column(db.DateTime, default=now)

    def to_dict(self):
        return {
            "id": self.id, "filename": self.filename, "originalName": self.original_name,
            "url": self.url, "alt": self.alt or "", "mime": self.mime,
            "sizeBytes": self.size_bytes or 0, "folder": self.folder or "general",
            "createdAt": self.created_at.isoformat() if self.created_at else None,
        }
