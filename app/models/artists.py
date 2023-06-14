from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Artist(db.Model):
    __tablename__ = 'artists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    songs = db.Relationship('Song', back_populates='artist', cascade="all, delete-orphan")
    albums = db.Relationship('Album', back_populates='artist', cascade="all, delete-orphan")