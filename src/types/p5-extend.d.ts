import * as p5 from 'p5';

declare module 'p5' {
    interface p5InstanceExtensions {
        canvas: HTMLCanvasElement;
        createCapture(type: string | TYPE | object, callback?: (...args: any[]) => any): Element;
        createCapture(
            type: string | TYPE | object,
            obj?: { flipped: boolean },
            callback?: (...args: any[]) => any
        ): Element;
    }
    interface MediaElement {
        loadPixels(): void;
        pixels: number[];
    }
}
