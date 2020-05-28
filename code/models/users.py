from db import db
from models import mongo

class UserModel(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    password = db.Column(db.String(80))

    def __init__(self, name, password):
        self.name = name
        self.password = password

    def json(self):
        return {
            'user_id': self.user_id,
            'name': self.name,
            'password': self.password,
        }

    @classmethod
    def find_by_name(cls, name):
        return mongo.db.users.find_one({"name": name})

    def return_as_object(obj):
        return {
            key: str(value) if key == '_id' else value
            for key, value in obj.items()
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()