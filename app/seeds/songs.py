from app.models import Song, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    song1 = Song (
        name="song1",
        artist_id=1,
        album_id=1,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/lofi-study-112191.mp3",
        length=120 
    )
    song2 = Song (
        name="song2",
        artist_id=2,
        album_id=2,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/watr-fluid-10149.mp3",
        length=120  
    )
    song3 = Song (
        name="song3",
        artist_id=3,
        album_id=3,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/lofi-study-112191.mp3",
        length=120  
    )
    song4 = Song (
        name="song4",
        artist_id=4,
        album_id=4,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/watr-fluid-10149.mp3",
        length=120  
    )
    song5 = Song (
        name="song5",
        artist_id=5,
        album_id=5,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/lofi-study-112191.mp3",
        length=120  
    )
    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))
        
    db.session.commit()