from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField, TextAreaField, DateTimeField, SubmitField
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms.validators import DataRequired
from ..api.aws import ALLOWED_EXTENSIONS
from datetime import datetime


class ProductForm(FlaskForm):
    # user_id = IntegerField('user_id', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired()])
    image = FileField('Image URL', validators=[FileRequired(list(ALLOWED_EXTENSIONS))])
    price = FloatField('Price', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    created_at = DateTimeField('Posted At', validators=[DataRequired()], default=datetime.now)
    submit = SubmitField('Create Product')
