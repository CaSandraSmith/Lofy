from app.models import db, User, environment, SCHEMA, Playlist
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_user_saved_playlists():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)

    playlist1 = Playlist.query.get(1)
    playlist2 = Playlist.query.get(2)
    playlist3 = Playlist.query.get(3)
    playlist4 = Playlist.query.get(4)
    playlist5 = Playlist.query.get(5)
    playlist6 = Playlist.query.get(6)


    user1.saved_playlists.extend([playlist3, playlist6])
    
    user2.saved_playlists.extend([playlist1, playlist5])

    user3.saved_playlists.extend([playlist4, playlist2])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesnt
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_saved_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_saved_playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_saved_playlists"))
        
    db.session.commit()