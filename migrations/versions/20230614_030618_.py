"""empty message

Revision ID: 522ded7f0f80
Revises: 
Create Date: 2023-06-14 03:06:18.016216

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '522ded7f0f80'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('artists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('profile_image', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('albums',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('artist_id', sa.Integer(), nullable=False),
    sa.Column('cover_image', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['artist_id'], ['artists.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('cover_image', sa.String(length=255)),
    sa.Column('description', sa.String(length=300)),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('songs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('artist_id', sa.Integer(), nullable=False),
    sa.Column('album_id', sa.Integer(), nullable=False),
    sa.Column('audio', sa.String(length=255), nullable=False),
    sa.Column('length', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['album_id'], ['albums.id'], ),
    sa.ForeignKeyConstraint(['artist_id'], ['artists.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlist_reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('playlist_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(length=255), nullable=False),
    sa.Column('stars', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['playlist_id'], ['playlists.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlist_songs',
    sa.Column('playlist_id', sa.Integer(), nullable=False),
    sa.Column('song_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['playlist_id'], ['playlists.id'], ),
    sa.ForeignKeyConstraint(['song_id'], ['songs.id'], ),
    sa.PrimaryKeyConstraint('playlist_id', 'song_id')
    )
    op.create_table('user_saved_songs',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('song_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['song_id'], ['songs.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'song_id')
    )
    op.create_table('user_saved_albums',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('album_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['album_id'], ['albums.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'album_id')
    )
    op.create_table('user_saved_playlists',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('playlist_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['playlist_id'], ['playlists.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'playlist_id')
    )
    op.create_table('follows',
    sa.Column('follower', sa.Integer(), nullable=False),
    sa.Column('following', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['follower'], ['users.id'], ),
    sa.ForeignKeyConstraint(['following'], ['users.id'], ),
    sa.PrimaryKeyConstraint('follower', 'following')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE artists SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE albums SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE playlists SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE songs SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE playlist_reviews SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE playlist_songs SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE user_saved_songs SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE user_saved_albums SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE user_saved_playlists SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE follows SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('follows')
    op.drop_table('user_saved_playlists')
    op.drop_table('user_saved_albums')
    op.drop_table('user_saved_songs')
    op.drop_table('playlist_songs')
    op.drop_table('playlist_reviews')
    op.drop_table('songs')
    op.drop_table('playlists')
    op.drop_table('albums')
    op.drop_table('users')
    op.drop_table('artists')
    # ### end Alembic commands ###