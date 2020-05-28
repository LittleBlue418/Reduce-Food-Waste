from flask_restful import Resource, reqparse

from models import mongo
from models.recipes import RecipesModel

class Recipe(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="Recipe must have a name")
    parser.add_argument('description',
                        type=str,
                        required=True,
                        help="Recipe must have a description")
    parser.add_argument('image',
                        type=str,
                        required=True,
                        help="Recipe must have a image")
    parser.add_argument('method',
                        type=list,
                        required=True,
                        help="Recipe must have a method")
    parser.add_argument('ingredients',
                        type=list,
                        required=True,
                        help="Recipe must have ingredients")



class RecipeCollection(Resource):
    def get(self):
        recipes = [
            RecipesModel.return_as_object(recipe)
            for recipe in mongo.db.recipes.find()
        ]

        return {
            'recipes': recipes
        }

