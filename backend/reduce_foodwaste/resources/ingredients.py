from flask_restful import Resource, reqparse
from pymongo import ASCENDING
from pymongo.collection import ObjectId

from reduce_foodwaste.models import mongo
from reduce_foodwaste.models.ingredients import IngredientsModel


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
        request_data = Ingredient.parser.parse_args()

        if not IngredientsModel.find_by_id(ingredient_id):
            return {"message": "An ingredient with that ID does not exist"}, 404

        try:
            updated_ingredient = IngredientsModel.built_ingredient_from_request(request_data)
            mongo.db.ingredients.update({"_id": ObjectId(ingredient_id)}, ingredieupdated_ingredientnt)
            updated_ingredient['_id'] = ingredient_id

            return IngredientsModel.return_as_object(updated_ingredient)

        except ValidationError as error:
            return {"message": error.message}, 400
        except:
            return {"message": "An error occurred saving to database"}, 500



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
        except:
            return {"message": "An error occurred"}, 500