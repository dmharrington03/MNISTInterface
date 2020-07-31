from flask import Flask, request, render_template, Response
import tensorflow as tf
import numpy as np


app = Flask(__name__)

model = tf.keras.models.load_model('saved_model')

@app.route('/', methods=['GET'])
def index():
    return render_template('./index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    num, acc = predict_number(data)
    return Response(f"{num} {acc}")

def predict_number(num_string):
    try:
        img = np.array([float(i) for i in num_string.split(',')])
    except ValueError:
        print("Error")
        return None
    img = img.reshape((28, 28)).T
    img = img.reshape((1, 28 * 28))

    pred = model.predict(img)
    return np.argmax(pred), pred[0][np.argmax(pred)]
    



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
