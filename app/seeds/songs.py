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
    song11 = Song (
        name="Of Course I Still Love You",
        artist_id=1,
        album_id=2,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/12.+Harris+Heller+-+Of+Course+I+Still+Love+You.wav",
        length=118
    )
    song12 = Song (
        name="Deafening Silence",
        artist_id=1,
        album_id=2,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/13.+Harris+Heller+-+Deafening+Silence.wav",
        length=156
    )
    song13 = Song (
        name="Enjoy the Little Things",
        artist_id=1,
        album_id=2,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/13.+Harris+Heller+-+Enjoy+the+Little+Things.wav",
        length=113
    )
    song14 = Song (
        name="The Lights In The Sky Are Our Guides",
        artist_id=1,
        album_id=2,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/13.+Harris+Heller+-+The+Lights+In+The+Sky+Are+Our+Guides.wav",
        length=117
    )
    song15 = Song (
        name="The Color of Happiness",
        artist_id=1,
        album_id=2,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/14.+Harris+Heller+-+The+Color+of+Happiness.wav",
        length=120
    )
    song16 = Song (
        name="Trapped in Memories",
        artist_id=1,
        album_id=2,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/14.+Harris+Heller+-+Trapped+in+Memories.wav",
        length=117
    )
    song17 = Song (
        name="Vertigo",
        artist_id=1,
        album_id=2,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/14.+Harris+Heller+-+Vertigo.wav",
        length=125
    )
    song18 = Song (
        name="Deja Vu",
        artist_id=1,
        album_id=2,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/15.+Harris+Heller+-+Deja+Vu.wav",
        length=121
    )
    song19 = Song (
        name="Is Anybody Out There",
        artist_id=1,
        album_id=3,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/15.+Harris+Heller+-+Is+Anybody+Out+There.wav",
        length=129
    )
    song20 = Song (
        name="Stargaze",
        artist_id=1,
        album_id=3,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/15.+Harris+Heller+-+Stargaze.wav",
        length=138
    )
    song21 = Song (
        name="Another World",
        artist_id=1,
        album_id=3,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/16.+Harris+Heller+-+Another+World.wav",
        length=109
    )
    song22 = Song (
        name="Arriving at Nowhere",
        artist_id=1,
        album_id=3,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/16.+Harris+Heller+-+Arriving+at+Nowhere.wav",
        length=120
    )
    song23 = Song (
        name="The Phantom Follows",
        artist_id=1,
        album_id=3,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/16.+Harris+Heller+-+The+Phantom+Follows.wav",
        length=123
    )
    song24 = Song (
        name="Huntress",
        artist_id=1,
        album_id=3,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/17.+Harris+Heller+-+Huntress.wav",
        length=123
    )
    song25 = Song (
        name="The Depths Are Calling Me",
        artist_id=1,
        album_id=3,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/17.+Harris+Heller+-+The+Depths+Are+Calling+Me.wav",
        length=144
    )
    song26 = Song (
        name="Tranquility",
        artist_id=1,
        album_id=3,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/17.+Harris+Heller+-+Tranquility.wav",
        length=116
    )
    song27 = Song (
        name="Backtracking",
        artist_id=1,
        album_id=3,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/18.+Harris+Heller+-+Backtracking.wav",
        length=111
    )
    song28 = Song (
        name="Lean of Phobia",
        artist_id=1,
        album_id=3,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/18.+Harris+Heller+-+Lean+of+Phobia.wav",
        length=103
    )
    song29 = Song (
        name="Carousel",
        artist_id=1,
        album_id=3,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/19.+Harris+Heller+-+Carousel.wav",
        length=120
    )
    song30 = Song (
        name="Humble",
        artist_id=1,
        album_id=3,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/19.+Harris+Heller+-+Humble.wav",
        length=123
    )
    song31 = Song (
        name="Singularity",
        artist_id=2,
        album_id=4,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/19.+Harris+Heller+-+Singularity.wav",
        length=125
    )
    song32 = Song (
        name="Aurora Sonata",
        artist_id=2,
        album_id=4,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/2.+Harris+Heller+-+Aurora+Sonata.wav",
        length=113
    )
    song33 = Song (
        name="Business As Usual",
        artist_id=2,
        album_id=4,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/2.+Harris+Heller+-+Business+As+Usual.wav",
        length=115
    )
    song34 = Song (
        name="Radiant Vibes",
        artist_id=2,
        album_id=4,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/2.+Harris+Heller+-+Radiant+Vibes.wav",
        length=120
    )
    song35 = Song (
        name="Euphoria",
        artist_id=2,
        album_id=4,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/20.+Harris+Heller+-+Euphoria.wav",
        length=125
    )
    song36 = Song (
        name="Moons of Neptune",
        artist_id=2,
        album_id=4,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/20.+Harris+Heller+-+Moons+of+Neptune.wav",
        length=107
    )
    song37 = Song (
        name="Up in Love",
        artist_id=2,
        album_id=5,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/20.+Harris+Heller+-+Up+in+Love.wav",
        length=121
    )
    song38 = Song (
        name="Beach walk",
        artist_id=2,
        album_id=5,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/21.+Harris+Heller+-+Beach+walk.wav",
        length=110
    )
    song39 = Song (
        name="Bleeding Road",
        artist_id=2,
        album_id=5,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/21.+Harris+Heller+-+Bleeding+Road.wav",
        length=120
    )
    song40 = Song (
        name="Lunar Dust",
        artist_id=2,
        album_id=5,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/21.+Harris+Heller+-+Lunar+Dust.wav",
        length=112
    )
    song41 = Song (
        name="Child's Play",
        artist_id=2,
        album_id=5,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/22.+Harris+Heller+-+Child_s+Play.wav",
        length=115
    )
    song42 = Song (
        name="Mysteryland",
        artist_id=2,
        album_id=5,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/22.+Harris+Heller+-+Mysteryland.wav",
        length=111
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
    db.session.add(song11)
    db.session.add(song12)
    db.session.add(song13)
    db.session.add(song14)
    db.session.add(song15)
    db.session.add(song16)
    db.session.add(song17)
    db.session.add(song18)
    db.session.add(song19)
    db.session.add(song20)
    db.session.add(song21)
    db.session.add(song22)
    db.session.add(song23)
    db.session.add(song24)
    db.session.add(song25)
    db.session.add(song26)
    db.session.add(song27)
    db.session.add(song28)
    db.session.add(song29)
    db.session.add(song30)
    db.session.add(song31)
    db.session.add(song32)
    db.session.add(song33)
    db.session.add(song34)
    db.session.add(song35)
    db.session.add(song36)
    db.session.add(song37)
    db.session.add(song38)
    db.session.add(song39)
    db.session.add(song40)
    db.session.add(song41)
    db.session.add(song42)
    db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))
        
    db.session.commit()