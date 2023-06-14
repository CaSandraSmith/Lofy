from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from .auth_routes import validation_errors_to_error_messages
from ..models import Playlist, User, db

playlist_routes = Blueprint('playlist', __name__)

@playlist_routes.route("/new", methods={"POST"})
@login_required
def create_new_playlist():
    user = User.query.get(current_user.id)
    user_playlists_count = len(user.playlists)

    new_playlist = Playlist(
        owner_id=user.id,
        name=f"My playlist #{user_playlists_count + 1}",
        cover_image="google.com",
    )
    
    db.session.add(new_playlist)
    db.session.commit()
    return new_playlist.to_dict()


# get playlist by id
@playlist_routes.route("/<int:id>")
def one_playlist(id):
    playlist = Playlist.query.get(id)

    if not playlist:
        return {"errors": "Playlist not found"}
    else:
        return playlist.to_dict()

# get all playlists
@playlist_routes.route('/')
def all_playlists():
    all_playlists = Playlist.query.all()

    playlists = {}
    for playlist in all_playlists:
        playlists[playlist.id] = playlist.to_dict()
    return playlists

