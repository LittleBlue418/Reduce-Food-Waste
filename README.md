# Reduce Food Waste

This goal of this web app is to reduce the food waste thatg we generate in developed countries, specifically food waste in the home.

Traditionally one would start with a dish idea, find a specific recipe, buy all the ingredients and cooking that dish. The problem is that we often end up with leftovers, half used packets of things that sit in the back of the fridge or cupboard while we guiltilly ignore them.

This app turns that process on it's head. You start with the things you have, the bag of carrots that's looking a bit sad, the half a pot of cream, the packet of flour that's almost at it's best before date, and find recipes where you can use those ingredients. In this way you find new recipes and experiment, while making sure that as little as possible gets thrown away.

***

### Website

You can view the website [here](www.google.com) **[FIX]**

***

## UX

### Strategy & Planning
My UX design process focussed on a mobile first design that would present recipes and data in an un-cluttered way. The styling should be consistent across the site, and give a clean and 'on-brand' feel.

### User Stories
* As a user I can view all recipes.
* As a user I can search for recipes using ingredients and dietary requirements.
* As a user I can see advice on reducing food waste.
* As a user I am able to add new recipes to the database
* As a user I am able to edit existing recipes
* As a user I am able to add new ingredients
* As a user I am able to delete recipes
* As a user I am able to create an account.
* As a user I am able to log into my account.
* As a user I am able to delete my account.
* As a user I am able to log out.
* As a user in user I am able to 'favorite' recipes.
* As a user in user I am able to view only my favorited recipes.
* As a site owner I am able to display links to my profile / github
* As a site owner i am able to interact with the site as a user and benifit from it as such.


#### Research & Prioritization

Working from the user stories I broke the core concept down into problems to solve. Given the ammount of user stories and the complexity of the idea I wanted to be clear with what my baseline for the project would be. I decided that displaying the recipes, giving advice, and searching were the core features. I also wanted to maKe sure that the search was an inclusive as possible, allowing users to be able to search on ingredients, but also on dietry requirements and preferences. Being able to create an account and being able to add & modify recipes and ingredients were further down the prioritization.

Opportunity / Problem | Importance | Feasibility
----------------------|-------------|----------------------
A - Display All Recipes | 5 | 5
B - Display advice on reducing waste | 5 | 5
C - Build a robust search feature  | 5 | 3
E - CRUD functionality for recipes & ingredients  | 3 | 3
D - A log in / user account system | 2 | 3


![Importance / Feasibility Graph](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/Reduce_foodwaste_importance_feasability_graph.jpg "graph of problems against viability and Importance") 

### Scope

It was clear that many of the stories I wanted to incorporate could lead to a scope creep, or were themselves outside of the core scope. As such I set the A B & C problems as MVP1, E as MVP2 and D as MVP3. While I may not have the bandwidth to build out all the features right now it's a project that I can come back to and flesh out at a later date.

#### Core Scope
* A landing page that is also the search page, where the user can see a tip and see all recipes, and can search based on ingredients.
* A 'recipe' page that generates from a template, to display the recipe that the user wants to use.

#### MVP2
* A page for adding new recipes
* The ability to update existing recipes
* The ability to add ingredients
* A full list of ingredients, with the ability to edit/delete them in list.

#### MVP3
* A log in page
* A create account page
* A function on each recipe to allow it to be 'favorited'
* A user home page displaying the users favorite recipes and options to change their account


### Structure

When thinking about the structure for the back end I decided to use MongoDB, a noSQL database. My initial thoughts were to build a series of relational SQL tables, but after working it through it felt like I was making this harder than it had to be. Instead I decided to do the checking and relational work in my back end code. This was particularly important as the adding and editing of recipes, which would be one of the main arguments for uing a relational database, was not MVP1. Instead, when building a new recipe, I will generate a list of possible ingredients you can add from an ingredients table. This ensures I don't have recipes with ingredients that don't exist in the search, while keeping the database structure simple and easy to manage.

For the front end I decided to use React. The main reason for that decisions was user experience. Rather than creating many pages I wanted to build a single page aplication that would be faster for the user to use, reusing all of the components to minimise load times. After working a little with jinja templating I decided to use React instead for several reasons: I personally find it more fun to work with, the components you can build in React allow you to do more than the jija templates giving you more freedome, and React has become an industry standard so by using it i would be adding a sought after skill to my repertoire.

After working through the layout in the wireframes I realized I also wanted to use Material UI components for components like the ingredient 'chips' and the autofill on the search bar. As a library it's easy to use, and provides some great 'baked in' functionality.

### Skeleton

Building the wireframes for the project was straightforward, I planned out the look and feel for mobile and the desktop. I wanted to keep it looking clean and uncluttered so I went with a minimalistic design. As I worked through the wireframes I realized I wanted to use Maretial UI components. The origional files were built with Adobe Xd, which allowed me to 'click through' the pages as i would on a website.

### Wireframes
- [Mobile Wireframe - AdobeXD document](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/reduce-foodwaste-wireframe-mobile.xd) 
- [Mobile Wireframe - pdf](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/reduce-foodwaste-wireframe-mobile.pdf)
- [Desktop Wireframe - AdobeXD document](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/reduce-foodwaste-wireframe-desktop.xd)
- [Desktop Wireframe - pdf](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/reduce-foodwaste-wireframe-desktop.pdf)

### Database Schema
- [Initial SQL database scheme - NOT USED](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/rfw-SQL-design.pdf)
- [MongoDB database scheme](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/rfw-MongoDB-design.pdf)

