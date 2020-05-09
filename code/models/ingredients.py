from db import db

class Ingredients(db.Model):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    icon = db.Column(db.String(80))