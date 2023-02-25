import { RecognizedImage } from "../../image-recognition/recognized-image";
import * as config from "../../config.json";
import { moveIntoDirectory } from "../../file-system/move-file";

export function moveIfScreenshot(recognizedImage: RecognizedImage): void {
    if(recognizedImage.getAllClassNames().some(className => config.screenshot.keyworkds.includes(className))){
        moveIntoDirectory(
            recognizedImage.getImagePath(),
            config.blurriness.directory
        )
    }
}