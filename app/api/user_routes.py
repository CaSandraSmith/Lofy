from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/follow/<int:id>', methods=["POST"])
@login_required
def follow_user(id):
    """
    Gets the user that the current user wants to follow and adds them to their followers. Returns the user who was followed.
    """
    current_user = User.query.get(current_user.id)
    user = User.query.get(id)

    if not user:
        return {"errors": "User couldn't be found"}
    
    if user in current_user.following:
        return {"errors" : "You can't follow a user that you already follow"}
    
    current_user.following.append(user)

    return current_user.to_dict()