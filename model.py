import tensorflow as tf
from tensorflow.keras.datasets import mnist
import numpy as np


(train_images, train_labels), (test_images, test_labels) = mnist.load_data()

train_images = train_images.reshape((60000, 28*28))
train_images = train_images.astype('float32') / 255
test_images = test_images.reshape((10000, 28*28))
test_images = test_images.astype('float32') / 255

model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(512, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10, 'softmax')
])

model.compile(loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(train_images, train_labels, 128, 4)
model.summary()
loss, acc = model.evaluate(test_images, test_labels)
print(f"Loss: {loss}  Accuracy: {acc}")

model.save('./saved_model/')