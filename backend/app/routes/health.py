import os
import time
from datetime import datetime, timezone

from flask import Blueprint, current_app, jsonify
from sqlalchemy import text

from ..extensions import db

health_bp = Blueprint("health", __name__)

_START_TIME = time.time()


def _check_database():
    try:
        db.session.execute(text("SELECT 1"))
        return True, "ok"
    except Exception as exc:  # noqa: BLE001 - surface any DB error in the health response
        return False, str(exc)


def _check_uploads_dir():
    path = current_app.config.get("UPLOAD_FOLDER", "")
    if path and os.path.isdir(path) and os.access(path, os.W_OK):
        return True, "ok"
    return False, "upload folder missing or not writable"


@health_bp.get("/health")
def health():
    """Liveness + readiness check. Returns 200 when healthy, 503 otherwise."""
    db_ok, db_detail = _check_database()
    uploads_ok, uploads_detail = _check_uploads_dir()
    healthy = db_ok and uploads_ok

    body = {
        "status": "ok" if healthy else "error",
        "service": "neighshop-backend",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "uptimeSeconds": round(time.time() - _START_TIME, 1),
        "checks": {
            "database": {"status": "ok" if db_ok else "error", "detail": db_detail},
            "uploads": {"status": "ok" if uploads_ok else "error", "detail": uploads_detail},
        },
    }
    return jsonify(body), (200 if healthy else 503)


@health_bp.get("/health/live")
def live():
    """Bare liveness probe — process is up, no dependency checks. Always fast."""
    return jsonify({"status": "ok"}), 200
