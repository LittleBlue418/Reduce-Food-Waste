import pytest
import mongomock
import bson
from reduce_foodwaste.models import mongo
from reduce_foodwaste.models.images import ImageModel
from pymongo.collection import ObjectId



def test_find_by_id():
    test_image = {
        'image_data': 'binary data for the image',
        'image_content_type': 'image/png'
    }

    client = mongomock.MongoClient()

    image_id = client.db.images.insert_one(test_image).inserted_id

    mongo.db = client.db

    image_from_db = ImageModel.find_by_id(str(image_id))

    assert image_from_db == dict(test_image, _id=image_id)


def test_build_image():
    image_data = b'placeholder'
    image_content_type = 'image/png'

    built_image = ImageModel.build_image(image_data, image_content_type)

    assert set(built_image.keys()) == {'image_data', 'image_content_type'}

    assert built_image['image_data'] == bson.Binary(image_data)

    assert built_image['image_content_type'] is image_content_type
