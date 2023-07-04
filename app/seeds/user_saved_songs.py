from app.models import db, User, environment, SCHEMA, Song
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_user_saved_songs():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)

    song1 = Song.query.get(1)
    song2 = Song.query.get(2)
    song3 = Song.query.get(3)
    song4 = Song.query.get(4)
    song5 = Song.query.get(5)
    song6 = Song.query.get(6)
    song7 = Song.query.get(7)
    song8 = Song.query.get(8)
    song9 = Song.query.get(9)
    song10 = Song.query.get(10)

    song11 = Song.query.get(11)
    song12 = Song.query.get(12)
    song13 = Song.query.get(13)
    song14 = Song.query.get(14)
    song15 = Song.query.get(15)
    song16 = Song.query.get(16)
    song17 = Song.query.get(17)
    song18 = Song.query.get(18)
    song19 = Song.query.get(19)
    song20 = Song.query.get(20)

    song21 = Song.query.get(21)
    song22 = Song.query.get(22)
    song23 = Song.query.get(23)
    song24 = Song.query.get(24)
    song25 = Song.query.get(25)
    song26 = Song.query.get(26)
    song27 = Song.query.get(27)
    song28 = Song.query.get(28)
    song29 = Song.query.get(29)
    song30 = Song.query.get(30)

    song31 = Song.query.get(31)
    song32 = Song.query.get(32)
    song33 = Song.query.get(33)
    song34 = Song.query.get(34)
    song35 = Song.query.get(35)
    song36 = Song.query.get(36)
    song37 = Song.query.get(37)
    song38 = Song.query.get(38)
    song39 = Song.query.get(39)
    song40 = Song.query.get(40)

    song41 = Song.query.get(41)
    song42 = Song.query.get(42)
    song43 = Song.query.get(43)
    song44 = Song.query.get(44)
    song45 = Song.query.get(45)
    song46 = Song.query.get(46)
    song47 = Song.query.get(47)
    song48 = Song.query.get(48)
    song49 = Song.query.get(49)
    song50 = Song.query.get(50)

    song51 = Song.query.get(51)
    song52 = Song.query.get(52)
    song53 = Song.query.get(53)
    song54 = Song.query.get(54)
    song55 = Song.query.get(55)
    song56 = Song.query.get(56)
    song57 = Song.query.get(57)
    song58 = Song.query.get(58)
    song59 = Song.query.get(59)
    song60 = Song.query.get(60)

    song61 = Song.query.get(61)
    song62 = Song.query.get(62)
    song63 = Song.query.get(63)
    song64 = Song.query.get(64)
    song65 = Song.query.get(65)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_saved_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_saved_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()