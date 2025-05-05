import { TRAINING_DATA } from '../models/real-estate-data.js';
import * as tf from '@tensorflow/tfjs';

const inputTensor = tf.tensor2d(TRAINING_DATA.inputs);
const outputTensor = tf.tensor1d(TRAINING_DATA.outputs);

function normalize(tensor: tf.Tensor, _min?: number, _max?: number) {
    const result = tf.tidy(() => {
        const min = _min || tf.min(tensor, 0);
        const max = _max || tf.max(tensor, 0);

        const minSubtractedTensor = tf.sub(tensor, min);
        const range = tf.sub(max, min);
        const normalizedTensor = tf.div(minSubtractedTensor, range);

        return { normalizedTensor, min, max };
    });
    return result;
}

const { normalizedTensor, min, max } = normalize(inputTensor);
normalizedTensor.print();
min instanceof tf.Tensor && min?.print();
max instanceof tf.Tensor && max?.print();
inputTensor.dispose();
