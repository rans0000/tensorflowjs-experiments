import { TRAINING_DATA } from '../models/real-estate-data.js';
import * as tf from '@tensorflow/tfjs';

async function execute() {
    const tableBody = document.getElementById('table-body') as HTMLBodyElement;
    const predictionForm = document.getElementById('prediction-form') as HTMLFormElement;
    const inputTensor = tf.tensor2d(TRAINING_DATA.inputs);
    const outputTensor = tf.tensor1d(TRAINING_DATA.outputs);
    predictionForm.addEventListener('submit', onSubmit);

    // render the table
    buildTable(TRAINING_DATA.inputs, TRAINING_DATA.outputs, tableBody);

    // normalize data

    const { normalizedTensor, min, max } = normalize(inputTensor);
    normalizedTensor.print();
    min instanceof tf.Tensor && min?.print();
    max instanceof tf.Tensor && max?.print();
    inputTensor.dispose();

    // training & prediction

    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [2], units: 1 }));
    model.summary();

    await train();

    async function train() {
        const learningRate = 0.001;

        model.compile({
            optimizer: tf.train.sgd(learningRate),
            loss: 'meanSquaredError'
        });

        let result = await model.fit(normalizedTensor, outputTensor, {
            validationSplit: 0.15,
            shuffle: true,
            batchSize: 64,
            epochs: 10
        });

        outputTensor.dispose();
        normalizedTensor.dispose();

        console.log('Average error lose', Math.sqrt(result.history.loss[result.history.loss.length - 1] as number));
        console.log(
            'Average validation error lose',
            Math.sqrt(result.history.val_loss[result.history.val_loss.length - 1] as number)
        );
    }

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

    function buildTable(input: number[][], output: number[], body: HTMLBodyElement) {
        // const node = new
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < input.length; i++) {
            const row = document.createElement('tr');
            const areaCell = document.createElement('td');
            areaCell.textContent = `${input[i][0]}`;
            areaCell.classList = 'p-2 text-right font-mono';
            const roomCell = document.createElement('td');
            roomCell.textContent = `${input[i][1]}`;
            roomCell.classList = 'py-2 px-4 text-right font-mono';
            const priceCell = document.createElement('td');
            priceCell.textContent = `$${output[i].toFixed(2)}`;
            priceCell.classList = 'p-2 text-right font-mono';
            row.appendChild(areaCell);
            row.appendChild(roomCell);
            row.appendChild(priceCell);
            fragment.appendChild(row);
        }
        body.appendChild(fragment);
    }

    function onSubmit(e: SubmitEvent) {
        e.preventDefault();
        const formData = new FormData(predictionForm);
        const area = parseFloat(formData.get('input-area') as string);
        const rooms = parseFloat(formData.get('input-rooms') as string);
        if (!area || !rooms) return;
    }
}

execute();
