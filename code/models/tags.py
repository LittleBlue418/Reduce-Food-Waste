from db import db

class Tags(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    icon = db.Column(db.String(80))