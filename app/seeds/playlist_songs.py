from app.models import Playlist, Song, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlist_songs():
    playlist1 = Playlist.query.get(1)
    playlist2 = Playlist.query.get(2)
    playlist3 = Playlist.query.get(3)

    song1 = Song.query.get(1)
    song2 = Song.query.get(2)
    song3 = Song.query.get(3)
    song4 = Song.query.get(4)
    song5 = Song.query.get(5)
    
    playlist1.songs.append(song1)
    playlist1.songs.append(song4)
    playlist1.songs.append(song5)

    playlist2.songs.append(song1)
    playlist2.songs.append(song2)
    playlist2.songs.append(song3)
    playlist2.songs.append(song4)

    playlist3.songs.append(song5)
    playlist3.songs.append(song2)

    db.session.commit()


def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))
        
    db.session.commit()