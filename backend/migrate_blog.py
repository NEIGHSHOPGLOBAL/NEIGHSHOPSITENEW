"""One-off content migration: replace all blog posts with the 20 canonical posts from content.md Part C."""
from datetime import datetime, timedelta
import markdown

from app import create_app
from app.extensions import db
from app.models import Post, Faq
from migrate_blog_data import POSTS

app = create_app()

COVER_IMAGES = {
    "how-to-build-bike-taxi-app-like-rapido": ("/uploads/blog-rapido-clone-vs-scratch.png", "Phone with ride-booking map next to a notebook sketch"),
    "generative-engine-optimization-guide": ("/uploads/blog-seo-fundamentals.png", "Laptop showing an upward analytics graph"),
    "mvp-development-for-startups": ("/uploads/blog-why-startups-custom-software.png", "Two people planning a product roadmap on a whiteboard"),
}


def run():
    with app.app_context():
        # Wipe existing posts and their FAQs entirely — being replaced by the canonical 20.
        old_ids = [p.id for p in Post.query.all()]
        if old_ids:
            Faq.query.filter(Faq.post_id.in_(old_ids)).delete(synchronize_session=False)
        Post.query.delete()
        db.session.commit()

        n = len(POSTS)
        for i, data in enumerate(POSTS):
            html = markdown.markdown(data["body_md"].strip(), extensions=["tables"])
            cta_title, cta_body, cta_href = data["cta"]
            html += (
                f'\n<blockquote><p><strong>{cta_title}</strong> {cta_body}</p>'
                f'<p><a href="{cta_href}">Learn more →</a></p></blockquote>'
            )

            published_at = datetime.utcnow() - timedelta(days=(n - 1 - i) * 3)

            post = Post(
                title=data["title"],
                slug=data["slug"],
                excerpt=data["excerpt"],
                content_html=html,
                category=data["category"],
                tags=data["tags"],
                author_name=data["author"],
                status="PUBLISHED",
                is_featured=data.get("featured", False),
                reading_time_min=data["reading_time"],
                published_at=published_at,
                meta_title=data["meta_title"],
                meta_description=data["meta_description"],
            )

            cover = COVER_IMAGES.get(data["slug"])
            if cover:
                post.cover_image, post.cover_image_alt = cover

            db.session.add(post)
            db.session.flush()  # get post.id

            for j, (q, a) in enumerate(data["faqs"]):
                db.session.add(Faq(question=q, answer=a, display_order=j, is_global=False, post_id=post.id, category="post"))

        db.session.commit()
        print(f"Inserted {n} blog posts with FAQs and cover images for {len(COVER_IMAGES)} of them.")


if __name__ == "__main__":
    run()
