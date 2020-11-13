from flask import request, url_for
from flask_api import FlaskAPI, status, exceptions

app = FlaskAPI(__name__)

@app.route("/api/main", methods=["GET", "POST"])
def printFF():
    return("HEllo world")


@app.route("/api/test", methods=["POST"])
def getTest():
    req_data = request.get_json()
    return req_data["Timothy"]

if __name__ == "__main__":
    app.run(debug=True)