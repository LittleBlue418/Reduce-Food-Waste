from reduce_foodwaste.models import mongo
from pymongo.collection import ObjectId

class UserModel():
    @classmethod
    def find_by_name(cls, name):
        return mongo.db.users.find_one({"name": name})

    @classmethod
    def find_by_id(cls, _id):
        return mongo.db.users.find_one({"_id": ObjectId(_id)})

    def return_as_object(obj):
        return {
            key: str(value) if key == '_id' else value
            for key, value in obj.items()
        }
