import pytest
import mongomock
from reduce_foodwaste.models import mongo
from reduce_foodwaste.models.recipes import RecipesModel
from pymongo.collection import ObjectId


def test_return_as_object():
    recipe_id = "5ecf79a3a947563a0b977f8a"

    test_recipe = {
        "_id": ObjectId(recipe_id),
        'name': 'cauliflower soup',
        'vegan': True
    }

    recipe_object = RecipesModel.return_as_object(test_recipe)

    assert recipe_object['_id'] == recipe_id

    assert recipe_object['vegan'] is test_recipe['vegan']

    assert recipe_object['name'] is test_recipe['name']


def test_find_by_name():
    test_recipe = {
        'name': 'cauliflower soup',
        'vegan': True
    }

    client = mongomock.MongoClient()

    recipe_id = client.db.recipes.insert_one(test_recipe).inserted_id

    mongo.db = client.db

    recipe_from_db = RecipesModel.find_by_name(test_recipe['name'])

    assert recipe_from_db == dict(test_recipe, _id=recipe_id)


def test_find_by_id():
    test_recipe = {
        'name': 'cauliflower soup',
        'vegan': True
    }

    client = mongomock.MongoClient()

    recipe_id = client.db.recipes.insert_one(test_recipe).inserted_id

    mongo.db = client.db

    recipe_from_db = RecipesModel.find_by_id(str(recipe_id))

    assert recipe_from_db == dict(test_recipe, _id=recipe_id)

