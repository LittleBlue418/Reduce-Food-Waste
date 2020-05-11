from db import db

class IngredientsModel(db.Model):
    __tablename__ = 'ingredients'

    ingredient_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80))
    icon = db.Column(db.String(80))

    def __init__(self, name, icon):
        self.name = name
        self.icon = icon

    def json(self):
        return {
            'ingredient_id': self.ingredient_id,
            'name': self.name,
            'icon': self.icon,
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