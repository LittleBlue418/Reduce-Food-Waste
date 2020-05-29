from models import mongo, ValidationError

from pymongo.collection import ObjectId

class RecipesModel():
    def return_as_object(obj):
        return {
            key: str(value) if key == '_id' else value
            for key, value in obj.items()
        }

    @classmethod
    def find_by_name(cls, name):
        return mongo.db.recipes.find_one({"name": name})

    @classmethod
    def find_recipe_by_id(cls, _id):
        return mongo.db.recipes.find_one({"_id": ObjectId(_id)})

    @classmethod
    def find_ingredient_by_id(cls, _id):
        return mongo.db.ingredients.find_one({"_id": ObjectId(_id)})

    @classmethod
    def build_recipe_from_request(cls, request_data):
        built_recipy = {
            'name': 'name',
            'description': 'description',
            'image': 'image',
            'method': [],
            'ingredients': [],
            'allergies': {}
        }

        # Name
        if not request_data['name']:
            raise ValidationError('Recipe must have a name!')
        built_recipy['name'] = request_data['name']


        # Description
        if not request_data['description']:
            raise ValidationError('Recipe must have a description!')
        if  len(request_data['description']) > 60:
            raise ValidationError('Description should be less than 60 charectors!')
        built_recipy['description'] = request_data['description']


        # Image
        if not request_data['image']:
            raise ValidationError('Recipe must have an image!')
        built_recipy['image'] = request_data['image']


        # Method
        if  len(request_data['method']) < 2:
            raise ValidationError('Method needs at least two steps!')
        built_recipy['method'] = request_data['method']


        # Ingredients
        if  len(request_data['ingredients']) < 2:
            raise ValidationError('All recipes need at least two ingredients!')

        ingredient_list = request_data['ingredients']
        for ingredient_object in ingredient_list:
            ingredient_id = ingredient_object['ingredient']['_id']
            if not ingredient_id:
                raise ValidationError('Ingredient needs and ID!')

            ingredient_from_db = cls.find_ingredient_by_id(ingredient_id)
            if not ingredient_from_db:
                raise ValidationError('Ingredient not found in database')

            ingredient_object['ingredient']['name'] = ingredient_from_db['name']


            # Allergies
            allergies = {
                "vegan": True,
                "vegetarian": True,
                "gluten_free": True,
                "nut_free": True,
                "egg_free": True
            }

            for key in allergies.keys():
                if not ingredient_from_db[key]:
                    allergies[key] = False

        built_recipy['ingredients'] = request_data['ingredients']
        built_recipy['allergies'] = allergies

        return built_recipy




