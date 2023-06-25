from app.models import Song, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    song1 = Song (
        name="Consciousness",
        artist_id=1,
        album_id=1,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/1.+Harris+Heller+-+Consciousness.wav",
        length=110
    )
    song2 = Song (
        name="Path Less Traveled",
        artist_id=1,
        album_id=1,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/1.+Harris+Heller+-+Path+Less+Traveled.wav",
        length= 126
    )
    song3 = Song (
        name="Timeless",
        artist_id=1,
        album_id=1,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/1.+Harris+Heller+-+Timeless.wav",
        length= 115
    )
    song4 = Song (
        name="Beyond The Clouds",
        artist_id=1,
        album_id=1,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/10.+Harris+Heller+-+Beyond+The+Clouds.wav",
        length= 126
    )
    song5 = Song (
        name="Paralyze the Moment",
        artist_id=1,
        album_id=1,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/10.+Harris+Heller+-+Paralyze+the+Moment.wav",
        length= 110
    )
    song6 = Song (
        name="While We Sleep",
        artist_id=1,
        album_id=1,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/10.+Harris+Heller+-+While+We+Sleep.wav",
        length= 130
    )
    song7 = Song (
        name="Meteor Binge",
        artist_id=1,
        album_id=1,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/11.+Harris+Heller+-+Meteor+Binge.wav",
        length= 127
    )
    song8 = Song (
        name="Mood Swings",
        artist_id=1,
        album_id=1,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/11.+Harris+Heller+-+Mood+Swings.wav",
        length= 112
    )
    song9 = Song (
        name="Celestial Reverb",
        artist_id=1,
        album_id=1,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/12.+Harris+Heller+-+Celestial+Reverb.wav",
        length= 123
    )
    song10 = Song (
        name="Iridescent",
        artist_id=1,
        album_id=1,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/12.+Harris+Heller+-+Iridescent.wav",
        length= 109
    )

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.add(song6)
    db.session.add(song7)
    db.session.add(song8)
    db.session.add(song9)
    db.session.add(song10)
    db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))
        
    db.session.commit()