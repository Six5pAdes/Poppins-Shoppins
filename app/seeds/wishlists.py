from app.models import db, Wishlist, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_wishlists():
    fav1 = Wishlist(
        product_id = 2,
        user_id = "1"
    )
    fav2 = Wishlist(
        product_id = 13,
        user_id = "1"
    )
    fav3 = Wishlist(
        product_id = 11,
        user_id = "1"
    )
    fav4 = Wishlist(
        product_id = 20,
        user_id = "1"
    )
    fav5 = Wishlist(
        product_id = 14,
        user_id = "1"
    )
    fav6 = Wishlist(
        product_id = 8,
        user_id = "1"
    )


    db.session.add(fav1)
    db.session.add(fav2)
    db.session.add(fav3)
    db.session.add(fav4)
    db.session.add(fav5)
    db.session.add(fav6)
    db.session.commit()


def undo_wishlists():
   if environment == "production":
       db.session.execute(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE;")
   else:
       db.session.execute(text("DELETE FROM wishlists"))

   db.session.commit()
