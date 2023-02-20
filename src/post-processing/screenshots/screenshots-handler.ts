import { RecognizedImage } from "../../image-recognition/recognized-image";
import * as config from "../../config.json";
import { moveToDirectory as moveIntoDirectory } from "../../file-utils/moving/move-file";
const open = require('open');

export class ScreenshotsHandler {
    private readonly screenshots;

    constructor(
        recognizedImages: RecognizedImage[]
    ){
        this.screenshots = recognizedImages
            .filter(image => image.isScreenshot());
    }

    public moveIntoDedicatedDirectory(): void {
        this.screenshots
            .forEach(
                image => moveIntoDirectory(
                    image.getImagePath(),
                    config.screenshotDirectory
                )
            );
        open(config.screenshotDirectory)
    }

}