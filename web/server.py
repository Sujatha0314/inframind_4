import json
import flask
from flask import render_template, request, url_for

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return render_template('./index.html')

@app.route('/profile', methods=['GET'])
def data():
    return render_template('./profile.html')

app.run(port=4000)