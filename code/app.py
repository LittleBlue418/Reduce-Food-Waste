import os

from flask import Flask

from db import db
from models.ingredients import IngredientsModel
from models.tags import Tags
from models.users import Users


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

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



# INGREDIENTS END POINTS


@app.route('/ingredients', methods=['GET'])
def list_ingredients():
    ingredients = [ingredient.json() for ingredient in IngredientsModel.query.all()]
    return {
        'ingredients': ingredients,
    }

@app.route('/ingredients', methods=['POST'])
def add_ingredient():
    return "Add an ingredient"

@app.route('/ingredients/<ingredient>', methods=['PUT'])
def edit_ingredient(ingredient):
    return "Edit an ingredient"

@app.route('/ingredients/<ingredient>', methods=['DELETE'])
def delete_ingredient(ingredient):
    return "Delete an ingredient"



# TAGS END POINTS

@app.route('/tags', methods=['GET'])
def list_tagss():
    return "List all tags"

@app.route('/tags', methods=['POST'])
def add_tag():
    return "Add a tag"

@app.route('/tags/<tag>', methods=['PUT'])
def edit_tag(tag):
    return "Edit a tag"

@app.route('/tags/<tag>', methods=['DELETE'])
def delete_tag(tag):
    return "Delete a tag"




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