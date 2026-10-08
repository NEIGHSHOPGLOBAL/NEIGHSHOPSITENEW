"""Add columns that create_all() will not alter on an existing SQLite database."""
from sqlalchemy import inspect, text

from .extensions import db

EXTRA_COLUMNS = {
    "service": {"hero_image_alt": "VARCHAR(300) DEFAULT ''"},
    "product": {
        "cover_image_alt": "VARCHAR(300) DEFAULT ''",
        "long_content_html": "TEXT DEFAULT ''",
    },
    "portfolio_item": {"cover_image_alt": "VARCHAR(300) DEFAULT ''"},
    "post": {"cover_image_alt": "VARCHAR(300) DEFAULT ''"},
    "faq": {
        "service_id": "INTEGER REFERENCES service(id)",
        "product_id": "INTEGER REFERENCES product(id)",
        "post_id": "INTEGER REFERENCES post(id)",
    },
}


def ensure_schema():
    inspector = inspect(db.engine)
    tables = set(inspector.get_table_names())
    with db.engine.begin() as conn:
        for table, columns in EXTRA_COLUMNS.items():
            if table not in tables:
                continue
            have = {col["name"] for col in inspector.get_columns(table)}
            for name, ddl in columns.items():
                if name not in have:
                    conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {name} {ddl}"))
