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
    song43 = Song (
        name="Warp 9",
        artist_id=3,
        album_id=6,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/22.+Harris+Heller+-+Warp+9.wav",
        length=133
    )
    song44 = Song (
        name="Ain't No Rest For The Stars",
        artist_id=3,
        album_id=6,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/23.+Harris+Heller+-+Ain_t+No+Rest+For+The+Stars.wav",
        length=104
    )
    song45 = Song (
        name="Dissonant Whispers",
        artist_id=3,
        album_id=6,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/23.+Harris+Heller+-+Dissonant+Whispers.wav",
        length=114
    )
    song46 = Song (
        name="Plethora",
        artist_id=3,
        album_id=6,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/23.+Harris+Heller+-+Plethora.wav",
        length=114
    )
    song47 = Song (
        name="Andromeda Skies",
        artist_id=3,
        album_id=6,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/24.+Harris+Heller+-+Andromeda+Skies.wav",
        length=125
    )
    song48 = Song (
        name="Heading Out Nowhere",
        artist_id=3,
        album_id=6,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/24.+Harris+Heller+-+Heading+Out+Nowhere.wav",
        length=113
    )
    song49 = Song (
        name="Soul and Luna",
        artist_id=3,
        album_id=6,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/24.+Harris+Heller+-+Soul+and+Luna.wav",
        length=121
    )
    song50 = Song (
        name="Further",
        artist_id=3,
        album_id=7,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/25.+Harris+Heller+-+Further.wav",
        length=123
    )
    song51 = Song (
        name="Lucid Dreaming",
        artist_id=3,
        album_id=7,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/25.+Harris+Heller+-+Lucid+Dreaming.wav",
        length=124
    )
    song52 = Song (
        name="The White Fox",
        artist_id=3,
        album_id=7,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/25.+Harris+Heller+-+The+White+Fox.wav",
        length=113
    )
    song53 = Song (
        name="Creator's Kingdom",
        artist_id=3,
        album_id=7,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/26.+Harris+Heller+-+Creator_s+Kingdom.wav",
        length=133
    )
    song54 = Song (
        name="Deepwater",
        artist_id=3,
        album_id=7,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/26.+Harris+Heller+-+Deepwater.wav",
        length=109
    )
    song55 = Song (
        name="Oasis Skyline",
        artist_id=3,
        album_id=7,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/26.+Harris+Heller+-+Oasis+Skyline.wav",
        length=109
    )
    song56 = Song (
        name="Plaid",
        artist_id=3,
        album_id=7,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/27.+Harris+Heller+-+Plaid.wav",
        length=109
    )
    song57 = Song (
        name="Stirling Keys",
        artist_id=4,
        album_id=8,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/27.+Harris+Heller+-+Stirling+Keys.wav",
        length=109
    )
    song58 = Song (
        name="Partial Moonlight",
        artist_id=4,
        album_id=8,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/28.+Harris+Heller+-+Partial+Moonlight.wav",
        length=134
    )
    song59 = Song (
        name="Sky and Why",
        artist_id=4,
        album_id=8,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/28.+Harris+Heller+-+Sky+and+Why.wav",
        length=119
    )
    song60 = Song (
        name="When I Was Younger",
        artist_id=4,
        album_id=8,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/28.+Harris+Heller+-+When+I+Was+Younger.wav",
        length=108
    )
    song61 = Song (
        name="Aurora",
        artist_id=4,
        album_id=8,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/29.+Harris+Heller+-+Aurora.wav",
        length=109
    )
    song62 = Song (
        name="Smooth River",
        artist_id=4,
        album_id=8,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/29.+Harris+Heller+-+Smooth+River.wav",
        length=123
    )
    song63 = Song (
        name="White Noise",
        artist_id=4,
        album_id=8,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/29.+Harris+Heller+-+White+Noise.wav",
        length=112
    )
    song64 = Song (
        name="Distant Rendering",
        artist_id=4,
        album_id=8,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/3.+Harris+Heller+-+Distant+Rendering.wav",
        length=120
    )
    song65 = Song (
        name="Star Searcher",
        artist_id=4,
        album_id=8,
        audio="https://lofy.s3.us-east-2.amazonaws.com/audio/3.+Harris+Heller+-+Star+Searcher.wav",
        length=140
    )
    
    
    songs = [song1, song2, song3, song4, song5, song6, song7, song8,
             song9, song10, song11, song12, song13, song14, song15,
             song16, song17, song18, song19, song20, song21, song22,
             song23, song24, song25, song26, song27, song28, song29,
             song30, song31, song32, song33, song34, song35, song36,
             song37, song38, song39, song40, song41, song42, song43,
             song44, song45, song46, song47, song48, song49, song50,
             song51, song52, song53, song54, song55, song56, song57, 
             song58, song59, song60, song61, song62, song63, song64, song65
             ]
    
    for song in songs:
        db.session.add(song)

    db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))
        
    db.session.commit()