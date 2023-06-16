from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('artists.id')), nullable=False)
    cover_image = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    artist = db.relationship('Artist', back_populates='albums')
    songs = db.relationship('Song',
                             back_populates='album',
                             cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            "name": self.name,
            "artist": self.artist.name,
            "songs": {song.id: song.general_to_dict() for song in self.songs}
        }
