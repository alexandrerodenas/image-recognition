import { RecognizedImage } from "../recognized-image";
import { ImageRecognizer } from "../image-recognizer";
import { TensorFlowImageRecognizer } from "../tensorflow/tf-image-recognizer";
import { resolveAllWithProgression } from "../../promise-utils/promise-resolver-with-projections";

export class RecognitionRunner {
    public static async runRecognitionOn(images: string[]): Promise<RecognizedImage[]> {
        console.log("running analysis...")
        const recognizer: ImageRecognizer = await TensorFlowImageRecognizer.create();
        return resolveAllWithProgression(images.map(image => recognizer.recognize(image)));
    }
}