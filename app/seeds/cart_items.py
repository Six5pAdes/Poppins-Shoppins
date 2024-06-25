from app.models import db, OrderItem, environment, SCHEMA
from sqlalchemy.sql import text


def seed_order_items():
    order_item1 = OrderItem(
        user_id=1,
        product_id=14,
        quantity=1,
    )
    order_item2 = OrderItem(
        user_id=1,
        product_id=2,
        quantity=2,
    )
    order_item3 = OrderItem(
        user_id=2,
        product_id=3,
        quantity=1,
    )
    order_item4 = OrderItem(
        user_id=3,
        product_id=13,
        quantity=6,
    )
    order_item5 = OrderItem(
        user_id=4,
        product_id=19,
        quantity=1,
    )

    db.session.add(order_item1)
    db.session.add(order_item2)
    db.session.add(order_item3)
    db.session.add(order_item4)
    db.session.add(order_item5)

    db.session.commit()

def undo_order_items():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text("DELETE FROM order_items"))
    db.session.commit()
