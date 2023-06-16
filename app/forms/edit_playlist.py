from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


class EditPlaylistForm(FlaskForm):
    name = StringField('Name of Playlist', validators=[Length(max=100, message="Must name playlist"), DataRequired()])
    cover_image = StringField("Cover Image", validators=[Length(max=255, message="Playlist must have cover image")])
    # cover_image = StringField("Cover Image", validators=[Length(max=255, message="Playlist must have cover image"), DataRequired()])
    description = StringField("Description", validators=[Length(max=300, message="Description has a max of 300 characters")])