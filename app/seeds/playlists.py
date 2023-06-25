from app.models import Playlist, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
    playlist1 = Playlist(
        name="Chill Cafe Beats",
        owner_id=1,
        cover_image="https://lofy.s3.us-east-2.amazonaws.com/1.png",
        description="Let the laid-back vibes of these tunes transport you to a peaceful and contemplative state of mind."
    )
    playlist2 = Playlist(
        name="Mellow Melodies",
        owner_id=1,
        cover_image="https://lofy.s3.us-east-2.amazonaws.com/2.png",
    )
    playlist3 = Playlist(
        name="Soothing Study Sounds",
        owner_id=2,
        description="soothing sounds guide your mind while studying",
        cover_image="https://lofy.s3.us-east-2.amazonaws.com/2.png",
    )
    playlist4 = Playlist(
        name="Dreamy Downtempo",
        owner_id=2,
    )
    playlist5 = Playlist(
        name="Laid-back Vibes",
        owner_id=3,
        description="Whether you're unwinding after a long day or seeking a calming backdrop for your daily routine, this playlist is the perfect companion for those seeking laid-back and soothing vibes."
    )
    playlist6 = Playlist(
        name="Relaxation Station",
        owner_id=3,
        cover_image="https://lofy.s3.us-east-2.amazonaws.com/3.png",
    )

    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)
    db.session.add(playlist4)
    db.session.add(playlist5)
    db.session.add(playlist6)
    db.session.commit()


def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))
        
    db.session.commit()