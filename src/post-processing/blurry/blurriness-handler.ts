import { Blurriness } from "@bstrickl/blurriness";
import { from, Observable, take, tap } from "rxjs";
import * as config from "../../config.json";
import { moveIntoDirectory } from "../../file-system/move-file";
import { RecognizedImage } from "../../image-recognition/recognized-image";
const open = require('open');

export function getBlurrinessOf(imagePath: string): Observable<number> {
    return from(Blurriness.getBlurrinessAsync(imagePath));
}

export function moveIfBlurry(recognizedImage: RecognizedImage): void {
    if(recognizedImage.getBlurriness() > config.blurriness.threshold){
        moveIntoDirectory(
            recognizedImage.getImagePath(),
            config.blurriness.directory
        )
    }
}