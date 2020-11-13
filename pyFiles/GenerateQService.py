from flask import request, url_for
from flask_api import FlaskAPI, status, exceptions

app = FlaskAPI(__name__)

@app.route("/main", methods=["GET", "POST"])
def printFF():
    return("HEllo world")


@app.route("/", methods=["GET"])
def getTest():
    return "Get Test Coming through"

if __name__ == "__main__":
    app.run(debug=True)