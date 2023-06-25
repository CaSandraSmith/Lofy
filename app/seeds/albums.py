from app.models import Album, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    album1 = Album (
        name="Nostalgic Reverie",
        cover_image="https://lofy.s3.us-east-2.amazonaws.com/album_covers/Nostalgic+Reverie.png",
        artist_id=1
    )
    album2 = Album (
        name="Chillwaves and Coffee",
        cover_image="https://lofy.s3.us-east-2.amazonaws.com/album_covers/Chillwaves+and+Coffee.png",
        artist_id=1
    )
    album3 = Album (
        name="Sunset Serenade",
        cover_image="https://lofy.s3.us-east-2.amazonaws.com/album_covers/Sunset+Serenade.png",
        artist_id=1
    )
    album4 = Album (
        name="Dreamy Haze",
        cover_image="https://lofy.s3.us-east-2.amazonaws.com/album_covers/Dreamy+Haze.png",
        artist_id=2
    )
    album5 = Album (
        name="Melancholic Mornings",
        cover_image="https://lofy.s3.us-east-2.amazonaws.com/album_covers/Melancholic+Mornings.png",
        artist_id=2
    )
    album6 = Album (
        name="Mellow Vibes",
        cover_image="https://lofy.s3.us-east-2.amazonaws.com/album_covers/Mellow+Vibes.png",
        artist_id=3
    )
    album7 = Album (
        name="Rainy Day Melodies",
        cover_image="https://lofy.s3.us-east-2.amazonaws.com/album_covers/Rainy+Day+Melodies.png",
        artist_id=3
    )
    album8 = Album (
        name="Lo-fi Journeys",
        cover_image="https://lofy.s3.us-east-2.amazonaws.com/album_covers/Lo-fi+Journeys.png",
        artist_id=4
    )
    # album9 = Album (
    #     name="Mellow Vibes",
    #     cover_image="",
    #     artist_id=4
    # )
    # album10 = Album (
    #     name="Lazy Sunday Beats",
    #     cover_image="https://lofy.s3.us-east-2.amazonaws.com/album_covers/Lazy+Sunday+Beats.png",
    #     artist_id=5
    # )
    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.add(album4)
    db.session.add(album5)
    db.session.add(album6)
    db.session.add(album7)
    db.session.add(album8)
    # db.session.add(album9)
    # db.session.add(album10)
    db.session.commit()


def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))
        
    db.session.commit()