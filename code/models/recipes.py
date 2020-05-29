from models import mongo
from pymongo.collection import ObjectId

class RecipesModel():
    def return_as_object(obj):
        return {
            key: str(value) if key == '_id' else value
            for key, value in obj.items()
        }

    @classmethod
    def find_by_name(cls, name):
        return mongo.db.recipes.find_one({"name": name})

    @classmethod
    def find_recipe_by_id(cls, _id):
        return mongo.db.recipes.find_one({"_id": ObjectId(_id)})

    @classmethod
    def find_ingredient_by_id(cls, _id):
        return mongo.db.ingredients.find_one({"_id": ObjectId(_id)})

    @classmethod
    def get_allergy_information(cls, request_data):
        allergies = {
            "vegan": True,
            "vegetarian": True,
            "gluten_free": True,
            "nut_free": True,
            "egg_free": True
        }

        ingredient_list = request_data['ingredients']

        for ingredient_object in ingredient_list:
            ingredient_id = ingredient_object['ingredient']['_id']
            ingredient_from_db = cls.find_ingredient_by_id(ingredient_id)

            for key in ['vegan', 'vegetarian', 'gluten_free', 'nut_free', 'egg_free']
                if not ingredient_from_db[key]:
                    allergies[key] = False


        return allergies


