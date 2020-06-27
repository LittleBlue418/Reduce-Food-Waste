from reduce_foodwaste.models import mongo
from pymongo.collection import ObjectId


class IngredientsModel():
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

