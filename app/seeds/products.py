from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_products():
    poppins_item1 = Product(
        user_id = 1,
        name = "Hat Stand",
        image = "https://poppins-shoppings.s3.us-west-1.amazonaws.com/hatstand.png",
        price = 79.99,
        description = "A towering pole for holding hats and scarves, takes up less space than one would expect.",
        created_at = datetime.now()
    )
    poppins_item2 = Product(
        user_id = 2,
        name = "Mirror",
        image = "https://poppins-shoppings.s3.us-west-1.amazonaws.com/mirror.jpeg",
        price = 49.97,
        description = "A rather ornate looking glass, perfect for capturing every possible angle. Your reflection will have a mind of its own, though.",
        created_at = datetime.now()
    )
    poppins_item3 = Product(
        user_id = 3,
        name = "Houseplant",
        image = "https://poppins-shoppings.s3.us-west-1.amazonaws.com/houseplant.jpg",
        price = 228.00,
        description = "A lovely piece of flora, always comes in handy for sprucing up a room.",
        created_at = datetime.now()
    )
    poppins_item4 = Product(
        user_id = 1,
        name = "Lamp",
        image = "https://poppins-shoppings.s3.us-west-1.amazonaws.com/lamp.jpeg",
        price = 150.80,
        description = "Brighten your day with this exquisite lamp, complete with a detailed covering; two light bulbs included.",
        created_at = datetime.now()
    )
    poppins_item5 = Product(
        user_id = 5,
        name = "Pair of Heels",
        image = "https://poppins-shoppings.s3.us-west-1.amazonaws.com/heels.jpeg",
        price = 29.99,
        description = "A pair of fashionable heels. They are short in height, making them practical and easy to wear. They are also so comfortable you will be convinced they are made from magic.",
        created_at = datetime.now()
    )
    poppins_item6 = Product(
        user_id = 2,
        name = "Hand Mirror",
        image = "https://poppins-shoppings.s3.us-west-1.amazonaws.com/handmirror.jpeg",
        price = 9.50,
        description = "A smaller mirror for quick self-inspections while on the move.",
        created_at = datetime.now()
    )
    poppins_item7 = Product(
        user_id = 5,
        name = "Overcoat",
        image = "https://poppins-shoppings.s3.us-west-1.amazonaws.com/overcoat.jpeg",
        price = 66.79,
        description = "A floor-length coat for special occasions. The cold will never bother you while you are wearing something so elegant.",
        created_at = datetime.now()
    )
    poppins_item8 = Product(
        user_id = 3,
        name = "Tape Measure",
        image = "https://poppins-shoppings.s3.us-west-1.amazonaws.com/tapemeasure.jpeg",
        price = 5.33,
        description = "Measure anything that comes to mind, from distances and sizes, to who you are and how you can change, with this tape measure.",
        created_at = datetime.now()
    )
    poppins_item9 = Product(
        user_id = 5,
        name = "Cloak",
        image = "https://poppins-shoppings.s3.us-west-1.amazonaws.com/cloak.jpeg",
        price = 34.99,
        description = "A stylish cloak for traveling. It can be folded so many times, you would assume it's become invisible.",
        created_at = datetime.now()
    )
    poppins_item10 = Product(
        user_id = 4,
        name = "Medicine",
        image = "https://poppins-shoppings.s3.us-west-1.amazonaws.com/medicine.jpeg",
        price = 9.95,
        description = "A seemingly unappetizing bottle of medicine, its contents change color and flavour based on the patient. Plus, just a spoonful of sugar helps it go down in a most delightful way.",
        created_at = datetime.now()
    )
    poppins_item11 = Product(
        user_id = 3,
        name = "Camping Tent",
        image = "https://poppins-shoppings.s3.us-west-1.amazonaws.com/tent.jpeg",
        price = 101.98,
        description = "A single-person tent that is actually much bigger on the inside. Vital for sports events or being on the run.",
        created_at = datetime.now()
    )
    poppins_item12 = Product(
        user_id = 1,
        name = "Bookshelf",
        image = "https://poppins-shoppings.s3.us-west-1.amazonaws.com/bookshelf.jpeg",
        price = 129.86,
        description = "A bookshelf for storing your favorite books. Some are even included to help start your own collection.",
        created_at = datetime.now()
    )
    poppins_item13 = Product(
        user_id = 2,
        name = "Portrait Frame",
        image = "https://poppins-shoppings.s3.us-west-1.amazonaws.com/frame.png",
        price = 59.25,
        description = "A life-size portrait frame to help hang photos and paintings. Apparently, it was enchanted to bring its contents to life.",
        created_at = datetime.now()
    )
    poppins_item14 = Product(
        user_id = 4,
        name = "Alcoholic Drink Starter Kit",
        image = "https://poppins-shoppings.s3.us-west-1.amazonaws.com/alcohol.jpeg",
        price = 69.99,
        description = "A package filled with an assortment of ingredients for making drinks. Consumption will also change how a person acts. Please contact seller directly for subscription details.",
        created_at = datetime.now()
    )
    poppins_item15 = Product(
        user_id = 4,
        name = "Sword",
        image = "https://poppins-shoppings.s3.us-west-1.amazonaws.com/sword.png",
        price = 50.00,
        description = "A blade of unspeakable power, only wieldable by those of genuine heart.",
        created_at = datetime.now()
    )

    db.session.add(poppins_item1)
    db.session.add(poppins_item2)
    db.session.add(poppins_item3)
    db.session.add(poppins_item4)
    db.session.add(poppins_item5)
    db.session.add(poppins_item6)
    db.session.add(poppins_item7)
    db.session.add(poppins_item8)
    db.session.add(poppins_item9)
    db.session.add(poppins_item10)
    db.session.add(poppins_item11)
    db.session.add(poppins_item12)
    db.session.add(poppins_item13)
    db.session.add(poppins_item14)
    db.session.add(poppins_item15)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
