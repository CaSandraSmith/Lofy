from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from .auth_routes import validation_errors_to_error_messages
from ..models import Playlist

playlist_routes = Blueprint('playlist', __name__)

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

