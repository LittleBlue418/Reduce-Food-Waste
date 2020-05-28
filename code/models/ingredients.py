from db import db
from models import mongo


class IngredientsModel():

    def return_as_object(obj):
        return {
            key: str(value) if key == '_id' else value
            for key, value in obj.items()
        }

    @classmethod
    def find_by_name(cls, name):
        return mongo.db.ingredients.find_one({"name": name})
