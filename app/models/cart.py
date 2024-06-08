from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    is_ordered = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='carts')
    cart_items = db.relationship('CartItem', back_populates='carts', cascade="all, delete-orphan", foreign_keys="[CartItem.cart_id]")

    @property
    def cart_items_dict(self):
        return [cart_item.to_dict() for cart_item in self.cart_items]

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'is_ordered': self.is_ordered,
            'cart_items': self.cart_items_dict,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
