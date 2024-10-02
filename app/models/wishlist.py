from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Wishlist(db.Model):
    __tablename__ = 'wishlists'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    users = db.relationship('User', back_populates='wishlists')
    products = db.relationship('Product', back_populates='wishlists')

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'user_id': self.user_id,
            'created_at': self.created_at
        }
