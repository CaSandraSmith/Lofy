from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from ..models import PlaylistReview, db

review_routes = Blueprint('reviews', __name__)

@review_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def get_reviews_of_playlist(id):
    review = PlaylistReview.query.get(id)

    if not review:
        return {"errors": "Review couldn't be found"}
    
    if review.user.id != current_user.id:
        return {"errors": "You can't delete a review that doesn't belong to you"}
    
    db.session.delete(review)
    db.session.commit()
    
    return {"confirmation" : "Review successfully deleted"}
