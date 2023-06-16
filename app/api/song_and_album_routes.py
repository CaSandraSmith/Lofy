from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from ..models import Song, Album

song_and_album_routes = Blueprint('song_and_album', __name__)

@song_and_album_routes.route("/")
def all_songs_and_routes():
    songs = Song.query.all()
    pass
