import { readInputArgument } from "./files/argument-reader";
import { listFilesIn } from "./files/files-scanner";
import { isImage } from "./images/is-image";
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