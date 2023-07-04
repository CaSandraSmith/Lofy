from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from ..models import Song, Album, User

song_and_album_routes = Blueprint('song_and_album', __name__)

@song_and_album_routes.route("/")
def all_songs_and_albums():
    albums = Album.query.all()

    all_albums = {}
    for album in albums:
        all_albums[album.id] = album.to_dict()
    
    return all_albums

@song_and_album_routes.route("/songs/current_user")
@login_required
def all_songs():
    user = User.query.get(current_user.id)

    all_songs = {}
    for song in user.saved_songs:
        all_songs[song.id] = song.to_dict()

    return all_songs

@song_and_album_routes.route("/songs")
def all_songs():
    songs = Song.query.all()

    all_songs = {}
    for song in songs:
        all_songs[song.id] = song.to_dict()
    return all_songs