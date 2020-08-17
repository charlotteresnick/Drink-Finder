# Cocktail-Search

<a href="https://blooming-journey-07077.herokuapp.com/">Heroku App</a>

### Description

**Search through cocktail recipes, create your own collections and save drinks.**

## Project Workflow

**Complete repository link here:**
<a href="https://github.com/charlotteresnick/Cocktail-Search">Drink Finder</a>

### Wire Frames
<a>--WIREFRAMES--</a>

### Schema diagram
![Schema](schema.png)

### User Story

- Login or register using your email, password and username. 
- Search for recipes from external API, create collections to add recipes to.
- When viewing a recipe, add to any collection using dropdown menu.
- View collections, edit recipes within and delete collections.

### HTTP Routes

- GET '/', main page with dynamic login, register and search buttons

- GET '/auth/login', sign into existing account, takes user to full page 
- POST '/auth/login', handles authentication on login
- GET '/auth/register', handles authentication when user registers to create a new account
- GET '/auth/logout', handles authentication on logout

- GET '/collections/', shows full index of collections
- GET '/collections/delete', deletes a collection
- GET '/collections/:id', shows a single collection and the recipe thumbnails belonging to it
- POST '/collections/', creates a new collection

- GET '/recipe/:id', shows individual recipe

- GET '/save/', saves a drink recipe to a collection
- GET 'save/delete', deletes a recipe from a collection

- POST '/user', creates a new user 
    

## Specs

- Technologies
    - Postgres-SQL
    - Node.js
    - Express
    - ejs

- API
    - The Cocktail DB
        - Housed recipes and images for recipes in English and German
        - I formatted recipes found via user search to dynamically render in user collections 

- Modules
    - bcyrptjs
    - body-parser
    - cookie-parser
    - dotenv
    - ejs
    - express
    - express-session
    - method-override
    - morgan
    - node-fetch
    - nodemon
    - passport
    - passport-local
    - pg-promise

## My Favorite Bit From This Project

- Writing the SQL query for making the add to collections dropdown dynamic. What a trip.
- Dynamically populating collections from a recipe search
- Scrolling when handling overflow in styling...it was my first time using and I thought it was neat, especially for how easy it was to implement.

## Fix or Add

- Ability to create a collection in the add to collection dropdown on a recipe
- A local cache for recipes queried and saved to collections by users so the app's not constantly making requests to the API when a user searches because the API was messy to sort through
- More search filters

## Start-up Walk-through

- Github
    - Fork version to personal Github account
    - Get link for the cloned repo from green clipboard button on forked copy of repo
    - Create a new directory without an existing Github repo in terminal
    - Clone the copied link from Github
    - Change directory to the newly created repository
- PSQL
    - Enter "psql" command in the commandline and create a databse of the exact name from my .env file 
    - connect to the database (\c '.env_DB_NAME')
    - create tables for the database (\i db/migrations/ (migration file))
- NPM
    -Once inside the root directory of the cloned repo, run the command "npm install" in the commandline; this will install all modules needed to run the app
    - Start the server by entering "npm run dev" into the command line
- Web Browser
    - Enter "localhost:3000" in browser to view app
