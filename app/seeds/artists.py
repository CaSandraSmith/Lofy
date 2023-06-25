from app.models import Artist, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_artists():
    artist1 = Artist(name="Harris Heller")
    artist2 = Artist(name="Echo Harmony")
    artist3 = Artist(name="Whispering Willow")
    artist4 = Artist(name="Lunar Lullabies")
    # artist5 = Artist(name="SoundScape")

    db.session.add(artist1)
    db.session.add(artist2)
    db.session.add(artist3)
    db.session.add(artist4)
    # db.session.add(artist5)
    db.session.commit()


def undo_artists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.artists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM artists"))
        
    db.session.commit()