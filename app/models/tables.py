from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


playlist_songs = db.Table(
    "playlist_songs",
    db.Column(
        'playlist_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('playlists.id')),
        primary_key=True
    ),
    db.Column(
        'song_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('songs.id')),
        primary_key=True
    )
)

if environment == "production":
    playlist_songs.schema = SCHEMA


user_saved_songs = db.Table(
    "user_saved_songs",
    db.Column(
        'user_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        primary_key=True
    ),
    db.Column(
        'song_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('songs.id')),
        primary_key=True
    )
)

if environment == "production":
    user_saved_songs.schema = SCHEMA


user_saved_albums = db.Table(
    "user_saved_albums",
    db.Column(
        'user_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        primary_key=True
    ),
    db.Column(
        'album_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('albums.id')),
        primary_key=True
    )
)

if environment == "production":
    user_saved_albums.schema = SCHEMA


user_saved_playlists = db.Table(
    "user_saved_playlists",
    db.Column(
        'user_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        primary_key=True
    ),
    db.Column(
        'playlist_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('playlists.id')),
        primary_key=True
    )
)

if environment == "production":
    user_saved_playlists.schema = SCHEMA
