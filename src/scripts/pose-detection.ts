import * as cocoSSD from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import P5 from 'p5';

type TMode = boolean;
let isImageMode: TMode = true;
const CAPTURE_SIZE = 32 * 10;
const TARGET_SIZE = 192;
let mediaURL = '';
let movenetModel: tf.GraphModel<string | tf.io.IOHandler> | null = null;
let objectDetectionModel: cocoSSD.ObjectDetection | null = null;
let camera: P5.MediaElement | null = null;

const loaderEl = document.getElementById('loader') as HTMLElement;

const sketch = (p5: P5) => {
    p5.setup = async () => {
        const canvas = p5.createCanvas(CAPTURE_SIZE, CAPTURE_SIZE);
        canvas.parent('app');
        p5.background('black');
        p5.pixelDensity(1);
        p5.colorMode(p5.RGB);
        p5.frameRate(10);
        p5.noLoop();

        init(p5);
        await loadPoseModel();
        await loadObjectDetectionModel();
    };

    p5.draw = async () => {
        // if (isImageMode  && movenetModel && objectDetectionModel) {
        //     p5.background(0);
        // }
        if (!isImageMode) {
            try {
                const boundImg = await extractImageFromCamera();
                const [poses, width, height] = await detectPose(boundImg);
                drawPosePoints(poses, width, height);
            } catch (error) {
                console.log('error processing...', error);
            }
        }
    };

    /**--------------------------------- */
    // functions

    function init(p5: P5) {
        setupEventListeners(p5);
    }

    async function extractImageFromCamera(): Promise<P5.Image> {
        return new Promise(async (resolve, reject) => {
            if (!camera) return reject(null);

            await camera.loadPixels();
            const newImg = p5.createImage(TARGET_SIZE, TARGET_SIZE);
            newImg.copy(camera, 0, 0, CAPTURE_SIZE, CAPTURE_SIZE, 0, 0, TARGET_SIZE, TARGET_SIZE);
            p5.image(newImg, 0, 0);
            return resolve(newImg);
        });
    }

    async function extractHumanFromImage(p5: P5, img: HTMLImageElement): Promise<P5.Image> {
        return new Promise(async (resolve, reject) => {
            if (!objectDetectionModel) return reject(null);

            // load prediction and get the bounds for the human
            const predictions = await objectDetectionModel.detect(img);
            const people = predictions.filter((item) => item.class === 'person' && item.score > 0.7);
            if (people.length < 1) return reject(null);
            const person = people[0];

            p5.loadImage(mediaURL, (currImg) => {
                // once we have a human, create a rectangle bound

                /**@todo: decide to crop & padd */
                const [ax, ay, w, h] = person.bbox;

                const max = w > h ? w : h;
                const newX = ax + w / 2 - max / 2;
                const newY = ay + h / 2 - max / 2;

                const boundingImg = p5.createImage(TARGET_SIZE, TARGET_SIZE);
                boundingImg.copy(currImg, newX, newY, max, max, 0, 0, TARGET_SIZE, TARGET_SIZE);
                p5.image(boundingImg, 0, 0);
                return resolve(boundingImg);
            });
        });
    }

    async function detectPose(img: P5.Image): Promise<[number[][][][], number, number]> {
        return new Promise(async (resolve, reject) => {
            if (!movenetModel) return reject(null);

            await img.loadPixels();
            const imgData = new ImageData(new Uint8ClampedArray(img.pixels), img.width, img.height, { colorSpace: 'srgb' });
            const imageTensor = await tf.browser.fromPixels(imgData);

            const poses = (await movenetModel.predict(tf.expandDims(imageTensor))) as tf.Tensor;
            const points = (await poses.array()) as number[][][][];
            return resolve([points, img.width, img.height]);
        });
    }

    function drawPosePoints(points: number[][][][], width: number, height: number) {
        const keyPoints = points[0][0];

        for (const landmark of keyPoints) {
            p5.noStroke();
            p5.fill(0, 255, 0);
            landmark[2] > 0.5 && p5.circle(landmark[1] * height, landmark[0] * width, 5);
        }
    }

    // async function prepareUploadedImage(p5: P5, img: P5.Image) {
    //     // manipulate the uploaded image
    //     await img.loadPixels();
    //     const imgData = {
    //         data: new Uint8Array(img.pixels),
    //         width: img.width,
    //         height: img.height
    //     };
    //     const imageTensor = await tf.browser.fromPixels(imgData);

    //     // put the alpha channel back
    //     const tempT = tf.fill([img.height, img.width, 1], 255, 'int32');
    //     const rgbaT = tf.concat([imageTensor, tempT], 2);
    //     const pixelT = rgbaT.reshape([img.height * img.width * 4]);
    //     // create an array so image can be iterated over
    //     const arr = (await pixelT.array()) as number[];
    //     const preview = p5.createImage(img.width, img.height);
    //     await preview.loadPixels();
    //     for (let i = 0; i < arr.length; i++) {
    //         preview.pixels[i] = arr[i];
    //     }
    //     await preview.updatePixels();
    //     // draw the image to fit within the canvas bounds
    //     const [rWidth, rHeight] = img.width > img.height ? [CAPTURE_SIZE, 0] : [0, CAPTURE_SIZE];
    //     preview.resize(rWidth, rHeight);
    //     p5.image(preview, 0, 0);
    // }

    function setupEventListeners(p5: P5) {
        const btnCamera = document.getElementById('btn-camera') as HTMLButtonElement;
        const btnFileUpload = document.getElementById('file-upload') as HTMLElement;
        const infoLabel = document.getElementById('file-info-label') as HTMLElement;

        btnFileUpload.addEventListener('change', handleileUpload);
        btnCamera.addEventListener('click', handleCameraCapture);

        function handleCameraCapture(e: MouseEvent) {
            e.preventDefault();

            if (!camera) {
                const constraints = {
                    video: {
                        noiseSuppression: true,
                        width: CAPTURE_SIZE,
                        height: CAPTURE_SIZE
                    },
                    audio: false
                };
                camera = p5.createCapture(constraints, { flipped: true }, () => {
                    toggleMode(false);
                }) as P5.MediaElement;
                camera.hide();
            } else {
                toggleMode(false);
            }
        }

        function handleileUpload(e: InputEvent) {
            const target = e.target as HTMLInputElement;
            if (!target.files || target.files.length < 1) return;

            if (mediaURL) URL.revokeObjectURL(mediaURL);

            const file = target.files[0];
            if (!file.type.startsWith('image/')) {
                throw 'Only images can be uploaded!!';
            }
            toggleMode(true);

            mediaURL = URL.createObjectURL(file);
            infoLabel.textContent = file.name;
            const newImg = new Image();
            newImg.onload = async function (e: Event) {
                try {
                    const self = e.target as HTMLImageElement;
                    target.value = '';
                    if (self.width < TARGET_SIZE || self.height < TARGET_SIZE) {
                        alert('Please provide an image with atleas 192x192px size');
                        throw 'image size error!';
                    }
                    const boundImg = await extractHumanFromImage(p5, this as HTMLImageElement);
                    const [poses, width, height] = await detectPose(boundImg);
                    drawPosePoints(poses, width, height);
                } catch (error) {
                    console.log('error processing...', error);
                }
            };
            newImg.src = mediaURL;
        }

        function toggleMode(_mode: boolean | undefined) {
            isImageMode = _mode !== undefined ? _mode : !_mode;
            if (isImageMode) {
                // in isImageMode to image
                p5.background('white');
                p5.noLoop();
                return;
            }
            // set isImageMode to video
            infoLabel.textContent = 'Browse files';
            p5.loop();
        }
    }

    async function loadPoseModel() {
        try {
            const modelURL = 'https://www.kaggle.com/models/google/movenet/tfJs/singlepose-lightning/4';
            const localURL = 'indexeddb://models/movenet-singlepose-lightning';

            loaderEl.classList.replace('hidden', 'flex');
            console.log('loading movenet model started...');
            const isModelLocallyAvailable = (await tf.io.listModels()).hasOwnProperty(localURL);

            if (isModelLocallyAvailable) {
                movenetModel = await tf.loadGraphModel(localURL);
            } else {
                movenetModel = await tf.loadGraphModel(modelURL, { fromTFHub: true });
                await movenetModel.save(localURL);
            }
            console.log('loading movenet model done...');
        } catch (error) {
            console.log('something went wrong while loading the pose model...', error);
        } finally {
            loaderEl.classList.replace('flex', 'hidden');
        }
    }

    async function loadObjectDetectionModel() {
        console.log('loading cocossd model started');
        try {
            loaderEl.classList.replace('hidden', 'flex');
            objectDetectionModel = await cocoSSD.load();
            console.log('loading cocossd model done');
        } catch (error) {
            console.log('something went wrong while loading object detection model ...', error);
        } finally {
            loaderEl.classList.replace('flex', 'hidden');
        }
    }
};

new P5(sketch);
