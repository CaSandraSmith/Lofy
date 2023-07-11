from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {user.id: user.less_to_dict() for user in users}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if user == current_user:
        return user.to_dict()
    else: return user.detailed_to_dict()

@user_routes.route('/find/<username>')
@login_required
def get_user_by_username(username):
    """
    Query for a user by username and returns that user in a dictionary
    """
    user = User.query.filter(User.username == username).one_or_none()

    if not user:
        return {"errors": "User couldn't be found"}, 404

    return user.detailed_to_dict()


@user_routes.route('/follow/<username>', methods=["POST"])
@login_required
def follow_user(username):
    """
    Gets the user that the current user wants to follow and adds them to their followers. Returns the user who was followed and the current user.
    """
    current = User.query.get(current_user.id)
    user = User.query.filter(User.username == username).one_or_none()

    if not user:
        return {"errors": "User couldn't be found"}, 404
    
    if user == current:
        return {"errors": "You can't follow yourself"}, 403
    
    if user in current.following:
        return {"errors" : "You can't follow a user that you already follow"}, 403
    
    current.following.append(user)
    db.session.commit()

    return [user.less_to_dict(), current.less_to_dict()]


@user_routes.route('/unfollow/<username>', methods=["DELETE"])
@login_required
def unfollow_user(username):
    """
    Gets the user that the current user wants to follow and removes them to their followers. Returns the user who was unfollowed.
    """
    current = User.query.get(current_user.id)
    user = User.query.filter(User.username == username).one_or_none()

    if not user:
        return {"errors": "User couldn't be found"}
    
    if user == current:
        return {"errors": "You can't unfollow yourself"}
    
    if user not in current.following:
        return {"errors" : "You can't unfollow a user that you don't follow"}
    
    current.following.remove(user)
    db.session.commit()

    return [user.less_to_dict(), current.less_to_dict()]