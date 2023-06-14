from app.models import Playlist, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
    playlist1 = Playlist(
        name="Playlist1",
        owner_id=1,
        cover_image="google.com",
        description="really good"
    )
    playlist2 = Playlist(
        name="Playlist2",
        owner_id=2,
        cover_image="google.com",
        description="vibey"
    )
    playlist3 = Playlist(
        name="Playlist3",
        owner_id=3,
        cover_image="google.com",
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