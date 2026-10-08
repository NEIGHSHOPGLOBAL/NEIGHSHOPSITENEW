import os
from flask import Flask, send_from_directory
from config import Config
from .extensions import db, jwt, cors


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db_uri = app.config["SQLALCHEMY_DATABASE_URI"]
    if db_uri.startswith("sqlite:///"):
        os.makedirs(os.path.dirname(db_uri.replace("sqlite:///", "")), exist_ok=True)
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

    from .routes.auth import auth_bp
    from .routes.public import public_bp
    from .routes.admin import admin_bp
    from .routes.health import health_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(public_bp, url_prefix="/api/public")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")
    app.register_blueprint(health_bp, url_prefix="/api")

    @app.route("/uploads/<path:filename>")
    def uploaded_file(filename):
        return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

    with app.app_context():
        db.create_all()
        from .schema import ensure_schema
        from .seed import ensure_defaults, run_seed
        ensure_schema()
        run_seed()
        ensure_defaults()

    return app
