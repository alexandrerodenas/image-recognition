import { listFilesAt } from "./file-utils/listing/list-files";
import { isImage } from "./file-utils/identifying/is-image";
import { RecognitionRunner } from "./image-recognition/runner/runner";
import { RecognizedImage } from "./image-recognition/recognized-image";
import * as config from "./config.json";  
import { moveBlurryImagesIntoDedicatedDirectory } from "./post-processing/blurry/blurriness-handler";
import { moveScreenshotsInDedicatedDirectory } from "./post-processing/screenshots/screenshots-handler";

const directoryToScan = config.directoryToScan;
const files = listFilesAt(directoryToScan);

(async () => {
    try {
        const recognizedImages: RecognizedImage[] = await RecognitionRunner
            .runRecognitionOn(
                files.filter(isImage)
            );
        moveBlurryImagesIntoDedicatedDirectory(recognizedImages);
        moveScreenshotsInDedicatedDirectory(recognizedImages);

    } catch (e) {
        console.error(e);
    }
})();