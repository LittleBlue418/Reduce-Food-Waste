import os

from flask import Flask
from flask_restful import reqparse, Api

from db import db
from resources.ingredients import Ingredient, IngredientsCollection
from resources.tags import Tag, TagCollection
from resources.users import User, UserCollection


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL', 'sqlite:///data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app)

api.add_resource(IngredientsCollection, '/ingredients')
api.add_resource(Ingredient, '/ingredients/<ingredient_id>')
api.add_resource(TagCollection, '/tags')
api.add_resource(Tag, '/tags/<tag_id>')
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


db.init_app(app)


@app.before_first_request
def create_tables():
    db.create_all()


app.run(port=5000)
