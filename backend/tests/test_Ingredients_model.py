import pytest
import mongomock
from reduce_foodwaste.models import mongo
from reduce_foodwaste.models.ingredients import IngredientsModel
from pymongo.collection import ObjectId


def test_return_as_object():
    ingredient_id = "5ecf79a3a947563a0b977f8a"

    test_ingredient = {
        "_id": ObjectId(ingredient_id),
        'name': 'cauliflower',
        'vegan': True
    }

    ingredient_object = IngredientsModel.return_as_object(test_ingredient)

    assert ingredient_object['_id'] == ingredient_id

    assert ingredient_object['vegan'] is test_ingredient['vegan']

    assert ingredient_object['name'] is test_ingredient['name']


def test_find_by_name():
    test_ingredient = {
        'name': 'cauliflower',
        'vegan': True
    }

    client = mongomock.MongoClient()

    ingredient_id = client.db.ingredients.insert_one(test_ingredient).inserted_id

    mongo.db = client.db

    ingredient_from_db = IngredientsModel.find_by_name(test_ingredient['name'])

    assert ingredient_from_db == dict(test_ingredient, _id=ingredient_id)


def test_find_by_id():
    test_ingredient = {
        'name': 'cauliflower',
        'vegan': True
    }

    client = mongomock.MongoClient()

    ingredient_id = client.db.ingredients.insert_one(test_ingredient).inserted_id

    mongo.db = client.db

    ingredient_from_db = IngredientsModel.find_by_id(str(ingredient_id))

    assert ingredient_from_db == dict(test_ingredient, _id=ingredient_id)

