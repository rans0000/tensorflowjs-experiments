import P5 from 'p5';

type TMode = boolean;
let isImageMode: TMode = true;
const CAPTURE_SIZE = 32 * 10;
let mediaURL = '';
let media: P5.Image;

const sketch = (p5: P5) => {
    p5.setup = async () => {
        const canvas = p5.createCanvas(CAPTURE_SIZE, CAPTURE_SIZE);
        canvas.parent('app');
        p5.background('black');
        p5.pixelDensity(1);
        p5.colorMode(p5.RGB);

        init(p5);
    };

    p5.draw = async () => {
        if (isImageMode && media) {
            p5.background(0);
            p5.image(media, 0, 0);
        }
        if (!isImageMode) {
            p5.background(0);
        }
    };

    /**--------------------------------- */
    // functions

    function init(p5: P5) {
        setupEventListeners(p5);
    }

    function setupEventListeners(p5: P5) {
        const btnCamera = document.getElementById('btn-camera') as HTMLButtonElement;
        const btnFileUpload = document.getElementById('file-upload') as HTMLElement;
        const infoLabel = document.getElementById('file-info-label') as HTMLElement;

        btnFileUpload.addEventListener('change', (e: InputEvent) => {
            const target = e.target as HTMLInputElement;
            if (!target.files || target.files.length < 1) return;

            toggleMode(true);
            if (mediaURL) URL.revokeObjectURL(mediaURL);
            const file = target.files[0];
            mediaURL = URL.createObjectURL(file);
            infoLabel.textContent = file.name;
            p5.loadImage(mediaURL, (img: P5.Image) => {
                media = img;
                p5.redraw();
            });
        });

        btnCamera.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            toggleMode(false);
        });

        function toggleMode(_mode: boolean | undefined) {
            isImageMode = _mode !== undefined ? _mode : !_mode;
            if (isImageMode) {
                // in isImageMode to image
                p5.background('black');
                p5.noLoop();
                return;
            }
            // set isImageMode to video
            infoLabel.textContent = 'Browse files';
            p5.loop();
        }
    }
};

new P5(sketch);
