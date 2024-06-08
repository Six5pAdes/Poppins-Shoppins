from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text


def seed_carts():
    user1cart1 = Cart(
        user_id=1,
        is_ordered=False,
    )
    user1cart2 = Cart(
        user_id=1,
        is_ordered=True,
    )
    user2cart1 = Cart(
        user_id=2,
        is_ordered=True,
    )
    user3cart1 = Cart(
        user_id=3,
        is_ordered=False,
    )
    user4cart1 = Cart(
        user_id=4,
        is_ordered=True,
    )

    db.session.add(user1cart1)
    db.session.add(user1cart2)
    db.session.add(user2cart1)
    db.session.add(user3cart1)
    db.session.add(user4cart1)

    db.session.commit()


def undo_carts():
    if environment != 'production':
        db.session.execute('TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text("DELETE FROM carts"))
    db.session.commit()
