import os
import io
import json
import recog
from flask import Flask, render_template, request
from PIL import Image

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['image']
    result = {}
    if file:
        img = Image.open(io.BytesIO(file.stream.read()))
        result.update({"passed": True})
        result.update({"recog": recog.recognise(img)})
    else:
        result.update({"passed": False})
    return json.dumps(result)

if __name__ == '__main__':
    app.run()
