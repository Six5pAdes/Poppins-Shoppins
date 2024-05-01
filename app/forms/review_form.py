from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, DateTimeField, SubmitField
from wtforms.validators import DataRequired
from datetime import datetime


class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    product_id = IntegerField('product_id', validators=[DataRequired()])
    body = TextAreaField('body', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    created_at = DateTimeField('Posted At', validators=[DataRequired()], default=datetime.now)
    updated_at = DateTimeField('Updated At', validators=[DataRequired()], default=datetime.now)
    # submit = SubmitField('Submit Review')
