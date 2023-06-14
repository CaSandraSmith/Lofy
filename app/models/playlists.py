from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .tables import playlist_songs


class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    cover_image = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    songs = db.relationship('Song',
                             back_populates='playlists', 
                             secondary=playlist_songs)
    reviews = db.relationship('PlaylistReview',
                              back_populates='playlist',
                              cascade="all, delete-orphan")
    user = db.relationship('User', back_populates="playlists")