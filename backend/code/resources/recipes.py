from flask_restful import Resource, reqparse
from flask import request
from math import ceil

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
            updated_recipe = RecipesModel.build_recipe_from_request(request_data)

            # If key exists in a dictionary (If new image)
            if 'image_data' in request_data:
                mongo.db.images.remove({"_id": ObjectId(old_recipe['image_id'])})

                image_data = b64decode(request_data['image_data'])
                image_content_type = request_data['image_content_type']
                built_image = ImageModel.build_image(image_data, image_content_type)

                result = mongo.db.images.insert_one(built_image)

                updated_recipe['image_id'] = str(result.inserted_id)
            else:
                # If we want the origional image
                updated_recipe['image_id'] = old_recipe['image_id']

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
    RECIPES_PER_PAGE = 9
    def get(self):
        # PAGINATION - Checking page number is an int (from header)
        try:
            # PAGINATION - value always 1 or higher
            page = max(int(request.args.get('page', 1)), 1)
        except ValueError:
            return {'message': 'must be a whole number'}, 400

        # PAGINATION - calculating skip value (when to start returing recipes from db)
        skip = (page -1) * self.RECIPES_PER_PAGE

        # PAGINATION - Query now uses limit and skip value to return recipes for one page
        query_cursor = mongo.db.recipes.find().sort('name', ASCENDING).limit(self.RECIPES_PER_PAGE).skip(skip)

        # Return all recipes as objects
        recipes = [
            RecipesModel.return_as_object(recipe)
            for recipe in query_cursor
        ]

        # PAGINATION - into about Pagination for front end & API users
        return {
            'recipes': recipes,
            'total_pages': ceil(float(query_cursor.count()) / self.RECIPES_PER_PAGE),
            'current_page': page,
            'items_per_page': self.RECIPES_PER_PAGE
        }

    def post(self):
        request_data = request.json

        if RecipesModel.find_by_name(request_data['name']):
           return {'message': "A recipe with name '{}' already exists".format(request_data['name'])}, 400

        try:
            # Image required when creating a recipe
            if len(request_data["image_data"]) < 1:
                raise ValidationError('Recipe must have an image!')

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
    RECIPES_PER_PAGE = 9
    def post(self):
        # PAGINATION - Checking page number is an int (from header)
        try:
            # PAGINATION - value always 1 or higher
            page = max(int(request.args.get('page', 1)), 1)
        except ValueError:
            return {'message': 'must be a whole number'}, 400

        # PAGINATION - calculating skip value (when to start returing recipes from db)
        skip = (page -1) * self.RECIPES_PER_PAGE

        request_data = request.json

        query = {}

        # Building query - filter on dietary requirements
        for dietary_requirement in request_data.get('dietary_requirements', []):
            query["dietary_requirements." + dietary_requirement] = True

        # Building query - filter on ingredients
        if request_data.get('ingredient_ids'):
            query["ingredients"] = {
                "$all" :  [
                    {
                        "$elemMatch": {
                            "ingredient._id": ingredient_id
                        }
                    }
                    for ingredient_id in request_data.get('ingredient_ids', [])
                ]
            }

        # PAGINATION - Query now uses limit and skip value to return recipes for one page
        query_cursor = mongo.db.recipes.find(query).sort('name', ASCENDING).limit(self.RECIPES_PER_PAGE).skip(skip)

        # Return all recipes as objects
        recipes = [
            RecipesModel.return_as_object(recipe)
            for recipe in query_cursor
        ]

        # PAGINATION - into about Pagination for front end & API users
        return {
            'recipes': recipes,
            'total_pages': ceil(float(query_cursor.count()) / self.RECIPES_PER_PAGE),
            'current_page': page,
            'items_per_page': self.RECIPES_PER_PAGE
        }


