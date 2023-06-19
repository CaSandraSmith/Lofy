from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class ReviewForm(FlaskForm):
    review = StringField("review", validators=[DataRequired()])
    stars = IntegerField("stars", validators=[DataRequired()])

