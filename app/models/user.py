from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .tables import user_saved_songs, user_saved_albums, user_saved_playlists


follows = db.Table(
    "follows",
    db.Column(
        "follower",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True
    ),
    db.Column(
        "following",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True
    )
)

if environment == "production":
    follows.schema = SCHEMA


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    reviews = db.relationship('PlaylistReview',
                              back_populates='user',
                              cascade='all, delete'
                              )
    playlists = db.relationship('Playlist', 
                                back_populates='user',
                                cascade='all, delete'
                                )
    saved_songs = db.relationship('Song', 
                                  back_populates='users_saved',
                                  secondary=user_saved_songs
                                  )
    saved_albums = db.relationship('Album', 
                                   back_populates='users_saved',
                                   secondary=user_saved_albums
                                   )
    saved_playlists = db.relationship('Playlist',
                                      back_populates="users_saved",
                                      secondary=user_saved_playlists
                                      )
    followers = db.relationship( 'User',
                                secondary="follows",
                                primaryjoin=follows.c.following == id,
                                secondaryjoin=follows.c.follower == id,
                                backref='following'
                                )
    
    
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def less_to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'profile_image': self.profile_image,
        }

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_image': self.profile_image,
            'followers': {user.id: user.less_to_dict() for user in self.followers},
            'following': {user.id: user.less_to_dict() for user in self.following}
        }

    def detailed_to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_image': self.profile_image,
            'followers': {user.id: user.to_dict() for user in self.followers},
            'following': {user.id: user.to_dict() for user in self.following},
            'playlists': {playlist.id: playlist.general_to_dict() for playlist in self.playlists}
        }
