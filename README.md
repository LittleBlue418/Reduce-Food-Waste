# Reduce Food Waste

This goal of this web app is to reduce the food waste thatg we generate in developed countries, specifically food waste in the home.

Traditionally one would start with a dish idea, find a specific recipe, buy all the ingredients and cooking that dish. The problem is that we often end up with leftovers, half used packets of things that sit in the back of the fridge or cupboard while we guiltilly ignore them.

This app turns that process on it's head. You start with the things you have, the bag of carrots that's looking a bit sad, the half a pot of cream, the packet of flour that's almost at it's best before date, and find recipes where you can use those ingredients. In this way you find new recipes and experiment, while making sure that as little as possible gets thrown away.

***

### Website

[You can view the website here](https://reduce-food-waste-app.herokuapp.com/)

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
* As a logged in I am able to 'favorite' recipes.
* As a logged in user I am able to filter, to view only my favorited recipes.
* As an admin I am able to edit ingredients. 
* As an admin I am able to delete ingredients. 
* As a site owner I am able to display links to my profile / github
* As a site owner i am able to interact with the site as a user and benifit from it as such.
* As a community we are able to use eachother's recipe's to reduce food waste by finding recipes to cook the food that we already have. 


#### Research & Prioritization

Working from the user stories I broke the core concept down into problems to solve. Given the ammount of user stories and the complexity of the idea I wanted to be clear with what my baseline for the project would be. I decided that displaying the recipes, giving advice, and searching were the core features. I also wanted to maKe sure that the search was an inclusive as possible, allowing users to be able to search on ingredients, but also on dietry requirements and preferences. Being able to create an account and being able to add & modify recipes and ingredients were further down the prioritization.

Opportunity / Problem | Importance | Feasibility
----------------------|-------------|----------------------
A - Display All Recipes | 5 | 5
B - Display advice on reducing waste | 5 | 5
C - Build a robust search feature  | 5 | 3
D - CRUD functionality for recipes | 4 | 3
E - CRUD functionality for recipes | 4 | 3
F - A user account / admin system | 2 | 3


![Importance / Feasibility Graph](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/reduce-foodwaste-importance-feasability.png "graph of problems against viability and Importance") 

### Scope

Breaking the scope down it was clear that to build all of it in the time available would leade to some corners cut on quality. I decided to move the account structure (and by extension the admin aspect) to MVP2. Ideally this is something that i will return to at a later stage and fully impliment. As part of this i also decided not to impliment full CRUD functionality for ingredients. Editing and deleting ingredients would be a descrictive process, that would affect the search and the main recipes. A such i decided to impliment the full CRUD functionality for recipes, build the end points for the ingredients but only impliment the create & read. I was still able to fully utilize these end points through the back end using postman.     

#### Core Scope
* A landing page that is also the search page, where the user can see a tip and see all recipes, and can search based on ingredients.
* A 'recipe' page that generates from a template, to display the recipe that the user wants to use.
* A 'create recipe' page that generates from a template, to allow the user to add new recipes to the database.
* An 'edit recipe' page that populates from the chosen recipe, allows the user to update and then saves to database.
* A 'create ingredient' dialogue box with a form to allow users to add new ingredients as they create recipes.
* An about the site info page, breaking down the dietary requirements information. 
* A link to my profile. 

#### MVP2
* A log in page
* A create account page
* Functionality for users and admins 
* Edit & delete functionality for ingredients (for admins).


### Structure

When thinking about the structure for the back end I decided to use MongoDB, a noSQL database. My initial thoughts were to build a series of relational SQL tables, but after working it through it felt like I was making this harder than it had to be. Instead I decided to do the checking and relational work in my back end code. When building a new recipe, I will generate a list of possible ingredients you can add from an ingredients table. This ensures I don't have recipes with ingredients that don't exist in the search, while keeping the database structure simple and easy to manage.

For the front end I decided to use React. The main reason for that decisions was user experience. Rather than creating many pages I wanted to build a single page aplication that would load faster and once loaded be faster for the user to use, reusing all of the components to minimise load times. After working a little with jinja templating I decided to use React instead for several reasons: I personally find it more fun to work with, the components you can build in React allow you to do more than the jija templates giving you more freedome, and React has become an industry standard so by using it I would be adding a sought after skill to my repertoire.

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
Early in the design process I decided I wanted to have a green and white colour scheme, to capitalize on the asociations with green: recycling, nature and freshness. The white is to give the site a clean and minimal feel. The purple of the chips gives a contrast with the green, making them pop. Each colour has a high contrast for optimal visibility. Finally i decided to limmit the pallet to just four colours to really give it a clean and modern feel. 

![Colour Scheme](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/color_scheme.png "colour scheme")

### Design Decisions
Through the wireframing and the build process I toyed back and forth with having the dietry requirements in a collapsable section, as I do with the tips page. On a desktop screen it doesn't make a huge difference but on a mobile it takes a reasonable chunk of the screen. I decided to leave it as a full size feature for two reasons: firstly to make it immediately clear that this site is designed to be as inclusive and accessible as possible, more and more people are choosing to be vegetarian and vegan, and it is important to be aware of people's allergies. Secondly from a design perspective having a second drop down would save a couple of lines of text, but felt like an added thing for the user to click on, adding an 'unnessecary click' for the user. While you may not be interested in reading tips every time you use the site, many people could conceivably have to click open the requirements tab each time.

***

## Features

### Existing Features

* **A robust search landing page** - Front and center of the site, the core feature. Allows users to find recipes by specifying dietry requirements & ingredients from a pre-set list. With no search criteria the site will display all recipes, with each ingredient / requirement added the recipe cards will be filtered down to the search requirements.
* **Individual Recipe page** - Once a recipe has been selected the user will be presented with the page for that recipe. This will clearly lay out the ingredients with the ammounts, and a step by step method. Both sections have a 'tick off' feature to allow the user to track their progrerss through the recipe.
* **Add Recipe** - The user can go to the menu and open the add recipe page. This gives the user a place to upload their own recipes and add them to the database.
* **Add Ingredient** - While adding a new recipe, if the user does not find the ingredient they are looking for they can choose to add an ingredient to the database. This opens a dialogue box where the user inputs the details. 
* **About this site** * - The user can read more information about the dietary requirement symbols, as well as getting general information about the site.

### Features Left To Impliment

* **User Accounts** - Account creation, editing & deletion, logging in and out.
* **User Favorites** - The ability to 'star' favorite recipes and have then displayed in a user favorites page. An alternate form of filtering.
* **Admin** - Designating certain users as 'Admins' to give them access to different parts of the site.
* **Edit & Delete ingredients** - Building front end capability for the edit and delete ingredient end point (for admin users).

***

## Technologies Used

* [HTML](https://en.wikipedia.org/wiki/HTML) - Building the initial index page.
* [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) - Providing styling for the components.
* [JavaScript](https://en.wikipedia.org/wiki/JavaScript) - Adding functionality to the skill circles, as well as 'on click', 'hidden' and 'scroll'.
* [React](https://reactjs.org/) - Front end built using React.
* [Material UI](https://material-ui.com/) - React component library, used to built the ingredient 'chips' and the autofill on the search box & add ingredient search box. Also used for adding a few icons and buttons.
* [React Router](https://reacttraining.com/react-router/) - Used for routing within the pages of the React application.
* [Python](https://www.python.org/) - Back end API is written in python.
* [Pymongo](https://pypi.org/project/pymongo/) - Interacting with the MongoDB database.
* [Flask](https://flask.palletsprojects.com/en/1.1.x/) - Handling requests to the back end.
* [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser.
* [uWSGI](https://uwsgi-docs.readthedocs.io/en/latest/) - HTTP server.  
* [MongoDB](https://www.mongodb.com/) - The database for the app.
* [Heroku](https://www.heroku.com/) - Hosting the app.
* [Adobe XD](https://www.adobe.com/products/xd.html) - Used for designing and hooking up wireframes to make a 'click through' wireframe of the initial design.

### Version control & Hosting
* [git](https://git-scm.com/) - Version controll. 
* [GitHub](https://github.com/) - Host directory. 
* [Heroku](https://www.heroku.com/) - Hosting deploed app. 

***

## Testing
* **Chrome Developer Tools:** Ensure the app is mobile first, but works well on all devices / console tool to identify error, but also conform to best practices and write clean code with react warning messages / Comnponents & Profiler (React tools within the browser) to identify problems, get real time rror feedback and stack tracing.
* **User Testing** * Sending the app to friends & colleges to use, collecting their feedback for bug fixes and adjustments. 
* **Python Unit Testing:** Unit tests written with pytest. 
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

### Code Validation
**[FIX]**


### Known Bugs
**[FIX]**

### Expected Behavior
* Pagination - If you send a get all request to the API it will return the first 'page' of results, but will give ionformation to make it clear that is what is happening.
* Pagination - If you send a get all request to the API with a page number greater than the possible number of pages that can be generated you will get a response with no recipes, but you will see the pagination information to make it clear what is happening.
* It is not possible to edit or delete ingredients from the front end (yet) this is by design as it would be very descructive editing. This will be implimented once i have added the ability to log in, and to set admin users. 
***

## Deployment
This site is currently deployed to Heroku  **[FIX]**
* steps for hosting on heroku

### Live App Link
[Live App](https://reduce-food-waste-app.herokuapp.com/)

### Local Development
To host this site locally, or work on the code yourself, you can clone or download the repository. 
1. You can find the repository page [here](https://github.com/LittleBlue418/Milestone1)
1. Click on the "clone or download" button at the top right
1. Copy the URL
1. Go to your Terminal aplication
 1. `cd` Change the current working directory to the location where you want your clone directory to be made
 1. Type `git clone` and paste in the URL
 1. Press enter
1. The local clone will now be created

You can read more at this [Github help page](https://help.github.com/en/articles/cloning-a-repository)  

***

## Credits / Acknowledgements
* **ART** - The logo & icons for the project were created by [Sofia Persson](https://www.linkedin.com/in/sofia-persson-52a9aa146/?originalSubdomain=se) for this project. [You can find her portfolio here](https://www.sofiapersson.space/)
* **Inspiration** - I was inspired by the Love Food Hate Waste campaign which has been running in the UK, they have a [nice website](https://lovefoodhatewaste.com/), but i was frustraited that there wasn't more focuss on using up so i was inspired to build a site that was focussed around using up food that would go to waste. 
* **User Testing** - Thank you to [Craig Fleming](https://www.linkedin.com/in/craig-fleming-633bb4125/) for your time and feedback with testing the app. 
* **Support** - Thank you most of all to my partner for the support! <3
**[FIX]**


