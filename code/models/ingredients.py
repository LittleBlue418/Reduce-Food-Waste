from db import db

class IngredientsModel(db.Model):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    icon = db.Column(db.String(80))

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'icon': self.icon,
        }