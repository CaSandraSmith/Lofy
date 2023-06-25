from app.models import Playlist, Song, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlist_songs():
    playlist1 = Playlist.query.get(1)
    playlist2 = Playlist.query.get(2)
    playlist3 = Playlist.query.get(3)
    playlist4 = Playlist.query.get(4)
    playlist5 = Playlist.query.get(5)
    playlist6 = Playlist.query.get(6)

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

    
    playlist1.songs.extend([song47, song18, song25, song60, song51, song20, song12, song55, song38, song64, song3, song13, song23])

    playlist2.songs.extend([song32, song14, song22, song8, song29, song43, song35, song27, song9, song52, song56, song48, song4, song5, song49])

    playlist3.songs.extend([song7, song64, song32, song37, song34, song48, song28, song56, song1, song54])

    playlist4.songs.extend([song5, song4, song10, song48, song58, song63, song34, song43, song53, song7, song22, song51, song64, song16, song47])

    playlist5.songs.extend([song32, song44, song35, song48, song17, song28, song24, song2])
    
    playlist6.songs.extend([ song1, song29, song55, song63, song47 ])

    db.session.commit()


def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))
        
    db.session.commit()
