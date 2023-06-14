from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class AlbumSong(db.Model):
    __tablename__ = 'album_songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    

