from app.models import db, OrderHistory, environment, SCHEMA
from sqlalchemy.sql import text


def seed_order_histories():
    oh_1 = OrderHistory(
        product_id = 5,
        user_id = "1",
        quantity = 1,
    )
    oh_2 = OrderHistory(
        product_id = 8,
        user_id = "1",
        quantity = 1,
    )
    oh_3 = OrderHistory(
        product_id = 13,
        user_id = "1",
        quantity = 1,
    )

    db.session.add_all([oh_1, oh_2, oh_3])
    db.session.commit()


def undo_order_histories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_histories RESTART IDENTITY CASCADE;")
    else:
       db.session.execute(text("DELETE FROM order_histories"))
    db.session.commit()
