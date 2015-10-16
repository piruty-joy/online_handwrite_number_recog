#coding: utf-8
import numpy as np
import chainer
import chainer.functions as F
from PIL import Image

def recognise(img):

    img = img.convert("L").resize((28,28))
    X = np.array(img).astype(np.float32)
    X = X.reshape((1,1,28,28))

    import pickle
    model = pickle.load(open("model.pkl", "rb"))

    def forward(x_data):
        x = chainer.Variable(x_data)
        h = F.max_pooling_2d(F.relu(model.conv1(x)), 2)
        h = F.max_pooling_2d(F.relu(model.conv2(h)), 2)
        h = F.dropout(F.relu(model.l1(h)), train=False)
        y = model.l2(h)
        return y.data

    result = forward(X)[0]
    return int(np.argmax(result))
