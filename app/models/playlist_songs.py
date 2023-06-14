from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class PlaylistSong(db.Model):
    __tablename__ = 'playlist_songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
