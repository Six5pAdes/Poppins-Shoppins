from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class OrderHistory(db.Model):
    __tablename__ = 'order_histories'

    if environment == 'production':
        __table_args__= {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)


    user = db.relationship('User', back_populates='order_histories')
    product = db.relationship('Product', back_populates='order_histories')


    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'user_id': self.user_id,
            'quantity': self.quantity,
            'created_at': str(self.created_at.strftime("%Y-%m-%d %H:%M:%S")),
        }
