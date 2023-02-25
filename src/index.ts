import { Observable, tap } from "rxjs";
import * as config from "./config.json";
import { getImagesToProcess } from "./file-system/get-images-to-process";
import { ImageRecognizer } from "./image-recognition/image-recognizer";
import { RecognizedImage } from "./image-recognition/recognized-image";
import { TensorFlowImageRecognizer } from "./image-recognition/tensorflow/tf-image-recognizer";
import { moveIfBlurry } from "./post-processing/blurry/blurriness-handler";
import { moveIfScreenshot } from "./post-processing/screenshots/screenshots-handler";
const open = require('open');

const imagesToProcess = getImagesToProcess();

TensorFlowImageRecognizer
    .create()
    .subscribe(
        recognizer => imagesToProcess
            .flatMap(
                imageToProcess => recognitionFn
                    .run(recognizer, imageToProcess)
                    .subscribe(recognizedImage => postProcessingFn.run(recognizedImage))
            )
    )

function postProcessingClosure() {
    let counter = 0;
    return {
        run(recognizedImage: RecognizedImage) {
            moveIfBlurry(recognizedImage);
            moveIfScreenshot(recognizedImage);
            console.log(`post processing: ${++counter}/${imagesToProcess.length}`);
        }
    }
}

function recognitionClosure() {
    let counter = 0;
    return {
        run(recognizer: ImageRecognizer, image: string): Observable<RecognizedImage> {
            return recognizer.recognize(image).pipe(
                tap(() => console.log(`recognition: ${++counter}/${imagesToProcess.length}`))
            );
        }
    }
}

const recognitionFn = recognitionClosure();
const postProcessingFn = postProcessingClosure();


if (config.blurriness.openAfterProcessing) {
    open(config.blurriness.directory);
}
if (config.screenshot.openAfterProcessing) {
    open(config.screenshot.directory);
}