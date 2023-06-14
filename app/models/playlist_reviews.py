from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class PlaylistReviews(db.Model):
    __tablename__ = 'playlist_reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    review = db.Column(db.String(255), nullable=False)
    stars = db.Column(db.Integer, nullable=False)