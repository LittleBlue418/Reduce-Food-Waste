from flask_restful import Resource, reqparse
from flask import request

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
                        action='append',
                        required=True,
                        help="Recipe must have a method")
    parser.add_argument('ingredients',
                        action='append',
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

    def post(self):
        request_data = request.json
        ingredient_info = request_data['ingredients']
        allergies = {
            "vegan": True,
            "vegetarian": True,
            "gluten_free": True,
            "nut_free": True,
            "egg_free": True
        }

        # itterate through the ingedients & check for allergies

        for ingredient in ingredient_info:
            if not RecipesModel.check_vegan(ingredient['ingredient']):
                allergies["vegan"] = False
            if not RecipesModel.check_vegetarian(ingredient['ingredient']):
                allergies["vegetarian"] = False
            if not RecipesModel.check_gluten_free(ingredient['ingredient']):
                allergies["gluten_free"] = False
            if not RecipesModel.check_nut_free(ingredient['ingredient']):
                allergies["nut_free"] = False
            if not RecipesModel.check_egg_free(ingredient['ingredient']):
                allergies["egg_free"] = False

        request_data['allergies'] = allergies

        try:
            mongo.db.recipes.insert_one(request_data)
            return RecipesModel.return_as_object(request_data)
        except:
            return {"message": "An error occurred"}, 500


        if RecipesModel.find_by_name(request_data['name']):
            return {'message': "A recipe with name '{}' already exists".format(request_data['name'])}, 400
        else:
            return 'x'


