import os

from dotenv import load_dotenv
from flask import Flask
from flask_restful import reqparse, Api
from flask_cors import CORS

from reduce_foodwaste.models import mongo
from reduce_foodwaste.resources.ingredients import Ingredient, IngredientsCollection
from reduce_foodwaste.resources.users import User, UserCollection
from reduce_foodwaste.resources.recipes import Recipe, RecipeCollection, RecipeSearch
from reduce_foodwaste.resources.images import Image

load_dotenv()

app = Flask(__name__)
CORS(app)

password = os.environ.get("MONGODB_PASSWORD")

app.config["MONGO_DBNAME"] = 'food-waste-database'
app.config["MONGO_URI"] = 'mongodb+srv://root:{}@food-waste-cluster-1n8bd.mongodb.net/food-waste-database?retryWrites=true&w=majority'.format(
    password)

mongo.init_app(app)
api = Api(app)


api.add_resource(IngredientsCollection, '/api/ingredients')
api.add_resource(Ingredient, '/api/ingredients/<ingredient_id>')
api.add_resource(UserCollection, '/api/users')
api.add_resource(User, '/api/users/<user_id>')
api.add_resource(RecipeSearch, '/api/recipes/_search')
api.add_resource(RecipeCollection, '/api/recipes')
api.add_resource(Recipe, '/api/recipes/<recipe_id>')
api.add_resource(Image, '/api/images/<image_id>')










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
