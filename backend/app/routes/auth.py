from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..extensions import db
from ..models import Admin

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/login")
def login():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    admin = Admin.query.filter_by(email=email).first()
    if not admin or not check_password_hash(admin.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(identity=str(admin.id))
    return jsonify({"token": token, "admin": admin.to_dict()})


@auth_bp.get("/me")
@jwt_required()
def me():
    admin_id = get_jwt_identity()
    admin = db.session.get(Admin, int(admin_id))
    if not admin:
        return jsonify({"error": "Not found"}), 404
    return jsonify(admin.to_dict())
