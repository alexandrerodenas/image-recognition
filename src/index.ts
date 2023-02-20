import { readInputArgument } from "./argument-reader";
import { listFilesIn } from "./files-scanner/files-scanner";
import { isImage } from "./images-utils/is-image";
import { RecognitionRunner } from "./recognition/runner";

const filesToScan = readInputArgument();
const files = listFilesIn(filesToScan);

(async () => {
    try {
        RecognitionRunner.runAnalysis(
            files.filter(isImage)
        );
    } catch (e) {
        console.error(e);
    }
})();