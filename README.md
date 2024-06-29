# Poppins's Shoppings

Welcome to [Poppins's Shoppings](https://poppins-shoppings.onrender.com), the one-stop pop-in shop for anything and everything you'll ever need! <br />
Inspired by e-commerce sites such as Etsy and Amazon, and themed around the magic of **_practically perfect in every way_** Mary Poppins.

![1_o4syQ6kk6AuKzqTTP8iI7g](https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/f4a95e2a-bb32-49ed-bf05-2303c46ebba9)

# Technologies

The Poppins's Shoppings project is powered by **Flask** on the backend, with **React** and **Redux** rendering data on the frontend. **PostgreSQL** is the database medium where the data is stored, and **SQLAlchemy** is its backend interface; additionally, images that display the products are stored on **Amazon Web Services**, allowing for easy file uploading and deletion. Users are authenticated via **CSRF tokens** to ensure security while exploring the site.

# Site Navigation with Images (current features mentioned throughout)

Upon first arrival, the user can view all products currently being sold on the landing page.
<img width="1440" alt="Screen Shot 2024-06-28 at 17 08 39" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/554ebaec-c74a-4ef7-b4ee-d259b32ee6f0">

Clicking _Please sign up here_ opens a pop-up for logging in or signing up. <br/>
<img width="191" alt="Screen Shot 2024-06-28 at 17 12 01" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/b0e5782c-e632-48ec-ab46-4672bcaa0fbd">
<img width="747" alt="Screen Shot 2024-06-28 at 17 13 02" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/ca6a34d2-9055-4121-8ec3-9b8dc0507af0">
<img width="1057" alt="Screen Shot 2024-06-28 at 17 12 56" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/b53131ef-d650-4bd9-97b9-5fd1e8e5569c">

Following login, the upper right-hand corner now shows icons for a cart and a profile.
<img width="1440" alt="Screen Shot 2024-06-28 at 17 11 38" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/d24e3604-7860-438c-8293-d5ddc308153a">
<img width="205" alt="Screen Shot 2024-06-28 at 17 25 06" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/017cebf9-bda1-4a29-98ba-be5af4c8184a">

Clicking _Manage email_ on the profile menu navigates to a profile page; it displays the user information, the user's products, a wishlist of products they intend to purchase, and buttons at the bottom for logging out or profile deletion.
<img width="1426" alt="Screen Shot 2024-06-28 at 17 13 58" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/5bdaf236-b7f6-47fd-bb38-c3a02b3e4760">
<img width="1438" alt="Screen Shot 2024-06-28 at 17 13 49" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/c2326e23-f9a5-4d9f-b35f-e7dc8ba00ec9">
<img width="1440" alt="Screen Shot 2024-06-28 at 17 13 35" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/3b015ff7-48aa-45d9-9259-9c0540307c5e">
<img width="913" alt="Screen Shot 2024-06-28 at 17 14 11" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/c3e6786c-747a-46e8-bf74-7698add194ff">

Clicking _Edit profile_ opens a pop-up to make changes to the user info.
<img width="1158" alt="Screen Shot 2024-06-28 at 17 15 07" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/a74daaa6-0768-42fd-9455-02a757dc21ec">

Clicking _Create product listing_ in either the menu _Create a new product_ on the profile page redirects to a new form. After clicking _Create product_, the user is navigated to the page of that new product.
<img width="620" alt="Screen Shot 2024-06-28 at 17 14 37" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/0d15ab33-2791-4d8f-a802-745e8c09d6a9">

Clicking _My order history_ navigates to a page that displays all products already purchased by the user.
<img width="1339" alt="Screen Shot 2024-06-28 at 17 17 57" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/70f30e56-d368-4e5f-ab0d-08c15552e712">

Clicking _Delete user_ opens a pop-up that asks whether the user wants to delete their profile. Doing so removes said profile from the database, and they are navigated back to the landing page signed out.
<img width="640" alt="Screen Shot 2024-06-28 at 17 14 18" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/34b0876b-dacb-49f0-bcea-09511b6bf4b9">

Clicking _Log out_ in either the menu or the profile page navigates the user back to the landing page signed out.

Clicking _Edit product_ redirects to the _Create_ form to make changes to the product info.
<img width="620" alt="Screen Shot 2024-06-28 at 17 14 37" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/fe0565c3-2cf2-4541-bdbc-322c51cf47df">

Clicking _Delete product_ opens a pop-up that asks whether the user wants to delete the product.
<img width="699" alt="Screen Shot 2024-06-28 at 17 14 43" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/4e2c5130-ead2-4125-a39e-3d76b2a3bf28">

Clicking on a product navigates the user to its page. The following are shown: an image of the product, its listing name, its price, who is selling it, and if a review was left: a written review and its rating. If they are not selling the product, then they will see buttons for _Create a new review_, _Add to cart_, and _Add to wishlist_; otherwise, those buttons will not be shown.
<img width="1381" alt="Screen Shot 2024-06-28 at 17 16 07" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/273a28c3-7b45-41e5-a1d8-8c6841bc5be7">
<img width="1440" alt="Screen Shot 2024-06-28 at 17 49 44" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/051f3ee3-fb08-47bc-9be2-91a64d1ac36a">

Clicking _Create a new review_ opens a pop-up to leave a review on the product with a 5 - ~star~ wand rating.
<img width="826" alt="Screen Shot 2024-06-28 at 17 16 52" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/77877daf-004f-40da-84d6-1e95e52219b0">

Clicking _Edit review_ opens a pop-up to make changes to the user's review on a product.
<img width="1396" alt="Screen Shot 2024-06-28 at 17 52 48" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/5dc8bd1a-d18b-43a1-a50a-bbc09f7af611">
<img width="585" alt="Screen Shot 2024-06-28 at 17 52 55" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/b0562163-7ac6-47e1-8855-fcc51254df46">

Clicking _Delete review_ opens a pop-up that asks whether the user wants to delete the review.
<img width="460" alt="Screen Shot 2024-06-28 at 17 53 00" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/e4c56af0-5af3-42f8-bb18-cf7c49b454d1">

Clicking _Add to cart_ adds the product to the user's cart.

Clicking _Add to wishlist_ adds the product to the user's wishlist, found on the profile page.

Clicking on a category in the heading navigates to a page that displays the products according to category.
<img width="1112" alt="Screen Shot 2024-06-28 at 17 16 32" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/fbeec1c1-1342-40a9-bb0d-0d3e24c13fa0">

Clicking on the cart navigates to a page where an order is taking place. The user can change how much of each item they would like to purchase; the total will be adjusted accordingly.
<img width="1134" alt="Screen Shot 2024-06-28 at 17 17 20" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/81389f9b-6a89-46c3-a2f2-9568392080ab">

Clicking on _Remove from cart_ opens a pop-up that asks whether the user wants to remove the product from the cart.
<img width="657" alt="Screen Shot 2024-06-28 at 17 17 29" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/0c0e3ed7-04b6-4256-8d66-f4e1f8ae0e03">

Clicking on _Clear cart_ opens a pop-up that asks whether the user wants to remove all products from the cart.
<img width="711" alt="Screen Shot 2024-06-28 at 17 17 33" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/c60dbf69-c2be-4e1a-bd2a-0d1e9db8a64b">

Clicking on _Checkout_ opens a pop-up that confirms whether a purchase is to be made. Clicking checkout navigates the user back to the landing page and adds the purchased products to their order history.
<img width="561" alt="Screen Shot 2024-06-28 at 17 17 38" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/23e69c90-dea0-400e-9753-4d1bb8ea11e6">

Clicking on the search bar allows for the user to search up a certain product or category.
<img width="1304" alt="Screen Shot 2024-06-28 at 17 17 02" src="https://github.com/Six5pAdes/Poppins-Shoppings/assets/138395132/eca31d30-6a3c-469d-85cc-459d65626d28">

More details on features: https://github.com/Six5pAdes/Poppins-Shoppings/wiki/Feature-List

# What Comes Next?

- OAuth integration so users can create a new account or log in via their Google account
- Image preview during product upload
- More options for categorizing products (i.e.: price range, sold by, alphabetical, etc)

# To run the site locally...

## Getting started

1. Clone this repository (only this branch).

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

## Deployment through Render.com

First, recall that Vite is a development dependency, so it will not be used in
production. This means that you must already have the **dist** folder located in
the root of your **react-vite** folder when you push to GitHub. This **dist**
folder contains your React code and all necessary dependencies minified and
bundled into a smaller footprint, ready to be served from your Python API.

Begin deployment by running `npm run build` in your **react-vite** folder and
pushing any changes to GitHub.

Refer to your Render.com deployment articles for more detailed instructions
about getting started with [Render.com], creating a production database, and
deployment debugging tips.

From the Render [Dashboard], click on the "New +" button in the navigation bar,
and click on "Web Service" to create the application that will be deployed.

Select that you want to "Build and deploy from a Git repository" and click
"Next". On the next page, find the name of the application repo you want to
deploy and click the "Connect" button to the right of the name.

Now you need to fill out the form to configure your app. Most of the setup will
be handled by the **Dockerfile**, but you do need to fill in a few fields.

Start by giving your application a name.

Make sure the Region is set to the location closest to you, the Branch is set to
"main", and Runtime is set to "Docker". You can leave the Root Directory field
blank. (By default, Render will run commands from the root directory.)

Select "Free" as your Instance Type.

### Add environment variables

In the development environment, you have been securing your environment
variables in a **.env** file, which has been removed from source control (i.e.,
the file is gitignored). In this step, you will need to input the keys and
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
**.env** file. As you work to further develop your project, you may need to add
more environment variables to your local **.env** file. Make sure you add these
environment variables to the Render GUI as well for the next deployment.

### Deploy

Now you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your Dockerfile
commands being executed and any errors that occur.

When deployment is complete, open your deployed site and check to see that you
have successfully deployed your Flask application to Render! You can find the
URL for your site just below the name of the Web Service at the top of the page.

**Note:** By default, Render will set Auto-Deploy for your project to true. This
setting will cause Render to re-deploy your application every time you push to
main, always keeping it up to date.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
