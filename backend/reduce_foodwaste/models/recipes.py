from reduce_foodwaste.models import mongo, ValidationError

from pymongo.collection import ObjectId
from reduce_foodwaste.resources.ingredients import IngredientsModel
class RecipesModel():
    @staticmethod
    def return_as_object(obj):
        return {
            key: str(value) if key == '_id' else value
            for key, value in obj.items()
        }

    @staticmethod
    def find_by_name(name):
        return mongo.db.recipes.find_one({"name": name})

    @staticmethod
    def find_by_id( _id):
        return mongo.db.recipes.find_one({"_id": ObjectId(_id)})


    @staticmethod
    def build_recipe_from_request(request_data):
        built_recipy = {
            'name': 'name',
            'description': 'description',
            'cook_time': 'cook_time',
            'image_id': None,
            'method': [],
            'ingredients': [],
            'dietary_requirements': {}
        }

        # Name
        built_recipy['name'] = request_data.get('name', '').strip()

        if len(built_recipy['name']) < 1:
            raise ValidationError('Recipe must have a name!')
        if len(built_recipy['name']) > 60:
            raise ValidationError('Recipe name cannot contain more than sixty characters!')


        # Description
        built_recipy['description'] = request_data['description'].strip()

        if len(built_recipy['description']) < 1:
            raise ValidationError('Recipe must have a description!')
        if len(built_recipy['description']) > 120:
            raise ValidationError('Description should be less than 120 charectors!')

        # Cook Time
        built_recipy['cook_time'] = request_data['cook_time'].strip()

        if len(built_recipy['cook_time']) < 1:
            raise ValidationError('Recipe must have a cook time!')
        if len(built_recipy['cook_time']) > 20:
            raise ValidationError('Cook time should be less than 20 charectors!')


        # Ingredients
        dietary_requirements = {
            "vegan": True,
            "vegetarian": True,
            "gluten_free": True,
            "lactose_free": True,
            "nut_free": True,
            "egg_free": True
        }

        built_recipy['ingredients'] = request_data['ingredients']
        if  len(built_recipy['ingredients']) < 2:
            raise ValidationError('All recipes need at least two ingredients!')

        ingredient_list = built_recipy['ingredients']
        for ingredient_object in ingredient_list:
            ingredient_id = ingredient_object['ingredient']['_id']
            if not ingredient_id:
                raise ValidationError('Ingredient needs and ID!')

            ingredient_from_db = IngredientsModel.find_by_id(ingredient_id)
            if not ingredient_from_db:
                raise ValidationError('Ingredient not found in database')

            ingredient_object['ingredient']['name'] = ingredient_from_db['name']


            # Dietary requirements
            for key in dietary_requirements.keys():
                if not ingredient_from_db[key]:
                    dietary_requirements[key] = False

        built_recipy['dietary_requirements'] = dietary_requirements

        # Method
        built_recipy['method'] = request_data['method']
        if  len(request_data['method']) < 2:
            raise ValidationError('Method needs at least two steps!')
        for step in built_recipy['method']:
            step.strip()
            if len(step) < 1:
                raise ValidationError('Each step needs at least one character!')



        return built_recipy


    @staticmethod
    def find_recipe_by_ingredient(ingredient_id):
        query =  {}

        query["ingredients"] = {
            "$all" : [
                {
                    "$elemMatch": {
                            "ingredient._id": ingredient_id
                        }
                }
            ]
        }

        query_cursor = mongo.db.recipes.find(query)

        recipes = [
            recipe
            for recipe in query_cursor
        ]

        return recipes




