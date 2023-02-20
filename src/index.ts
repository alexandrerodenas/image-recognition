import { readInputArgument } from "./argument-reader";
import { listFilesIn } from "./files-scanning/files-scanner";
import { isImage } from "./file-filtering/is-image";
import { RecognitionRunner } from "./image-recognition/runner/runner";
import { RecognizedImage } from "./image-recognition/recognized-image";

const filesToScan = readInputArgument();
const files = listFilesIn(filesToScan);

(async () => {
    try {
        const recognizedImages: RecognizedImage[] = await RecognitionRunner.runRecognitionOn(
            files.filter(isImage)
        );
        const screenshots = recognizedImages.filter(image => image.isScreenshot());
    } catch (e) {
        console.error(e);
    }
})();