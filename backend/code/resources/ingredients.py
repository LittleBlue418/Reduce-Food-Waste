from flask_restful import Resource, reqparse

from models import mongo
from pymongo.collection import ObjectId
from models.ingredients import IngredientsModel
from pymongo import ASCENDING


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

        if IngredientsModel.find_by_id(ingredient_id):
            mongo.db.ingredients.update({"_id": ObjectId(ingredient_id)},
                {
                    'name': request_data['name'],
                    'vegan': request_data['vegan'],
                    'vegetarian': request_data['vegetarian'],
                    'gluten_free': request_data['gluten_free'],
                    'nut_free': request_data['nut_free'],
                    'egg_free': request_data['egg_free'],
                }
            )
            return IngredientsModel.return_as_object(request_data)
        else:
            return {"message": "An ingredient with that ID does not exist"}, 404


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
            mongo.db.ingredients.insert_one(request_data)
            return IngredientsModel.return_as_object(request_data)
        except:
            return {"message": "An error occurred"}, 500