from flask_restful import Resource, reqparse

from models import mongo
from models.users import UserModel
from pymongo.collection import ObjectId

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
        user = UserModel.find_by_id(user_id)

        if user is None:
            return {"message": "A user with that ID does not exist"}, 404

        return UserModel.return_as_object(user)


    def put(self, user_id):
        request_data = User.parser.parse_args()

        if UserModel.find_by_id(user_id):
            mongo.db.users.update({"_id": ObjectId(user_id)},
                {
                    'name': request_data['name'],
                    'password': request_data['password'],
                }
            )
            return UserModel.return_as_object(request_data)
        else:
            return {"message": "A user with that ID does not exist"}, 404


    def delete(self, user_id):
        user = UserModel.find_by_id(user_id)

        if user is None:
            return {"message": "A user with that ID does not exist"}, 404

        mongo.db.users.remove({"_id": ObjectId(user_id)})

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



