from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_favorites():
    fav1 = Favorite(
        product_id = 2,
        user_id = "1"
    )
    fav2 = Favorite(
        product_id = 13,
        user_id = "1"
    )
    fav3 = Favorite(
        product_id = 11,
        user_id = "1"
    )
    fav4 = Favorite(
        product_id = 20,
        user_id = "1"
    )
    fav5 = Favorite(
        product_id = 14,
        user_id = "1"
    )
    fav6 = Favorite(
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


def undo_favorites():
   if environment == "production":
       db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
   else:
       db.session.execute(text("DELETE FROM favorites"))

   db.session.commit()
