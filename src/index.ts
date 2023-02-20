import { readInputArgument } from "./argument-reader";
import { listFilesIn } from "./files-scanning/files-scanner";
import { isImage } from "./file-filtering/is-image";
import { RecognitionRunner } from "./image-recognition/runner/runner";

const filesToScan = readInputArgument();
const files = listFilesIn(filesToScan);

(async () => {
    try {
        RecognitionRunner.runRecognitionOn(
            files.filter(isImage)
        );
    } catch (e) {
        console.error(e);
    }
})();