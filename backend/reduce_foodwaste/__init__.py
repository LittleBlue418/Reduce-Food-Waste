import os

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_restful import reqparse

from reduce_foodwaste.error_propagating_api import ErrorPropagatingApi
from reduce_foodwaste.models import mongo
from reduce_foodwaste.resources.ingredients import Ingredient, IngredientsCollection
from reduce_foodwaste.resources.recipes import Recipe, RecipeCollection, RecipeSearch
from reduce_foodwaste.resources.images import Image

load_dotenv()

app = Flask(__name__)


app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")

mongo.init_app(app)
api = ErrorPropagatingApi(app)


api.add_resource(IngredientsCollection, '/api/ingredients')
api.add_resource(Ingredient, '/api/ingredients/<ingredient_id>')
api.add_resource(RecipeSearch, '/api/recipes/_search')
api.add_resource(RecipeCollection, '/api/recipes')
api.add_resource(Recipe, '/api/recipes/<recipe_id>')
api.add_resource(Image, '/api/images/<image_id>')


@app.errorhandler(500)
def error_handler(error):
    print(error)
    return jsonify(message="Something went wrong behind the scenes!"), 500



if __name__ == '__main__':
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=True
    )
