from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_reviews():
    review_item1 = Review(
        user_id = 5,
        product_id = 3,
        body = "No one told me I was supposed to actively care for this. It died in a week, give or take.",
        rating = 2,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    review_item2 = Review(
        user_id = 2,
        product_id = 10,
        body = "I live by this product! Taking medicine is more fun now that it tastes like vodka. My kids love it too, say it tastes like pizza and blueberry muffins.",
        rating = 5,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    review_item3 = Review(
        user_id = 3,
        product_id = 12,
        body = "1 out of 10, not enough books. I demand a refund.",
        rating = 1,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    review_item4 = Review(
        user_id = 4,
        product_id = 11,
        body = "I am fascinated by the ingenuity in this item. I'll need to buy another one though, cause I lost the first one to a bunch of bandits.",
        rating = 4,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    review_item5 = Review(
        user_id = 1,
        product_id = 5,
        body = "They look nice, but my wife says they're hard to walk around in.",
        rating = 3,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    review_item6 = Review(
        user_id = 2,
        product_id = 5,
        body = "Very fashionable, very chic. My only wish is that there was a pair in lilac.",
        rating = 5,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    review_item7 = Review(
        user_id = 3,
        product_id = 4,
        body = "I like the design, but one of the bulbs was broken when it came.",
        rating = 2,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    review_item8 = Review(
        user_id = 5,
        product_id = 14,
        body = "The drinks from this are delicious, and fun to make too. I just wish the 'changes' lasted for more than an hour.",
        rating = 3,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    review_item9 = Review(
        user_id = 1,
        product_id = 19,
        body = "Once you have an item like this, you won't ever have to worry about forgetting something. Amazingly, it's also small enough to be a carry-on.",
        rating = 3,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    review_item10 = Review(
        user_id = 4,
        product_id = 2,
        body = "I'm keeping this, but I'm leaving the review to say that my reflection is very rude and judgmental.",
        rating = 1,
        created_at = datetime.now(),
        updated_at = datetime.now()
    )

    db.session.add(review_item1)
    db.session.add(review_item2)
    db.session.add(review_item3)
    db.session.add(review_item4)
    db.session.add(review_item5)
    db.session.add(review_item6)
    db.session.add(review_item7)
    db.session.add(review_item8)
    db.session.add(review_item9)
    db.session.add(review_item10)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
