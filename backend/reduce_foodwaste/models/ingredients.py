from reduce_foodwaste.models import mongo
from pymongo.collection import ObjectId


class IngredientsModel():
    DIETARY_REQUIREMENTS = ['vegan', 'vegetarian', 'gluten_free', 'lactose_free', 'nut_free', 'egg_free']
    @staticmethod
    def return_as_object(obj):
        return {
            key: str(value) if key == '_id' else value
            for key, value in obj.items()
        }

    @staticmethod
    def find_by_name(name):
        return mongo.db.ingredients.find_one({"name": name})

    @staticmethod
    def find_by_id(_id):
        return mongo.db.ingredients.find_one({"_id": ObjectId(_id)})

    @classmethod
    def built_ingredient_from_request(cls, request_data):
        built_ingredient = {
            'name': request_data.get('name', '').strip(),
        }

        # Name
        if len(built_ingredient['name']) < 1:
            raise ValidationError('Ingredient must have a name!')
        if len(built_ingredient['name']) > 30:
            raise ValidationError('Ingredient name cannot contain more than thirty characters!')

        # Dietary requirements
        for dietary_requirement in cls.DIETARY_REQUIREMENTS:
            built_ingredient[dietary_requirement] = bool(request_data.get(dietary_requirement, False))

        return built_ingredient

