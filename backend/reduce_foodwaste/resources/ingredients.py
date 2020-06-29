from flask_restful import Resource, reqparse
from pymongo import ASCENDING
from pymongo.collection import ObjectId

from reduce_foodwaste.models import mongo, ValidationError

from reduce_foodwaste.models.ingredients import IngredientsModel
from reduce_foodwaste.models.recipes import RecipesModel


class Ingredient(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="Ingredient must have a name"
                        )
    parser.add_argument('vegan',
                        type=bool,
                        required=True,
                        help="You must specify whether the ingredient is vegan"
                        )
    parser.add_argument('vegetarian',
                        type=bool,
                        required=True,
                        help="You must specify whether the ingredient is vegetarian"
                        )
    parser.add_argument('gluten_free',
                        type=bool,
                        required=True,
                        help="You must specify whether the ingredient is gluten_free"
                        )
    parser.add_argument('lactose_free',
                        type=bool,
                        required=True,
                        help="You must specify whether the ingredient is lactose_free"
                        )
    parser.add_argument('nut_free',
                        type=bool,
                        required=True,
                        help="You must specify whether the ingredient is nut_free"
                        )
    parser.add_argument('egg_free',
                        type=bool,
                        required=True,
                        help="You must specify whether the ingredient is egg_free"
                        )


    def get(self, ingredient_id):
        ingredient = IngredientsModel.find_by_id(ingredient_id)

        if ingredient is None:
             return {"message": "An ingredient with that ID does not exist"}, 404

        return IngredientsModel.return_as_object(ingredient)


    def put(self, ingredient_id):
        # FIX
        request_data = Ingredient.parser.parse_args()

        if not IngredientsModel.find_by_id(ingredient_id):
            return {"message": "An ingredient with that ID does not exist"}, 404

        try:
            # Transaction
            with mongo.cx.start_session()as session:
                with session.start_transaction():
                    # Updating the ingredient in the ingredients databse
                    updated_ingredient = IngredientsModel.built_ingredient_from_request(request_data)
                    mongo.db.ingredients.update({"_id": ObjectId(ingredient_id)}, updated_ingredient)

                    # Adding the ID back into the ingredient (ready to return)
                    updated_ingredient['_id'] = ingredient_id

                    ####

                    # Find all recipes containing [x] ingredient
                    recipes_with_ingredient = RecipesModel.find_recipe_by_ingredient(ingredient_id)


                    # Loop through [y] recipes
                    for recipe in recipes_with_ingredient:


                        # Placeholder dietary requirements to edit
                        dietary_requirements = {
                            "vegan": True,
                            "vegetarian": True,
                            "gluten_free": True,
                            "lactose_free": True,
                            "nut_free": True,
                            "egg_free": True
                        }

                        # loop through the ingredient objects
                        for ingredient_object in recipe['ingredients']:
                            ingredient_id = ingredient_object['ingredient']['_id']

                            # Update the ingredient name
                            ingredient_from_db = IngredientsModel.find_by_id(ingredient_id)
                            if not ingredient_from_db:
                                raise ValidationError('Ingredient not found in database')

                            ingredient_object['ingredient']['name'] = ingredient_from_db['name']


                            # Update our placeholder dietary requirements
                            for key in dietary_requirements.keys():
                                if not ingredient_from_db[key]:
                                    dietary_requirements[key] = False

                        # set the recipy with the new and updated dietary requirements
                        recipe['dietary_requirements'] = dietary_requirements

                        # Saved modified recipe to mondoDB
                        mongo.db.recipes.update({"_id": ObjectId(recipe['_id'])}, recipe)















            return IngredientsModel.return_as_object(updated_ingredient)

        except ValidationError as error:
            return {"message": error.message}, 400




    def delete(self, ingredient_id):
        ingredient = IngredientsModel.find_by_id(ingredient_id)

        if ingredient is None:
            return {"message": "An ingredient with that ID does not exist"}, 404

        mongo.db.ingredients.remove({"_id": ObjectId(ingredient_id)})

        return {"message": "Ingredient deleted"}, 200



class IngredientsCollection(Resource):
    def get(self):
        ingredients = [
            IngredientsModel.return_as_object(ingredient)
            for ingredient in mongo.db.ingredients.find().sort('name', ASCENDING)
        ]

        return {
            'ingredients': ingredients
        }


    def post(self):
        request_data = Ingredient.parser.parse_args()

        if IngredientsModel.find_by_name(request_data['name']):
             return {'message': "An item with name '{}' already exists".format(request_data['name'])}, 400

        try:
            new_ingredient = IngredientsModel.built_ingredient_from_request(request_data)
            result = mongo.db.ingredients.insert_one(new_ingredient)
            new_ingredient['_id'] = result.inserted_id

            return IngredientsModel.return_as_object(new_ingredient)

        except ValidationError as error:
            return {"message": error.message}, 400
