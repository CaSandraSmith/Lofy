from flask.cli import AppGroup
from .users import seed_users, undo_users
from .artists import seed_artists, undo_artists
from .albums import seed_albums, undo_albums
from .songs import seed_songs, undo_songs
from .playlists import seed_playlists, undo_playlists
from .playlist_songs import seed_playlist_songs, undo_playlist_songs
from .playlist_reviews import seed_reviews, undo_reviews
from .user_saved_songs import seed_user_saved_songs, undo_user_saved_songs
from .user_saved_albums import seed_user_saved_albums, undo_user_saved_albums

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_user_saved_albums()
        undo_user_saved_songs()
        undo_reviews()
        undo_playlist_songs()
        undo_playlists()
        undo_songs()
        undo_albums()
        undo_artists()
        undo_users()
    seed_users()
    seed_artists()
    seed_albums()
    seed_songs()
    seed_playlists()
    seed_playlist_songs()
    seed_reviews()
    seed_user_saved_songs()
    seed_user_saved_albums()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_user_saved_albums()
    undo_user_saved_songs()
    undo_reviews()
    undo_playlist_songs()
    undo_playlists()
    undo_songs()
    undo_albums()
    undo_artists()
    undo_users()
    # Add other undo functions here