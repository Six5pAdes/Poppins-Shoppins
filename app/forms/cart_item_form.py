from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, NumberRange


class CartItemForm(FlaskForm):
    # user_id = IntegerField('user_id', validators=[DataRequired()])
    product_id = IntegerField('product_id', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired(), NumberRange(min=1)])
    # submit = SubmitField('Add to Cart')
