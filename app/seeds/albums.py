from app.models import Album, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    album1 = Album (
        name="album1",
        artist_id=1
    )
    album2 = Album (
        name="album1",
        artist_id=2
    )
    album3 = Album (
        name="album1",
        artist_id=3
    )
    album4 = Album (
        name="album1",
        artist_id=4
    )
    album5 = Album (
        name="album1",
        artist_id=5
    )
    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.add(album4)
    db.session.add(album5)
    db.session.commit()


def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))
        
    db.session.commit()