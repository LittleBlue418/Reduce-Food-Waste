from flask_restful import Resource, reqparse

from models import mongo
from models.users import UserModel

class User(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )

    def get(self, user_id):
        user = UserModel.query.get(user_id)

        if user is None:
            return {"message": "A user with that ID does not exist"}, 404

        return user.json()

    def put(self, user_id):
        request_data = User.parser.parse_args()

        user = UserModel.query.get(user_id)

        if user is None:
            return {"message": "A user with that ID does not exist"}, 404

        user.name = request_data['name']
        user.password = request_data['password']

        user.save_to_db()

        return user.json()

    def delete(self, user_id):
        user = UserModel.query.get(user_id)

        if user is None:
            return {"message": "A user with that ID does not exist"}, 404

        user.delete_from_db()
        return {"message": "User deleted"}, 200



class UserCollection(Resource):
    def get(self):
        users = [
            UserModel.return_as_object(user)
            for user in mongo.db.users.find()
        ]

        return {
            'users': users
        }

    def post(self):
        request_data = User.parser.parse_args()

        if UserModel.find_by_name(request_data['name']):
            return {'message': "A user with name '{}' already exists".format(request_data['name'])}, 400

        try:
            mongo.db.users.insert_one(request_data)
            return UserModel.return_as_object(request_data)
        except:
            return {"message": "An error occurred"}, 500



