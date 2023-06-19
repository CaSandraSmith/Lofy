from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class PlaylistReview(db.Model):
    __tablename__ = 'playlist_reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    review = db.Column(db.String(255), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    playlist = db.relationship('Playlist', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')

    def to_dict(self):
        return {
            "id": self.id,
            "playlist_id": self.playlist_id,
            "review": self.review,
            "stars": self.stars,
            "user": {
                "id": self.user.id,
                "username": self.user.username
            }
        }

