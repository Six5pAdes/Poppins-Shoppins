# Poppins's Shoppings

Welcome to [Poppins's Shoppings](https://poppins-shoppings.onrender.com), the one-stop pop-in shop for anything and everything you'll ever need! <br />
Inspired by e-commerce sites such as Etsy and Amazon, and themed around the magic of **_practically perfect in every way_** Mary Poppins.

![1_o4syQ6kk6AuKzqTTP8iI7g](https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/f4a95e2a-bb32-49ed-bf05-2303c46ebba9)


## Preview

<img width="1440" alt="Screen Shot 2024-06-28 at 17 08 39" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/554ebaec-c74a-4ef7-b4ee-d259b32ee6f0">


## Technologies

The Poppins's Shoppings project is powered by **Flask** on the backend, with **React** and **Redux** rendering data on the frontend. <br /> 

**PostgreSQL** is the database medium where the data is stored, and **SQLAlchemy** is its backend interface; additionally, images that display the products are stored on **Amazon Web Services**, allowing for easy file uploading and deletion. <br />

Users are authenticated via **CSRF tokens** to ensure security while exploring the site.


## Active Features

- Users:
   - New users can log into their existing account, or create a new one.
   - Logged-in users can view their given information on their profile page.
      - Said info can be edited accordingly.
   - If need be, users can also delete their entire profile.
- Products:
   - All products can be found on the landing page.
   - Clicking on one product takes the user to its page with additional details given.
   - Clicking on a category at the top of the page navigates the user to a new page with products that fit in a given category.
   - All users can create their own products to sell.
      - Like profile info, users can also edit the product info as they desire.
   - Logged-in users can view their products to sell on the profile page.
   - Users can also delete their own products.
- Reviews:
   - On a product page, any existing reviews on it will be displayed regardless of login status.
   - Logged-in users can leave their own reviews on a product.
      - Contents of review can be edited as well.
   - Users can also delete their own reviews.
- Favorites:
   - Logged-in users can mark a product as one to add to a provided wishlist.
   - Users can view all favorited products on the profile page.
   - Users can unmark a product if they wish to remove it from their wishlist.
- Cart:
   - Logged-in users can mark a product as one to add to their shopping cart.
   - Upon navigating to their cart, users can view all products currently in their cart.
      - In said cart, users can change the quantity of a product to reflect how much they would like to purchase.
   - Users can remove one or all of the products in their cart.
   - Upon clicking "Checkout," the cart is cleared of all products.
- Order History:
   - Logged-in users can view all products they have already purchased.
- Other:
   - The search bar at the top allows users to look up a certain product or category.

More details: https://github.com/Six5pAdes/Poppins-Shoppings/wiki/Feature-List


## What Comes Next?

- ~~OAuth integration so users can create a new account or log in via their Google account~~ ✅
- Image preview during product upload
- More options for categorizing products (i.e.: price range, sold by, alphabetical, etc)


## To run the site locally...
### Getting started

1. Clone this repository (main branch only).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the **.env** file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable. Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the **.css** files from your
   Authenticate Me project into the corresponding locations in the
   **react-vite** folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the **react-vite**
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the **dist**
   folder whenever you change your code, keeping the production version up to
   date.

### Add environment variables

In the development environment, you have been securing your environment
variables in a **.env** file, which has been removed from source control (i.e.,
the file is git ignored). In this step, you will need to input the keys and
values for the environment variables you need for production into the Render
GUI.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from the **External Database URL** field)

**Note:** Add any other keys and values that may be present in your local
**.env** file. As you work to develop your project further, you may need to add
more environment variables to your local **.env** file. Make sure you also add these
environment variables to the Render GUI for the next deployment.
