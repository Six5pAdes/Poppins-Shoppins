from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField, SelectField, TextAreaField, DateTimeField, SubmitField
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms.validators import DataRequired
from ..api.aws import ALLOWED_EXTENSIONS
from datetime import datetime


product_categories = ['Clothing', 'Creativity', 'Furniture', 'Handmade', 'Miscellaneous']

class ProductForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired()])
    image = FileField('Image URL', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    price = FloatField('Price', validators=[DataRequired()])
    category = SelectField('Category', choices=product_categories, validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    created_at = DateTimeField('Posted At', default=datetime.now)
    # submit = SubmitField('Create Product')
