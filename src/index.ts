import { listFilesIn } from "./pre-processing/scanning/files-scanner";
import { isImage } from "./pre-processing/filtering/is-image";
import { RecognitionRunner } from "./image-recognition/runner/runner";
import { RecognizedImage } from "./image-recognition/recognized-image";
import * as config from "./config.json";  

const directoryToScan = config.directoryToScan;
const files = listFilesIn(directoryToScan);

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