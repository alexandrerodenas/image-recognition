import { RecognizedImage } from "../../image-recognition/recognized-image";
import * as config from "../../config.json";
import { moveIntoDirectory } from "../../file-utils/moving/move-file";
const open = require('open');

export async function moveScreenshotsInDedicatedDirectory(recognizedImages: RecognizedImage[]): Promise<void> {
    await recognizedImages.forEach(
        recognizedImage => {
                if(recognizedImage.getAllClassNames().some(className => config.screenshot.keyworkds.includes(className))){
                    moveIntoDirectory(
                        recognizedImage.getImagePath(),
                        config.blurriness.directory
                    )
                }
        } 
    );
    if(config.screenshot.openAfterProcessing){
        open(config.screenshot.directory)
    }
}