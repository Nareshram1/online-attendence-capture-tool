# Importing the Libraries
import flask
from flask import Flask, request, render_template
from flask_cors import CORS,cross_origin
import os
import subprocess


# Loading Flask and assigning the model variable
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_RESOURCES'] = {r"/*": {"origins": "*"}}

app = flask.Flask(__name__, template_folder="templates")

cors = CORS(app)






# Receiving the input text from the user

@app.route("/sap", methods=['POST'])
def camera():
    data = request.get_json()
    print(data)
    subprocess.Popen(
        ['python', 'main.py', data['oid'] ,data['cid'],data['path']]
    )
    return 'Face Recognizer Running'



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(port=port, debug=True, use_reloader=False)

