from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .tables import playlist_songs


class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('artists.id')), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    artist = db.relationship('Artist', back_populates="songs")
    album = db.relationship('Album', back_populates='songs')
    playlists = db.relationship('Playlist', 
                                back_populates='songs',secondary=playlist_songs,)

