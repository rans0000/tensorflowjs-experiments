import P5, { MediaElement } from 'p5';

const topOffset = 63;
let capture: MediaElement;

const sketch = (p5: P5) => {
    p5.setup = async () => {
        const { innerWidth, innerHeight } = window;
        const canvas = p5.createCanvas(innerWidth, innerHeight - topOffset);
        canvas.parent('app');
        p5.background('white');
        p5.pixelDensity(1);
        p5.colorMode(p5.RGB);
        p5.noLoop();
        window.addEventListener('resize', () => resizeDisplay(p5));

        init(p5);
    };

    p5.draw = () => {
        capture.loadPixels();
        console.log(capture.pixels.length);

        p5.image(capture, 0, 0, 200, 200);
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
                width: 200,
                height: 200
            },
            audio: false
        };
        capture = p5.createCapture(constraints, () => p5.loop()) as MediaElement;
        capture.hide();
    }
};

new P5(sketch);
