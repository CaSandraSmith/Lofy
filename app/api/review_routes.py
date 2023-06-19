from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from ..models import PlaylistReview, db
from ..forms import ReviewForm

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

@review_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_playlist_review(id):
    review = PlaylistReview.query.get(id)

    if not review:
        return {"errors": "Review couldn't be found"}
    
    form = ReviewForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        review.review = data["review"]
        review.stars = data["stars"]

        db.session.commit()
        return review.to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401