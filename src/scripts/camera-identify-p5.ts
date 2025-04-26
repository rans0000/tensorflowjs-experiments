import * as cocoSSD from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import P5, { MediaElement } from 'p5';

const topOffset = 63;
let capture: MediaElement;
let model: cocoSSD.ObjectDetection | null = null;
const WIDTH = 400;
const HEIGHT = 400;
const CANVAS_OFFSET_X = 50;
const CANVAS_OFFSET_Y = 50;
let isProcessing = false;

const sketch = (p5: P5) => {
    p5.setup = async () => {
        const { innerWidth, innerHeight } = window;
        const canvas = p5.createCanvas(innerWidth, innerHeight - topOffset);
        canvas.parent('app');
        p5.background('white');
        p5.pixelDensity(1);
        p5.colorMode(p5.RGB);
        window.addEventListener('resize', () => resizeDisplay(p5));

        init(p5);
    };

    p5.draw = async () => {
        if (!model) return;

        capture.loadPixels();
        p5.push();
        p5.translate(CANVAS_OFFSET_X, CANVAS_OFFSET_Y);
        p5.image(capture, 0, 0, WIDTH, HEIGHT);
        p5.pop();
        await predict(p5, capture.pixels);
        isProcessing = false;
    };

    /**--------------------------------- */
    // functions

    function resizeDisplay(p5: P5) {
        p5.resizeCanvas(window.innerWidth, window.innerHeight);
    }

    function init(p5: P5) {
        const constraints = {
            video: {
                noiseSuppression: true,
                width: WIDTH,
                height: HEIGHT
            },
            audio: false
        };
        capture = p5.createCapture(constraints, { flipped: true }, async () => {
            model = await cocoSSD.load();
        }) as MediaElement;
        capture.hide();
    }

    async function predict(p5: P5, pixels: number[] = []) {
        if (!model) return;
        isProcessing = true;
        const total = WIDTH * HEIGHT;

        const rgbaTensor = tf.tensor2d(pixels, [total, 4]);
        const rgbTensor = rgbaTensor.slice([0, 0], [-1, 3]);
        const rgbTensor3d = rgbTensor.reshape([WIDTH, HEIGHT, 3]) as tf.Tensor3D;

        const predictions = await model.detect(rgbTensor3d);
        p5.rectMode(p5.CORNER);
        p5.stroke(255);
        p5.noFill();
        p5.textSize(20);
        p5.push();
        p5.translate(CANVAS_OFFSET_X, CANVAS_OFFSET_Y);
        for (const item of predictions) {
            if (item.score < 0.7) continue;
            p5.rect(item.bbox[0], item.bbox[1], item.bbox[2], item.bbox[3]);
            p5.text(item.class, item.bbox[0], item.bbox[1]);
        }
        p5.pop();

        return;
    }
};

new P5(sketch);
