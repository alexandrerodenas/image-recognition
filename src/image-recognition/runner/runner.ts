import { RecognizedImage } from "../analyzed-image";
import { ImageRecognizer } from "../image-recognizer";
import { TensorFlowImageRecognizer } from "../tensorflow/tf-image-recognizer";

export class RecognitionRunner {

    public static async runRecognitionOn(images: string[]): Promise<RecognizedImage[]> {
        console.log("running analysis...")
        const imageRecognizer: ImageRecognizer = await TensorFlowImageRecognizer.create();
        return Promise.all(images.map(image => imageRecognizer.recognize(image)));
    }
}