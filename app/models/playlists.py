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
    cover_image = db.Column(db.String(255))
    description = db.Column(db.String(300))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    songs = db.relationship('Song',
                             back_populates='playlists', 
                             secondary=playlist_songs)
    reviews = db.relationship('PlaylistReview',
                              back_populates='playlist',
                              cascade="all, delete-orphan")
    user = db.relationship('User', back_populates="playlists")
    
    
    def general_to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'cover_image': self.cover_image,
            'description': self.description,
            'first_created': self.created_at,
            'last_updated': self.updated_at,
            'owner': {
                "id": self.user.id,
                "username": self.user.username,
                "profile_image": self.user.profile_image
            }
        }


    def detailed_to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'cover_image': self.cover_image,
            'description': self.description,
            'first_created': self.created_at,
            'last_updated': self.updated_at,
            'owner': {
                "username": self.user.username,
                "profile_image": self.user.profile_image
            },
            'songs': {song.id: song.to_dict() for song in self.songs}
        }