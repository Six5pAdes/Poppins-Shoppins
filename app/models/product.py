from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate = datetime.now)

    user = db.relationship('User', back_populates='products')
    reviews = db.relationship('Review', back_populates='product')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'image': self.image,
            'price': float(self.price),
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
