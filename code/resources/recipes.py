from flask_restful import Resource, reqparse
from flask import request

from models import mongo, ValidationError
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
                        action='append',
                        required=True,
                        help="Recipe must have a method")
    parser.add_argument('ingredients',
                        action='append',
                        required=True,
                        help="Recipe must have ingredients")

    def get(self, recipe_id):
        recipe = RecipesModel.find_recipe_by_id(recipe_id)

        if recipe is None:
             return {"message": "A recipe with that ID does not exist"}, 404

        return RecipesModel.return_as_object(recipe)


    # def put(self, recipe_id):
    #     request_data = request.json


    #     if RecipesModel.find_recipe_by_id(recipe_id):
    #         modified_recipe = {
    #             'name': request_data['name'],
    #             'description': request_data['description'],
    #             'image': request_data['image'],
    #         }

    #     print(request_data['ingredients'])





class RecipeCollection(Resource):
    def get(self):
        recipes = [
            RecipesModel.return_as_object(recipe)
            for recipe in mongo.db.recipes.find()
        ]

        return {
            'recipes': recipes
        }

    def post(self):
        request_data = request.json

        if RecipesModel.find_by_name(request_data['name']):
           return {'message': "A recipe with name '{}' already exists".format(request_data['name'])}, 400

        try:
            request_data = RecipesModel.build_recipe_from_request(request_data)
        except ValidationError as error:
            return {"message": error.message}, 400

        try:
            mongo.db.recipes.insert_one(request_data)
            return RecipesModel.return_as_object(request_data)
        except:
            return {"message": "An error occurred"}, 500



