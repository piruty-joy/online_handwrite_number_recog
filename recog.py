#coding: utf-8
import numpy as np
import tensorflow
from PIL import Image

def recognise(img):

    img = img.convert("L").resize((28,28))
    X = np.array(img).astype(np.float32)
    X = X.reshape((1,28,28,1))

    model = tensorflow.keras.models.load_model('model.h5')
    result = model.predict(X)
    return int(np.argmax(result))
