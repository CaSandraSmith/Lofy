from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from ..models import PlaylistReview

review_routes = Blueprint('reviews', __name__)

@review_routes.route("/playlist/<int:id>/reviews")
def get_reviews_of_playlist(id):
    pass
