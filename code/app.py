import os

from flask import Flask
from flask_restful import reqparse, Api

from db import db
from resources.ingredients import Ingredient, IngredientsCollection
from models.tags import TagsModel
from models.users import Users


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app)

api.add_resource(IngredientsCollection, '/ingredients')
api.add_resource(Ingredient, '/ingredients/<ingredient_id>')

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



# TAGS END POINTS

@app.route('/tags', methods=['GET'])
def list_tags():
    tag_list = [tag.json() for tag in TagsModel.query.all()]
    return {
        'tags': tag_list
    }


@app.route('/tags', methods=['POST'])
def add_tag():
    parser = reqparse.RequestParser()
    parser.add_argument('icon',
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

    if TagsModel.find_by_name(request_data['name']):
        return {'message': "A tag with name '{}' already exists".format(request_data['name'])}, 400

    new_tag = TagsModel(**request_data)

    try:
        new_tag.save_to_db()
    except:
        return {"message": "An error occured"}, 500

    return new_tag.json()


@app.route('/tags/<tag_id>', methods=['GET'])
def get_tag(tag_id):
    tag = TagsModel.query.get(tag_id)

    if tag is None:
        return {"message": "A tag with that ID does not exist"}, 404

    return tag.json()


@app.route('/tags/<tag_id>', methods=['PUT'])
def edit_tag(tag_id):
    parser = reqparse.RequestParser()
    parser.add_argument('icon',
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

    tag = TagsModel.query.get(tag_id)

    if tag is None:
        return {"message": "A tag with that ID does not exist"}, 404

    tag.name = request_data['name']
    tag.icon = request_data['icon']

    tag.save_to_db()

    return tag.json()


@app.route('/tags/<tag_id>', methods=['DELETE'])
def delete_tag(tag_id):
    tag = TagsModel.query.get(tag_id)

    if tag is None:
        return {"message": "A tag with that ID does not exist"}, 404

    tag.delete_from_db()
    return {"message": "Tag deleted"}, 200




# ACCOUNT END POINTS

@app.route('/accounts', methods=['GET'])
def list_user_accounts():
    return "List all user accounts"

@app.route('/accounts/<account>', methods=['GET'])
def list_account_details(account):
    return "Return a specific user account"

@app.route('/accounts', methods=['POST'])
def create_account():
    return "Add an account"

@app.route('/accounts/<account>', methods=['PUT'])
def edit_account(account):
    return "Edit an account"

@app.route('/accounts/<account>', methods=['DELETE'])
def delete_account(account):
    return "Delete an account"



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