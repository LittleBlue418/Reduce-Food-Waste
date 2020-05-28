from flask_restful import Resource, reqparse

from models import mongo
from pymongo.collection import ObjectId
from models.ingredients import IngredientsModel


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
        ingredient = mongo.db.ingredients.find_one({"_id": ObjectId(ingredient_id)})

        if ingredient is None:
             return {"message": "An ingredient with that ID does not exist"}, 404

        return IngredientsModel.return_as_object(ingredient)


    def put(self, ingredient_id):
        request_data = Ingredient.parser.parse_args()

        ingredient = IngredientsModel.query.get(ingredient_id)

        if ingredient is None:
            return {"message": "An ingredient with that ID does not exist"}, 404

        ingredient.name = request_data['name']
        ingredient.icon = request_data['icon']

        ingredient.save_to_db()

        return ingredient.json()

    def delete(self, ingredient_id):
        ingredient = IngredientsModel.query.get(ingredient_id)

        if ingredient is None:
            return {"message": "An ingredient with that ID does not exist"}, 404

        ingredient.delete_from_db()
        return {"message": "Ingredient deleted"}, 200



class IngredientsCollection(Resource):


    def get(self):
        ingredients = [
            IngredientsModel.return_as_object(ingredient)
            for ingredient in mongo.db.ingredients.find()
        ]
        print(ingredients)
        return {
            'ingredients': [
                ingredients
            ]
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

