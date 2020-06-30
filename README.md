# Reduce Food Waste

The goal of this app is to allow users to search for recipes based on the ingredients that they already have, helping them to reduce the amount of food that they throw away. 

On a normal recipe website you would search for a specific dish, for example omelet, and the recipe would tell you the ingredients you need to buy. You then buy those ingredients and make the dish, often finding that you have ingredients left over. Here the idea is to search on things that you have in your fridge, for example carrots and onions, and see things that you can make that include those like vegetable soup. 

I wanted to focus on the idea of 'using up' ingredients as part of the wider concern about food waste contributing to climate change. In developed countries we throw away on average 100kg of food per person per year. Using this site won't fix that, but it might help inspire people to try new recipes and use up things that would otherwise be destined for the bin.  


***

### Website

You can view the website [here](https://reduce-food-waste-app.herokuapp.com/)

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
* As a community we are able to use eachother's recipe's to reduce food waste by finding recipes to cook the food that we already have.


#### Research & Prioritization

Working from the user stories I broke the core concepts down into problems to solve. Given the amount of user stories and the complexity of the idea I wanted to be clear with what my baseline for the project would be. I decided that having the ability to log in and to have users and admins would be something that was nice to have, but wasn't part of the core scope. This decision also meant that being able to 'favorite' recipes moved to MVP2, and shaped the database design (see the Structure section for more information). Displaying the recipes, showing tips, and searching for recipes based on ingredients and dietary requirements were the core features.



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

MVP1 scope was clear, full CRUD functionality for recipes and a robust search that allowed filtering on ingredients and dietary requirements. I prioritized searching on both ingredients and dietary requirements to make the site as inclusive as possible. Given that my motivation was to be 'green' and help lessen our impact on the environment it felt very logical to include vegan and vegetarian filters. As someone who struggles to find recipes that meet my own allergy needs I also wanted to have dietary requirements included. I decided that an 'about' page would also be in scope, talking about how to use the site and breaking down the dietary requirement symbols in a key. 

As part of the edit recipes functionality it was clear that I needed users to be able to create new ingredients, otherwise they would be restricted to adding recipes that had ingredients already in the database. Similarly I needed to be able to read all ingredients from the database to construct the search query and to display them for users to add them to new recipes. I would build all of the CRUD end points for ingredients in the backend, but I decided that implementing 'delete' and 'edit' for the frontend would be part of MVP2. The primary reason for this is that to correct a spelling mistake in an ingredient title would have little consequence, but a user could edit an ingredient to be something completely different (changing a carrot to a sausage for example) and thus completely changing existing recipes. Edit and delete ingredients are end points that I will implement for the frontend but they will be accessible to admin users only, since I had decided to make the account system MVP2 implementing these needed to be MVP2 as well. 


#### Core Scope
* A landing page that is also the search page, where the user can see a tip and see all recipes, and can search based on ingredients and dietary requirements.
* A 'recipe' page that displays the recipe that the user wants to use.
* A 'create recipe' page that allows the user to add new recipes to the database.
* An 'edit recipe' page that allows the user to update and then saves to database.
* A 'create ingredient' dialogue box with a form to allow users to add new ingredients as they create recipes.
* An about the site info page, that explains how to use the site and the dietary requirement symbols.
* A link to my profile.

#### MVP2
* A log in page
* A create account page
* Functionality for users and admins
* Ability for users to favorite recipes
* Edit & delete functionality for ingredients (for admins).


### Structure

#### Backend 
My initial plan for the backend structure was to use an SQL database, the reasoning being that the recipes and the ingredients clearly had relational elements that mapped well into a relational database. After working on the designs I realized that I would actually be better off using a NoSQL database like MongoDB for two reasons. Firstly it would make constructing the search query much simpler, and secondly it would allow me to use complex nested structure documents. 

When constructing the database I optimized it in two key ways. Firstly I chose to store both the ingredient ID and the name of the ingredient within the recipe document, this minimised the number of search queries to the database and made loading recipes faster. Secondly, when creating or updating a recipe I pre-calculate the dietary requirements and saved them to the recipe. This also helps me minimize calls to the database, and makes constructing the search query in my backend code much simpler.  

The final database structural decision was in how I handle the update endpoints. For Ingredient and Recipe the whole document is overwritten in the database, rather than single calls updating individual fields. I knew that I didn't want to do this for images though, since they are much larger than a few lines of data. instead I have a check, and if the image has not changed it is not touched.

#### Frontend

For the front end I decided to use React. The main reason for that decision was user experience. Rather than creating many pages I wanted to build a single page application that would load faster and once loaded be faster for the user to use, reusing all of the components to minimise load times. After working a little with jinja templating I decided to use React instead for several reasons: I personally find it more fun to work with, the components you can build in React allow you to do more than the jija templates giving you more freedom, and React has become an industry standard so by using it I would be adding a sought after skill to my repertoire.

Considering what I hoped to achieve with the search query, auto filling from a list of ingredients and then displaying the selected as styled 'chips' the use of MaterialUI as a library seemed a logical choice. The autocomplete feature in particular was a great component to have access to. Furthermore, since it's based on Google's Material Design framework I knew that it would both provide a well developed set of components, but also provide a familiar feel for the user (being the framework many android apps are built in). 

I also decided that I wanted to use a pagination system. Although 'on build' the site would be populated with a small handful of recipes the idea is for it to grow over time. From a user perspective having an endless scroll of recipes would not be ideal! I decided to hard code the number of recipes displayed on a page to 10, that number fit into two columns of five on a tablet device while not being too many to reasonably scroll through on a mobile. One possible future exploration could be to look into responsive pagination, generating the number of cards per page based on the device width.   



### Skeleton

Building the wireframes for the project was straightforward, I planned out the look and feel for mobile and the desktop. I wanted to keep it looking clean and uncluttered so I went with a minimalistic design. The origional files were built with Adobe Xd, which allowed me to 'click through' the pages as I would on a website.

### Wireframes
- [Mobile Wireframe - AdobeXD document](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/reduce-foodwaste-wireframe-mobile.xd)
- [Mobile Wireframe - pdf](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/reduce-foodwaste-wireframe-mobile.pdf)
- [Desktop Wireframe - AdobeXD document](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/reduce-foodwaste-wireframe-desktop.xd)
- [Desktop Wireframe - pdf](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/reduce-foodwaste-wireframe-desktop.pdf)

### Database Schema
- [Initial SQL database scheme - NOT USED](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/rfw-SQL-design.pdf)
- [MongoDB database scheme](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/rfw-MongoDB-design.pdf)



### Surface
Early in the design process I decided I wanted to have a green and white colour scheme, to capitalize on the asociations with green: recycling, nature and freshness. The white is to give the site a clean and minimal feel. The purple of the chips gives a contrast with the green, making them pop. Each colour has a high contrast for optimal visibility. Finally I decided to limit the pallet to just four colours to really give it a clean and modern feel.

![Colour Scheme](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/color_scheme.png "colour scheme")

### Design Decisions
Through the wireframing and the build process I toyed back and forth with having the dietary requirements in a collapsable section, as I do with the tips page. On a desktop screen it doesn't make a huge difference but on a mobile it takes a reasonable chunk of the screen. I decided to leave it as a full size feature for two reasons: firstly to make it immediately clear that this site is designed to be as inclusive and accessible as possible, more and more people are choosing to be vegetarian and vegan, and it is important to be aware of people's allergies. Secondly from a design perspective having a second drop down would save a couple of lines of text, but felt like an added thing for the user to click on, adding an 'unnessecary click' for the user. While you may not be interested in reading tips every time you use the site, many people could conceivably have to click open the requirements tab each time.

***

## Features

### Existing Features

* **A robust search landing page** - Front and center of the site, the core feature. Allows users to find recipes by specifying dietary requirements & ingredients from a pre-set list. With no search criteria the site will display all recipes, with each ingredient / requirement added the recipe cards will be filtered down to the search requirements.
* **Individual Recipe page** - Once a recipe has been selected the user will be presented with the page for that recipe. This will clearly lay out the ingredients with the amounts, and a step by step method. Both sections have a 'tick off' feature to allow the user to track their progrerss through the recipe.
* **Add Recipe** - The user can go to the menu and open the add recipe page. This gives the user a place to upload their own recipes and add them to the database.
* **Add Ingredient** - While adding a new recipe, if the user does not find the ingredient they are looking for they can choose to add an ingredient to the database. This opens a dialogue box where the user inputs the details.
* **About this site** - The user can read more information about the dietary requirement symbols, as well as getting general information about the site.

### Features Left To Impliment

* **User Accounts** - Account creation, editing & deletion, logging in and out.
* **User Favorites** - The ability to 'star' favorite recipes and have then displayed in a user favorites page. An alternate form of filtering.
* **Admin** - Designating certain users as 'Admins' to give them access to different parts of the site.
* **Edit & Delete ingredients** - Building frontend capability for the edit and delete ingredient end point (for admin users).

***

## Technologies Used

### Frontend

I built the frontend in a React framework using JavsScript, CSS and HTML. I use some Material UI components and icons throughout the project. I use React Router to allow multiple pages in a single page app, and I use axios as a http client for communicating with the backend. I use ESlint for validating JavaScript & React code, and Jest for writing unit tests. 

* [HTML](https://en.wikipedia.org/wiki/HTML)
* [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
* [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
* [React](https://reactjs.org/)
* [Material UI](https://material-ui.com/)
* [React Router](https://reacttraining.com/react-router/)
* [Axios](https://github.com/axios/axios)
* [ESlint](https://eslint.org/)
* [Jest](https://jestjs.io/)

### Backend

The backend is built using python based framework flask and the extension flask restful. It uses a MongoDB database as it's datastore, and pymongo to interact with that database. Finally I am using pytest & mongomock for backend unit testing. 

* [Python](https://www.python.org/)
* [Pymongo](https://pypi.org/project/pymongo/)
* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [Flask RESTful](https://flask-restful.readthedocs.io/en/latest/)
* [MongoDB](https://www.mongodb.com/)
* [pytest](https://docs.pytest.org/en/latest/)
* [mongomock](https://github.com/mongomock/mongomock)

### Deployment

I serve both frontend and backend using uWSGI, all packaged into a single docker image. I deploy this docker image on Heroku.   

* [uWSGI](https://uwsgi-docs.readthedocs.io/en/latest/)
* [Docker](https://www.docker.com/)
* [Heroku](https://www.heroku.com/)

### Version Control

* [git](https://git-scm.com/) - Version controll.
* [GitHub](https://github.com/) - Host directory.


***

## Testing

### Chrome Developer Tools
 Ensure the app is mobile first, but works well on all devices / console tool to identify error, but also conform to best practices and write clean code with react warning messages / Components & Profiler (React tools within the browser) to identify problems, get real time error feedback and stack tracing.

### User Testing
Sending the app to friends & colleges to use, collecting their feedback for bug fixes and adjustments. A key peice of feedback was to make it clearer that there was an expectation on the user to tick the dietary requirements boxes upon adding a new ingredient. As such I added a title and piece of text to indicate that this was a required step.

### Python Unit Testing
I wrote unit tests for the backend using pytest & mongomock. The tests check the helper functions on the models to ensure that the correct data is being handled and retruned in the correct format.


### React Unit Testing
I used Jest to write unit tests for the React frontend. On a high level I test that the App loads correctly, and for stand alone functions like the utility functions I check that they handle data in the intended way, and return the expected data.

### User Story Testing

Read the full user story testing [here](https://github.com/LittleBlue418/Reduce-Food-Waste/blob/master/frontend/src/assets/documentation/user-story-testing.pdf)

### Code Validation
The code has been validated with ESlint, as well as the online code validators [W3C CSS](https://jigsaw.w3.org/css-validator/) and [W3C Markup Service](https://validator.w3.org/#validate_by_uri).


### Known Bugs
It is currently possible to use the edit ingredient endpoint to change the name of an ingredient to one that already exists, thus creating a duplicate. Currently this endpoint is not exposed to the frontend, but it is something that I will fix in MVP2.

### Expected Behavior
* Pagination - If you send a get all request to the API it will return the first 'page' of results, but will give information to make it clear that is what is happening.
* Pagination - If you send a get all request to the API with a page number greater than the possible number of pages that can be generated you will get a response with no recipes, but you will see the pagination information to make it clear what is happening.
* It is not possible to edit or delete ingredients from the front end (yet) this is by design as it would be potentially descructive editing. This will be implimented once I have added the ability to log in, and to set admin users (see write up in structure section).

***

## Deployment

### Setting up a MongoDB Database
- Set up a mongoDB database.
- Create three collections in it: `recipes`, `ingredients`, `images`.

### Local Development - Backend
- Clone this directory to your local computer.
- Create a virtual enviroment
`virtualenv venv`.
- Activate the virtual environment `source venv/bin/activate`.
- Change to the backend folder `cd backend`.
- Do a pip install for all dependancies & dev dependancies, linking to your. live code `pip install -e .[dev]`.
- Create a `.env` file with the following content
  ```
  MONGO_URI="$MONGO_URI"
  ```
  where `$MONGO_URI` is the URI to your database.
- Run the backend `flask run --reload`.
- Leave this terminal window open and running.

### Local Development - Frontend
- Open a second terminal window.
- Change to your front end directory `cd frontend`.
- Install all dependancies `npm install`.
- Start the frontend `npm start`.


### Deploy to Heroku
These instructions assume that you have a github account and a Heroku account, and have set up the Heroku CLI on your computer.
- Clone this git repository to your own github account
- Run the following commands
  ```bash
  heroku apps:create $APP_NAME --region eu
  heroku stack:set container -a $APP_NAME
  heroku config:set -a $APP_NAME MONGO_URI="$MONGO_DB_URI"
  ```
  where `$APP_NAME` is the name of your Heroku app, and `$MONGO_DB_URI` is
  your MongoDB
- On the Heroku website, in your new app, connect to your github
- Select the repo you have cloned
- On the deploy tab manually deploy

### App Link
you can find the app deployed at [this link](https://reduce-food-waste-app.herokuapp.com/)



***

## Credits

### Code
- The code for the image uploader was inspired by [this article](https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/)
- I had help building the Docker image and configuring uWSGI from my partner.

### Media & Content
- The text for the recipes was written by me
- The logo & icons for the project were created by [Sofia Persson](https://www.sofiapersson.space/) for this project.
- Food Photographs - At time of site publishing:
    - Potato Salad - Image by <a href="https://pixabay.com/users/cokolatetnica-6262510/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2678536">cokolatetnica</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2678536">Pixabay</a>
    - Banana Bread - Image by <a href="https://pixabay.com/users/greleht-5168740/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2459926">greleht</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2459926">Pixabay</a>
    - French Toast - Image by <a href="https://pixabay.com/users/annaj-94790/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=995532">annaj</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=995532">Pixabay</a>
    - Nasi Goreng - Image by <a href="https://pixabay.com/users/ratreeratsajj1-6496851/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2837771">Ratreerat Sajjapattarakul</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2837771">Pixabay</a>
    - Tomato Salad - Image by <a href="https://pixabay.com/users/RitaE-19628/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1207570">RitaE</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1207570">Pixabay</a>
    - Omelet - Image by <a href="https://pixabay.com/users/nemoelguedes-796029/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=775746">Nemoel Nemo</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=775746">Pixabay</a>
    - Risotto - Image by <a href="https://pixabay.com/users/Simone_ph-3320615/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1823664">Simone_ph</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1823664">Pixabay</a>
    - Flapjack - <span>Photo by <a href="https://unsplash.com/@stri_khedonia?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Alice Pasqual</a> on <a href="/s/photos/flapjack?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
    - Poke bowl - <span>Photo by <a href="https://unsplash.com/@jonathanborba?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jonathan Borba</a> on <a href="/s/photos/poke?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
    - Soup - <span>Photo by <a href="https://unsplash.com/@tinagraphy?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Tina Vanhove</a> on <a href="/s/photos/vegetable-soup?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
    - Green curry - Image by <a href="https://pixabay.com/users/Huahom-2139128/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2457236">Huahom</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2457236">Pixabay</a>
- The data on food waste came from [wikipedia](https://en.wikipedia.org/wiki/Food_waste)

### Acknowledgements
- I was inspired by the website for the [Love Food Hate Waste](https://lovefoodhatewaste.com/) campaign which has been running in the UK. Their website was a jumping off point, but I knew I wanted to build something centered around a search that included multiple ingredients and dietary filters. 



