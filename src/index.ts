import { listFilesAt } from "./file-utils/listing/list-files";
import { isImage } from "./file-utils/identifying/is-image";
import { RecognitionRunner } from "./image-recognition/runner/runner";
import { RecognizedImage } from "./image-recognition/recognized-image";
import * as config from "./config.json";  
import { ScreenshotsHandler } from "./post-processing/screenshots/screenshots-handler";

const directoryToScan = config.directoryToScan;
const files = listFilesAt(directoryToScan);

(async () => {
    try {
        const recognizedImages: RecognizedImage[] = await RecognitionRunner.runRecognitionOn(
            files.filter(isImage)
        );
        const screenshotsHandler = new ScreenshotsHandler(recognizedImages);
        screenshotsHandler.moveIntoDedicatedDirectory();
    } catch (e) {
        console.error(e);
    }
})();