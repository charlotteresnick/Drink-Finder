# Cocktail-Search

<a href="https://blooming-journey-07077.herokuapp.com/">Heroku App</a>

### Description

**Search through cocktail recipes, create your own collections and save drinks.**

## Project Workflow

**Here is a link to this complete repo**
<a href="https://github.com/Schlaffmatthewj/Express-app">My-GitHub</a>

### Wire Frames
<a href=https://imgur.com/f2RuPYQ>--WIREFRAMES--</a>

### Schema diagram
<a href=https://imgur.com/a/mDWVMIm>--SCHEMA--</a>

### User Story

- You can create a profile with your name, email, password and an username. 
- You can edit your user's information and delete your user's account. 
- There is a search page with preloaded cities and a button that allows you to search for more.
- When on a city's page you will be able to save shortcuts to cities on your profile page.
- City pages will get various popular data from Zomato's API on city cuisine and nearby locations.
- The restaurants also have links to their own content and from their page you can save that shortcut also.
- Restaurant pages show their times, address, menu links and links to even more information.
- You may also remove any city or restaurant from your profile page.

### HTTP Routes

- GET '/', homepage
- GET '/auth'
    - GET '/login', sign into account
    - GET '/logout', signout of account
- GET '/city/:id', shows a single city's info
    - POST '/', adds city to global search page
- GET '/restaurant/:id', shows a single restaurant's info
    - POST '/', adds restaurant's info to the database
- GET '/user', index shows all shortcuts for a user
    - GET '/new', create new account
    - POST '/', adds new user to database
    - PUT '/:id', change name and email
    - GET '/:id/edit', shows form to change user info
    - DELETE '/:id', this user completely
    - POST '/city/:id', saves shortcut to city on profile
    - DELETE '/city/:id', this city from user profile (join table)
    - POST '/rest/:id', shows shortcut to restaurants on profile
    - DELETE 'rest/:id', this restaurant from user profile (join table)
- GET '/search', shows all of the globally listed cities
    - GET '/new', form for new city query
- GET '/about', this is a walkthrough of the app of web users
    

## Specs

- Technologies
    - Postgres-SQL
    - Node.js
    - Express
    <!-- MORE -->

- API
    - Zomato's API
        - Found city coordinates from simple text query
        - Then I used the coordinates to get a much more detailed pack of info from Zomato
        - Then used the specifics to find and get restaurants to show their information
    - Pexel's API
        - Takes requested city from search and retrieves first photo for the city's page

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

- Sneaking bits of info into the url as an 'id' but they were used for the next query for the API request as their params.
- Nesting user's restaurants inside of user cities where they belong too.
- Adding Error show pages

## Fix or Add

- 'Find Me' locator, or be able to order and list the cities by states.
- More styling and more main.js

## Start-up Walk-through


- Github
    - First fork your own version on Github
    - Get link for clone from green link on your forked copy of repo
    - In your terminal create a new directory without an existing Github repo
    - "git clone" 'this copied link from Github'
    - "cd" into this directory/repo
- PSQL
    - Enter "psql" from the CML and "CREATE DATABASE" with the exact name from the .env file
    - "\c '.env_DB_NAME'" to get inside of the database
    - "\i db/migrations/ (all five migrations)" to create the data tables for the database
- NPM
    -Once inside this root directory/cloned repo, run "npm install" in your CML
    - This install all need modules to be able to run this application
    - Enter "npm run dev" to start the server
- Web Browser
    - In your browser URL enter in "localhost:3000"
    - ENJOY!
