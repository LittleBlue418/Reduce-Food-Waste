from flask_restful import Resource
from flask import make_response

from models import mongo
from models.images import ImageModel

class Image(Resource):
    def get(self, image_id):
        image = ImageModel.find_by_id(image_id)

        if image is None:
            return {"message": "An image with that ID does not exist"}, 404

        response = make_response(image['image_data'])
        response.headers.set('Content-Type', image['image_content_type'])

        return response