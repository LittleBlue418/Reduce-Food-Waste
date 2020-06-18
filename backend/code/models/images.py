from models import mongo
import bson

class ImageModel():
    @classmethod
    def find_by_id(cls, _id):
        return mongo.db.images.find_one({"_id": ObjectId(_id)})

    @classmethod
    def build_image(cls, image_data, image_content_type):
        built_image = {
            'image_data': bson.Binary(image_data),
            'image_content_type': image_content_type
        }

        return built_image