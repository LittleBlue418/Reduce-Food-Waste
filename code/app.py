import os

from flask import Flask
from flask_restful import reqparse, Api

from db import db
from resources.ingredients import Ingredient, IngredientsCollection
from resources.tags import Tag, TagCollection
from models.users import UserModel


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL', 'sqlite:///data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app)

api.add_resource(IngredientsCollection, '/ingredients')
api.add_resource(Ingredient, '/ingredients/<ingredient_id>')
api.add_resource(TagCollection, '/tags')
api.add_resource(Tag, '/tags/<tag_id>')

# RECIPIES END POINTS


@app.route('/recipes', methods=['GET'])
def list_all_recipes():
    return "All recipes"


@app.route('/recipes/<recipe>', methods=['GET'])
def fetch_recipe(recipe):
    return "Returns requested recipe"


@app.route('/recipes', methods=['POST'])
def add_new_recipe():
    return "Add new recipe"


@app.route('/recipes/<recipe>', methods=['PUT'])
def edit_existing_recipe(recipe):
    return "Edit specified recipe"


@app.route('/recipes/<recipe>', methods=['DELETE'])
def delete_recipe(recipe):
    return "Delete specified recipe"


# USER END POINTS

@app.route('/users', methods=['GET'])
def list_users():
    users = [u.json() for u in UserModel.query.all()]

    return {
        'users': users,
    }


@app.route('/users', methods=['POST'])
def create_user():
    parser = reqparse.RequestParser()
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )

    request_data = parser.parse_args()

    if UserModel.find_by_name(request_data['name']):
        return {'message': "A user with name '{}' already exists".format(request_data['name'])}, 400

    new_user = UserModel(**request_data)

    try:
        new_user.save_to_db()
    except:
        return {"message": "An error occurred"}, 500

    return new_user.json()


@app.route('/users/<user_id>', methods=['GET'])
def list_account_details(user_id):
    user = UserModel.query.get(user_id)

    if user is None:
        return {"message": "A user with that ID does not exist"}, 404

    return user.json()


@app.route('/users/<user_id>', methods=['PUT'])
def edit_account(user_id):
    parser = reqparse.RequestParser()
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )

    request_data = parser.parse_args()

    user = UserModel.query.get(user_id)

    if user is None:
        return {"message": "A user with that ID does not exist"}, 404

    user.name = request_data['name']
    user.password = request_data['password']

    user.save_to_db()

    return user.json()


@app.route('/users/<user_id>', methods=['DELETE'])
def delete_account(user_id):
    user = UserModel.query.get(user_id)

    if user is None:
        return {"message": "A user with that ID does not exist"}, 404

    user.delete_from_db()
    return {"message": "User deleted"}, 200


# LOGIN ENDPOINTS

@app.route('/login', methods=['POST'])
def log_in():
    return "Logged in"


@app.route('/logout', methods=['GET'])
def log_out():
    return "Logged out"


# FAVORITE END POINTS

@app.route('/favorites', methods=['GET'])
def list_user_favorites():
    return "All user favorites"


@app.route('/favorites', methods=['POST'])
def add_user_favorite():
    return "User favorite added"


@app.route('/favorites/<favorite>', methods=['DELETE'])
def delete_user_favorite(favorite):
    return "User favorite deleted"


db.init_app(app)


@app.before_first_request
def create_tables():
    db.create_all()


app.run(port=5000)
