from app.models import db, User, environment, SCHEMA, Album
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_user_saved_albums():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)

    album1 = Album.query.get(1)
    album2 = Album.query.get(2)
    album3 = Album.query.get(3)
    album4 = Album.query.get(4)
    album5 = Album.query.get(5)
    album6 = Album.query.get(6)
    album7 = Album.query.get(7)
    album8 = Album.query.get(8)

    user1.saved_albums.extend([album1, album8, album4])
    
    user2.saved_albums.extend([album5, album4])

    user3.saved_albums.extend([album8, album7, album3, album2])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesnt
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_saved_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_saved_albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_saved_albums"))
        
    db.session.commit()