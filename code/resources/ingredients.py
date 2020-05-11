from flask_restful import Resource, reqparse

from models.ingredients import IngredientsModel


class Ingredient(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('icon',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )


    def get(self, ingredient_id):
        ingredient = IngredientsModel.query.get(ingredient_id)

        if ingredient is None:
            return {"message": "An ingredient with that ID does not exist"}, 404

        return ingredient.json()

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
        ingredients = [ingredient.json() for ingredient in IngredientsModel.query.all()]
        return {
            'ingredients': ingredients,
        }

    def post(self):
        request_data = Ingredient.parser.parse_args()

        if IngredientsModel.find_by_name(request_data['name']):
            return {'message': "An item with name '{}' already exists".format(request_data['name'])}, 400

        new_ingredient = IngredientsModel(**request_data)

        try:
                new_ingredient.save_to_db()
        except:
                return {"message": "An error occurred"}, 500

        return new_ingredient.json()