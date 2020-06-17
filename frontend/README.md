# Reduce Food Waste

This goal of this web app is to reduce the food waste thatg we generate in developed countries, specifically food waste in the home.

Traditionally one would start with a dish idea, find a specific recipe, buy all the ingredients and cooking that dish. The problem is that we often end up with leftovers, half used packets of things that sit in the back of the fridge or cupboard while we guiltilly ignore them.

This app turns that process on it's head. You start with the things you have, the bag of carrots that's looking a bit sad, the half a pot of cream, the packet of flour that's almost at it's best before date, and find recipes where you can use those ingredients. In this way you find new recipes and experiment, while making sure that as little as possible gets thrown away.

***

### Website

You can view the website [here](www.google.com)

***

## UX

### Strategy & Planning
My UX design process focussed on a mobile first design that would present recipes and data in an un-cluttered way. The styling should be consistent across the site, and give a clean and 'on-brand' feel.

### User Stories
* As a user i can view all recipes.
* As a user i can search for recipes using ingredients and dietary requirements.
* As a user i can see advice on reducing food waste.
* As a user i am able to create an account.
* As a user i am able to log into my account.
* As a user i am able to delete my account.
* As a user i am able to log out.
* As a logged in user i am able to 'favorite' recipes.
* As a logged in user i am able to view only my favorited recipes.
* As an admin i am able to add new recipes to the database
* As an admin i am able to edit existing recipes
* As an admin i am able to add new ingredients
* As an admin i am able to delete recipes

#### Research & Prioritization

Working from the user stories i broke the core concept down into problems to solve. Given the ammount of user stories and the complexity of the idea i wanted to be clear with what my baseline for the project would be. I decided that displaying the recipes, giving advice, and searching were the core features. I also wanted to mkae sure that the search was an inclusive as possible, allowing users to be able to search on ingredients, but also on dietry requirements and preferences. Being able to create an account and being able to add & modify recipes and ingredients were further down the prioritization.

Opportunity / Problem | Importance | Feasibility
----------------------|-------------|----------------------
A - Display All Recipes | 5 | 5
B - Display advice on reducing waste | 5 | 5
C - Build a robust search feature  | 5 | 3
D - A log in / user account system | 3 | 3
E - Editing / adding recipes & ingredients | 2 | 3

PICTURE HERE ![Importance / Feasibility Graph]('assets/documentation/pic' "graph of problems against viability and Importance")

### Scope

It was clear that many of the stories i wanted to incorporate could lead to a scope creep, or were themselves outside of the core scope. As such I set the A B & C problems as MVP1, D as MVP2 and E as MVP3. While i may not have the bandwidth to build out all the features right now it's a project that i can come back to and flesh out at a later date.

#### Core Scope
* A landing page that is also the search page, where the user can see a tip and see all recipes, and can search based on ingredients.
* A 'recipe' page that generates from a template, to display the recipe that the user wants to use.

#### MVP2
* A log in page
* A create account page
* A function on each recipe to allow it to be 'favorited'
* A user home page displaying the users favorite recipes and options to change their account

#### MVP3
* A page for adding new recipes
* The ability to update existing recipes
* A full list of ingredients, with the ability to edit/delete them in list.
* The ability to add ingredients


### Structure

When thinking about the structure for the back end i decided to use MongoDB and a noSQL database. My initial thoughts were to build a series of relational SQL tables, but after working it through it felt like i was making this harder than it had to be. Instead i decided to do the checking and relational work in my code. This was particularly important as the adding and editing of recipes, which would be one of the main arguments for uing a relational database, was MVP3. Instead, when building a new recipe, i will generate a list of possible ingredients you can add from an ingredients table. This ensures i don't have floating ingredients, or recipes with ingredients that don't exist, while keeping the database structure simple and easy to manage.

For the front end i decided to use React. The main reason for that decisions was user experience, rather than creating many pages i wanted to build a single page aplication that would be faster for the user to use, reusing all of the components. After working a little with jinja i decided to use React instead for several reasons: I personally find it more fun to work with, the components you can build in React allow you to do more than the jija templates giving you more freedome, and React has become an industry standard.

After working through the layout in the wireframes i realized i also wanted to use Material UI components for components like the ingredient 'chips' and the autofill on the search bar.

### Skeleton

Building the wireframes for the project was straightforward, i planned out the look and feel for mobile and the desktop. I wanted to keep it looking clean and uncluttered so i went with a minimalistic design. As i worked through the wireframes i realized i wanted to use Maretial UI components.

##### Wireframes


### Surface
Early in the design process i decided i wanted to have a green and white colour scheme, to capitalize on the asociations with green: recycling, nature and freshness. The white is to give the site a clean feel. The purple of the chips gives a contrast with the green, making them pop.


### Design Decisons
Through the wireframing and the build process i toyed back and forth with having the dietry requirements hidden as i do with the tips page. On a desktop screen it doesn't make a huge difference but on a mobile it takes a reasonable chunk of the screen. I decided to leave it as a full size feature for two reasons: firstly to make it immediately clear that this site is designed to be as inclusive and accessible as possible, more and more people are choosing to be vegetarian and vegan, and it is important to be aware of people's allergies. Secondly from a design perspective having a second drop down would save two lines of text, but felt like an added thing for the user to click on. While you may not be interested in reading tips every time you use the site, many people could conceivably have to click open the requirements tab each time.

***

## Features

### Existing Features

* **A robust search landing page** - Front and center of the site, the core feature. Allows users to find recipes by specifying dietry requirements & ingredients from a pre-set list. With no search criteria the site will display all recipes, with each ingredient / requirement added the recipe cards will be filtered down to the search requirements.
* **A Recipe page** - Once a recipe has been selected the user will be presented with the recipe page. This will clearly lay out the ingredients with the ammounts, and a step by step method where the uder can 'cross off' sections they have done to clearly show their progress.

### Features Left To Impliment

* **User Accounts** - Account creation, editing & deletion, logging in and out.
* **User Favorites** - The ability to 'star' favorite recipes and have then displayed in a user favorites page. An alternate form of filtering.
* **Admin** - Designating certain users as 'Admins' to give them access to different parts of the site.
* **Interacting with the database** - For admin users. The ability to add / edit / delete ingredients and recipes.

***

## Technologies Used
* [HTML](https://en.wikipedia.org/wiki/HTML) - Building the initial index page.
* [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) - Providing styling for the components.
* [JavaScript](https://en.wikipedia.org/wiki/JavaScript) - Adding functionality to the skill circles, as well as 'on click', 'hidden' and 'scroll'.







***

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
