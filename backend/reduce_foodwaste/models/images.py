from reduce_foodwaste.models import mongo
from pymongo.collection import ObjectId
import bson

class ImageModel():
    @staticmethod
    def find_by_id(_id):
        return mongo.db.images.find_one({"_id": ObjectId(_id)})

    @staticmethod
    def build_image(image_data, image_content_type):
        built_image = {
            'image_data': bson.Binary(image_data),
            'image_content_type': image_content_type
        }

        return built_image