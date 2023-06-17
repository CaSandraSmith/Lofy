from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..aws_helpers.aws import ALLOWED_EXTENSIONS
from app.models import User


class EditPlaylistForm(FlaskForm):
    name = StringField('Name of Playlist', validators=[Length(max=100, message="Must name playlist"), DataRequired()])
    cover_image = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    description = StringField("Description", validators=[Length(max=300, message="Description has a max of 300 characters")])