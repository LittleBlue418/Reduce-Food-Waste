from flask_restful import Resource, reqparse
from flask import request

from models import mongo, ValidationError
from models.recipes import RecipesModel
from models.images import ImageModel
from pymongo.collection import ObjectId
from pymongo import ASCENDING

from base64 import b64decode

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
        recipe = RecipesModel.find_by_id(recipe_id)

        if recipe is None:
             return {"message": "A recipe with that ID does not exist"}, 404

        return RecipesModel.return_as_object(recipe)


    def put(self, recipe_id):
        request_data = request.json

        old_recipe = RecipesModel.find_by_id(recipe_id)

        if not old_recipe:
            return {"message": "A Recipe with that ID does not exist"}

        try:
            mongo.db.images.remove({"_id": ObjectId(old_recipe['image_id'])})

            updated_recipe = RecipesModel.build_recipe_from_request(request_data)

            image_data = b64decode(request_data['image_data'])
            image_content_type = request_data['image_content_type']
            built_image = ImageModel.build_image(image_data, image_content_type)

            result = mongo.db.images.insert_one(built_image)

            updated_recipe['image_id'] = str(result.inserted_id)

            mongo.db.recipes.update({"_id": ObjectId(recipe_id)}, updated_recipe)

            updated_recipe['_id'] = recipe_id

            return RecipesModel.return_as_object(updated_recipe)

        except ValidationError as error:
            return {"message": error.message}, 400
        except:
            return {"message": "An error occurred saving to database"}, 500


    def delete(self, recipe_id):
        recipe = RecipesModel.find_by_id(recipe_id)
        image_id = recipe['image_id']

        if not recipe:
            return {"message": "A recipe with this name does not exist"}

        mongo.db.recipes.remove({"_id": ObjectId(recipe_id)})
        mongo.db.images.remove({"_id": ObjectId(image_id)})

        return {"message": "Recipe deleted"}, 200




class RecipeCollection(Resource):
    def get(self):
        recipes = [
            RecipesModel.return_as_object(recipe)
            for recipe in mongo.db.recipes.find().sort('name', ASCENDING)
        ]

        return {
            'recipes': recipes
        }

    def post(self):
        request_data = request.json

        if RecipesModel.find_by_name(request_data['name']):
           return {'message': "A recipe with name '{}' already exists".format(request_data['name'])}, 400

        try:
            built_recipe = RecipesModel.build_recipe_from_request(request_data)

            image_data = b64decode(request_data['image_data'])
            image_content_type = request_data['image_content_type']
            built_image = ImageModel.build_image(image_data, image_content_type)

            result = mongo.db.images.insert_one(built_image)

            built_recipe['image_id'] = str(result.inserted_id)

            result = mongo.db.recipes.insert_one(built_recipe)

            built_recipe['_id'] = result.inserted_id

            return RecipesModel.return_as_object(built_recipe)

        except ValidationError as error:
            return {"message": error.message}, 400
        except:
            return {"message": "An error occurred"}, 500

class RecipeSearch(Resource):
    def post(self):
        request_data = request.json

        myquery = {}

        for allergy in request_data.get('allergens', []):
            myquery["allergies." + allergy] = True


        if request_data.get('ingredient_ids'):
            myquery["ingredients"] = {
                "$all" :  [
                    {
                        "$elemMatch": {
                            "ingredient._id": ingredient_id
                        }
                    }
                    for ingredient_id in request_data.get('ingredient_ids', [])
                ]
            }

        recipes = [
            RecipesModel.return_as_object(recipe)
            for recipe in mongo.db.recipes.find(myquery).sort('name', ASCENDING)
        ]

        return {
            'recipes': recipes
        }


