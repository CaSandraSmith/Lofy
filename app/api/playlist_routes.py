from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from .auth_routes import validation_errors_to_error_messages
from ..models import Playlist, User, db, Song
from ..forms import EditPlaylistForm

playlist_routes = Blueprint('playlist', __name__)


# remove a song from a playlist
@playlist_routes.route("/<int:playlist_id>/songs/<int:song_id>", methods=["DELETE"])
def remove_song_from_playlist(playlist_id, song_id):
    playlist = Playlist.query.get(playlist_id)
    song = Song.query.get(song_id)

    if not playlist:
        return {"errors": "Playlist couldn't be found"}   

    if playlist.owner_id != current_user.id:
        return {"errors": "You can't remove a song to a playlist that's not yours"}
    
    if not song:
        return {"errors": "Song couldn't be found"}
    
    if song not in playlist.songs:
        return {"errors": "You can't remove a song from a playlist that it's not on"}
    
    playlist.songs.remove(song)
    db.session.commit()
    return playlist.detailed_to_dict()


# add a song to a playlist
@playlist_routes.route("/<int:playlist_id>/songs/<int:song_id>", methods=["POST"])
@login_required
def add_song_to_playlist(playlist_id, song_id):
    playlist = Playlist.query.get(playlist_id)
    song = Song.query.get(song_id)

    if not playlist:
        return {"errors": "Playlist couldn't be found"}   

    if playlist.owner_id != current_user.id:
        return {"errors": "You can't add a song to a playlist that's not yours"}
    
    if not song:
        return {"errors": "Song couldn't be found"}
    
    if song in playlist.songs:
        return {"errors": "Song already on playlist"}
    
    playlist.songs.append(song)
    db.session.commit()
    return playlist.detailed_to_dict()


# delete a playlist
@playlist_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_playlist(id):
    playlist = Playlist.query.get(id)

    if not playlist:
        return {"errors": "Playlist couldn't be found"}   

    if playlist.owner_id != current_user.id:
        return {"errors": "You can't delete a playlist that's not yours"}
    
    db.session.delete(playlist)
    db.session.commit()
    return {"message": "Playlist successfully deleted"}


# edit the details of a playlist
@playlist_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_playlist(id):
    playlist = Playlist.query.get(id)
    
    if not playlist:
        return {"errors": "Playlist couldn't be found"}

    if playlist.owner_id != current_user.id:
        return {"errors": "You can't edit a playlist that's not yours"}
    
    form = EditPlaylistForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        playlist.name = data["name"]
        playlist.cover_image = data["cover_image"]
        playlist.description = data["description"]
        db.session.commit()

        return playlist.detailed_to_dict()
        

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# create new playlist
@playlist_routes.route("/new", methods=["POST"])
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
    return new_playlist.general_to_dict()


# get playlists of current user
@playlist_routes.route("/current")
@login_required
def playlists_of_current_user():
    user = User.query.get(current_user.id)

    if not user:
        return {"errors": "User couldn't be found"}
    
    user_playlists = {}
    for playlist in user.playlists:
        user_playlists[playlist.id] = playlist.detailed_to_dict()

    return user_playlists


# get playlists of user
@playlist_routes.route("/user/<int:id>")
def playlists_of_user(id):
    user = User.query.get(id)

    if not user:
        return {"errors":"User couldn't be found"}
    
    user_playlists = {}
    for playlist in user.playlists:
        user_playlists[playlist.id] = playlist.general_to_dict()
    
    return user_playlists

# get playlist by id
@playlist_routes.route("/<int:id>")
def one_playlist(id):
    playlist = Playlist.query.get(id)

    if not playlist:
        return {"errors": "Playlist not found"}
    else:
        return playlist.detailed_to_dict()

# get all playlists
@playlist_routes.route('/')
def all_playlists():
    all_playlists = Playlist.query.all()

    playlists = {}
    for playlist in all_playlists:
        playlists[playlist.id] = playlist.general_to_dict()
    return playlists

