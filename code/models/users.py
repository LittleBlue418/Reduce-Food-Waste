from db import db

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
        return cls.query.filter_by(name=name).first()


    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()