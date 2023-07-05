from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .tables import user_saved_albums

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
    users_saved = db.relationship('User', 
                                  back_populates='saved_albums',
                                  secondary=user_saved_albums
                                  )
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "artist": self.artist.name,
            "cover_image": self.cover_image,
            "songs": {song.id: song.to_dict() for song in self.songs}
        }
