import os

from flask import Flask


app = Flask(__name__)

# Home Page / Search page
@app.route('/')
def home():
    return "Home page / search page"

# Individual recipy page
@app.route('/recipy')
def recipy():
    return "Individual recipy page"

# User log in
@app.route('/login')
def login():
    return "user login page"


app.run(port=5000)