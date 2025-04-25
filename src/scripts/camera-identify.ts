import * as cocoSSD from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

(async () => {
    const video = document.getElementById('webcam') as HTMLVideoElement;
    const liveView = document.getElementById('live-view') as HTMLElement;
    const demoArea = document.getElementById('demo') as HTMLElement;
    const btn = document.getElementById('btn-enable') as HTMLButtonElement;
    const instructionBox = document.getElementById('instruction-area') as HTMLElement;
    const confidenceThreshold = 0.66;
    let children: HTMLElement[] = [];
    let model: cocoSSD.ObjectDetection | null = null;

    if (getSupportedMedia()) {
        demoArea.classList.remove('hidden');
        btn.addEventListener('click', enableCam);
    } else {
        console.warn('getUserMedia() is not supported by your browser');
    }

    function getSupportedMedia() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia);
    }

    async function enableCam(event: MouseEvent) {
        const { target } = event;
        if (target instanceof HTMLElement) {
            try {
                model = await cocoSSD.load();
                target.classList.add('hidden');
                const constraints = { video: true };
                navigator.mediaDevices.getUserMedia(constraints).then((stream: MediaStream) => {
                    video.srcObject = stream;
                    video.onloadeddata = predictWebCam;
                });
                instructionBox.classList.add('hidden');
            } catch (error) {
                console.log(error);
            }
        }
    }

    function predictWebCam() {
        // remove previous bounding boxes
        if (!model) return;

        model.detect(video).then((predictions: cocoSSD.DetectedObject[]) => {
            for (let i = 0; i < children.length; i++) {
                liveView.removeChild(children[i]);
            }
            children.splice(0);

            // draw only if prediction has high confidence
            for (let i = 0; i < predictions.length; i++) {
                if (predictions[i].score < confidenceThreshold) continue;

                //draw
                const p = document.createElement('p');
                p.innerText =
                    predictions[i].class +
                    ' - with ' +
                    Math.round(parseFloat(`${predictions[i].score}`) * 100) +
                    '% confidence.';
                p.style =
                    'margin-left: ' +
                    predictions[i].bbox[0] +
                    'px; margin-top: ' +
                    (predictions[i].bbox[1] - 10) +
                    'px; width: ' +
                    (predictions[i].bbox[2] - 10) +
                    'px; top: 0; left: 0;';

                const highlighter = document.createElement('div');
                highlighter.setAttribute('class', 'highlighter');
                highlighter.style =
                    'left: ' +
                    predictions[i].bbox[0] +
                    'px; top: ' +
                    predictions[i].bbox[1] +
                    'px; width: ' +
                    predictions[i].bbox[2] +
                    'px; height: ' +
                    predictions[i].bbox[3] +
                    'px;';

                liveView.appendChild(highlighter);
                liveView.appendChild(p);
                children.push(highlighter);
                children.push(p);
            }
            // Call this function again to keep predicting when the browser is ready.
            window.requestAnimationFrame(predictWebCam);
        });
    }
})();
