from app.models import Playlist, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
    playlist1 = Playlist(
        name="Playlist1",
        owner_id=1,
        cover_image="https://lofy.s3.us-east-2.amazonaws.com/album_covers/ab67706c0000da845e0d1386755fc7757591d2b5.jpg",
        description="really good"
    )
    playlist2 = Playlist(
        name="Playlist2",
        owner_id=2,
        cover_image="https://lofy.s3.us-east-2.amazonaws.com/album_covers/ab67706c0000da845e0d1386755fc7757591d2b5.jpg",
        description="vibey"
    )
    playlist3 = Playlist(
        name="Playlist3",
        owner_id=3,
        description="gets me through studying"
    )

    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)
    db.session.commit()


def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))
        
    db.session.commit()