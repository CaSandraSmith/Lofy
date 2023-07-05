from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from ..models import Song, Album, User, db

song_and_album_routes = Blueprint('song_and_album', __name__)

# get all albums
@song_and_album_routes.route("/")
def all_songs_and_albums():
    albums = Album.query.all()

    all_albums = {}
    for album in albums:
        all_albums[album.id] = album.to_dict()
    
    return all_albums

# delete a users saved song
@song_and_album_routes.route("/songs/current_user/<int:id>", methods=["DELETE"])
@login_required
def remove_saved_song(id):
    user = User.query.get(current_user.id)
    song = Song.query.get(id)

    if not song:
        return {"errors": "You can't remove a song from your saved songs that doesn't exist"}
    
    if song not in user.saved_songs:
        return {"errors": "You can't remove a song that you haven't saved"}
    
    user.saved_songs.remove(song)
    db.session.commit()

    all_songs = {}
    for song in user.saved_songs:
        all_songs[song.id] = song.to_dict()

    return all_songs

# add a song to a users saved song
@song_and_album_routes.route("/songs/current_user/<int:id>", methods=["POST"])
@login_required
def add_saved_song(id):
    user = User.query.get(current_user.id)
    song = Song.query.get(id)

    if not song:
        return {"errors": "You can't add a song to your liked songs that doesn't exist"}
    
    if song in user.saved_songs:
        return {"errors": "You can't like a song that you've already liked"}
    
    user.saved_songs.append(song)
    db.session.commit()

    all_songs = {}
    for song in user.saved_songs:
        all_songs[song.id] = song.to_dict()

    return all_songs

# get all saved songs of current user
@song_and_album_routes.route("/songs/current_user")
@login_required
def user_saved_songs():
    user = User.query.get(current_user.id)

    all_songs = {}
    for song in user.saved_songs:
        all_songs[song.id] = song.to_dict()

    return all_songs

# get all songs
@song_and_album_routes.route("/songs")
def all_songs():
    songs = Song.query.all()

    all_songs = {}
    for song in songs:
        all_songs[song.id] = song.to_dict()
    return all_songs