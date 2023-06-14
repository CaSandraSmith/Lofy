from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    cover_image = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(300), nullable=False)