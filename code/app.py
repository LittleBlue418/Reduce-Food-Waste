import os

from dotenv import load_dotenv
from flask import Flask
from flask_restful import reqparse, Api
from flask_pymongo import PyMongo

from resources.ingredients import Ingredient, IngredientsCollection
from resources.users import User, UserCollection

load_dotenv()

app = Flask(__name__)

password = os.environ.get("MONGODB_PASSWORD")

app.config["MONGO_DBNAME"] = 'food-waste-database'
app.config["MONGO_URI"] = 'mongodb+srv://root:{}@food-waste-cluster-1n8bd.mongodb.net/food-waste-database?retryWrites=true&w=majority'.format(
    password)

mongo = PyMongo(app)
api = Api(app)

api.add_resource(IngredientsCollection, '/ingredients')
api.add_resource(Ingredient, '/ingredients/<ingredient_id>')
api.add_resource(UserCollection, '/users')
api.add_resource(User, '/users/<user_id>')

# RECIPIES END POINTS


@app.route('/recipes', methods=['GET'])
def list_all_recipes():
    return "All recipes"


@app.route('/recipes/<recipe>', methods=['GET'])
def fetch_recipe(recipe):
    return "Returns requested recipe"


@app.route('/recipes', methods=['POST'])
def add_new_recipe():
    return "Add new recipe"


@app.route('/recipes/<recipe>', methods=['PUT'])
def edit_existing_recipe(recipe):
    return "Edit specified recipe"


@app.route('/recipes/<recipe>', methods=['DELETE'])
def delete_recipe(recipe):
    return "Delete specified recipe"




# LOGIN ENDPOINTS

@app.route('/login', methods=['POST'])
def log_in():
    return "Logged in"


@app.route('/logout', methods=['GET'])
def log_out():
    return "Logged out"


# FAVORITE END POINTS

@app.route('/favorites', methods=['GET'])
def list_user_favorites():
    return "All user favorites"


@app.route('/favorites', methods=['POST'])
def add_user_favorite():
    return "User favorite added"


@app.route('/favorites/<favorite>', methods=['DELETE'])
def delete_user_favorite(favorite):
    return "User favorite deleted"



if __name__ == '__main__':
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=True
    )