### Surface
Early in the design process I decided I wanted to have a green and white colour scheme, to capitalize on the asociations with green: recycling, nature and freshness. The white is to give the site a clean and minimal feel. The purple of the chips gives a contrast with the green, making them pop.  **[FIX]**

### Design Decisions
Through the wireframing and the build process I toyed back and forth with having the dietry requirements collapsable as I do with the tips page. On a desktop screen it doesn't make a huge difference but on a mobile it takes a reasonable chunk of the screen. I decided to leave it as a full size feature for two reasons: firstly to make it immediately clear that this site is designed to be as inclusive and accessible as possible, more and more people are choosing to be vegetarian and vegan, and it is important to be aware of people's allergies. Secondly from a design perspective having a second drop down would save two lines of text, but felt like an added thing for the user to click on, adding an 'unnessecary click' for the user. While you may not be interested in reading tips every time you use the site, many people could conceivably have to click open the requirements tab each time.

I chose to put the error message for adding a picture to the main body of the build_recipe_from_request function to ensure that the error would appear for the user in the most logical order (after the description and before the ingredients). It would me more logical from a code perspective to have this error where it is calculated, but doing that means that the error for lack of picture is shown after the user has reached the bottom of the page and triggered all of the other errors.

***

## Features

### Existing Features

* **A robust search landing page** - Front and center of the site, the core feature. Allows users to find recipes by specifying dietry requirements & ingredients from a pre-set list. With no search criteria the site will display all recipes, with each ingredient / requirement added the recipe cards will be filtered down to the search requirements.
* **Individual Recipe page** - Once a recipe has been selected the user will be presented with the page for that recipe. This will clearly lay out the ingredients with the ammounts, and a step by step method. Both sections have a 'tick off' feature to allow the user to track their progrerss through the recipe.
* **Add Recipe** - The user cna go to the menu and open the add recipe page. This gives the user a place to upload their own recipes and add them to the database.

### Features Left To Impliment

* **User Accounts** - Account creation, editing & deletion, logging in and out.
* **User Favorites** - The ability to 'star' favorite recipes and have then displayed in a user favorites page. An alternate form of filtering.
* **Admin** - Designating certain users as 'Admins' to give them access to different parts of the site.
* **Interacting with the database** - Changing the add recipe page to be an admin feature. The ability to add / edit / delete ingredients and recipes.

***

## Technologies Used

* [HTML](https://en.wikipedia.org/wiki/HTML) - Building the initial index page.
* [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) - Providing styling for the components.
* [JavaScript](https://en.wikipedia.org/wiki/JavaScript) - Adding functionality to the skill circles, as well as 'on click', 'hidden' and 'scroll'.
* [React](https://reactjs.org/) - Front end built using React.
* [Material UI](https://material-ui.com/) - React component library, used to built the ingredient 'chips' and the autofill on the search box & add ingredient search box. Also used for adding a few icons and buttons.
* [React Router](https://reacttraining.com/react-router/) - Used for routing within the pages of the React application.
* [Python](https://www.python.org/) - Back end API is written in python.
* [Flask](https://flask.palletsprojects.com/en/1.1.x/) - Handling requests to the back end.
* [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser.
* [MongoDB](https://www.mongodb.com/) - The database for the app.
* [Heroku](https://www.heroku.com/) - Hosting the app.
* [Adobe XD](https://www.adobe.com/products/xd.html) - Used for designing and hooking up wireframes to make a 'click through' wireframe of the initial design.

***

## Testing
* **Chrome Developer Tools:** Ensure the app is mobile first, but works well on all devices / console tool to identify error, but also conform to best practices and write clean code with react warning messages / Comnponents & Profiler (React tools within the browser) to identify problems, get real time rror feedback and stack tracing.
* **Pythion Unit Testing:** **[FIX]**
* **React Unit Testing:** **[FIX]**

### User Story Testing
- User opens app / nagivates to home page
    - User immediately sees the first page of recipes and can scroll down and click through to load the next page of recipes.
    - User can click on an allogen or a dietary preference to imediately filter search results.
    - User can input any number of ingredients (that exist in the database) to filter results by those specific ingredients.
    - User can filter on both allogens and ingredients.
    - User can easilly un-tick allogens and remove ingredient chips to widen the search again.
- User selectes a recipe and clicks on it
    - User immediately sees the full recipe with information laid out.
    - User can 'tick off' ingredients as they are used (or added to a shopping list)
    - User can 'tick off' steps in the method as they complete them.
    - User can navigate back to their search, where their initial search parametors will still be avtive.
- User can toggle the menu
    - User can navigate to the add recipe page
- User can add a recipe to the database easilly, confident that it will appear correctly.

### Known Bugs
* Less of a bug and more of a lack of feature - If you want to add a new recipe to the database you can currently only add recipes as long as the ingredients are already in the database. The solve for this would be to impliment the 'add ingredient' feature.

### Expected Behavior
* Pagination - If you send a get all request to the API it will return the first 'page' of results, but will give ionformation to make it clear that is what is happening.
* Pagination - If you send a get all request to the API with a page number greater than the possible number of pages that can be generated you will get a response with no recipes, but you will see the pagination information to make it clear what is happening.

***

## Deployment
This site is currently deployed to Heroku  **[FIX]**
* steps for hosting on heroku

### Live App Link
**[LINK HERE]**

###


