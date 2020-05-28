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

        ingredient_info = request_data['ingredients']

        for ingredient in ingredient_info:
            if not cls.check_vegan(ingredient['ingredient']):
                allergies["vegan"] = False
            if not cls.check_vegetarian(ingredient['ingredient']):
                allergies["vegetarian"] = False
            if not cls.check_gluten_free(ingredient['ingredient']):
                allergies["gluten_free"] = False
            if not cls.check_nut_free(ingredient['ingredient']):
                allergies["nut_free"] = False
            if not cls.check_egg_free(ingredient['ingredient']):
                allergies["egg_free"] = False

        return allergies

    @classmethod
    def check_vegan(cls, obj):
        ingredient = cls.find_ingredient_by_id(obj['_id'])
        return ingredient['vegan']

    @classmethod
    def check_vegetarian(cls, obj):
        ingredient = cls.find_ingredient_by_id(obj['_id'])
        return ingredient['vegetarian']

    @classmethod
    def check_gluten_free(cls, obj):
        ingredient = cls.find_ingredient_by_id(obj['_id'])
        return ingredient['gluten_free']

    @classmethod
    def check_nut_free(cls, obj):
        ingredient = cls.find_ingredient_by_id(obj['_id'])
        return ingredient['nut_free']

    @classmethod
    def check_egg_free(cls, obj):
        ingredient = cls.find_ingredient_by_id(obj['_id'])
        return ingredient['egg_free']

