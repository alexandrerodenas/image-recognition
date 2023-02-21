import { moveIntoDirectory } from "../../file-utils/moving/move-file";
import { RecognizedImage } from "../../image-recognition/recognized-image";
import * as config from "../../config.json";
import { Blurriness } from "@bstrickl/blurriness";
const open = require('open');

export async function moveBlurryImagesIntoDedicatedDirectory(recognizedImages: RecognizedImage[]): Promise<void> {
    await recognizedImages.forEach(
        recognizedImage => Blurriness.getBlurrinessAsync(recognizedImage.getImagePath())
        .then(
            blurriness => {
                if(blurriness > config.blurriness.threshold){
                    moveIntoDirectory(
                        recognizedImage.getImagePath(),
                        config.blurriness.directory
                    )
                }
            }
        )
    );
    open(config.blurriness.directory)
}