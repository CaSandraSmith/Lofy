from app.models import PlaylistReview, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():

    review1 = PlaylistReview(
        playlist_id=1,
        user_id=2,
        review="great mellow vibes",
        stars="5"
    )
    review2 = PlaylistReview(
        playlist_id=1,
        user_id=3,
        review="very tranquil",
        stars="5"
    )
    review3 = PlaylistReview(
        playlist_id=5,
        user_id=1,
        review="very harsh",
        stars="1"
    )
    review4 = PlaylistReview(
        playlist_id=6,
        user_id=2,
        review="great",
        stars="4"
    )
    review5 = PlaylistReview(
        playlist_id=3,
        user_id=1,
        review="kinda slow",
        stars="3"
    )
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_reviews"))
        
    db.session.commit()