import { RecognizedImage } from "../analyzed-image";
import { TensorFlowImageRecognizer } from "../tensorflow/tf-image-recognizer";

export class RecognitionRunner {

    public static async runAnalysis(images: string[]): Promise<void> {
        console.log("running analysis...")
        return TensorFlowImageRecognizer.create()
            .then(
                recognizer => images
                    .forEach(image => {
                        recognizer.recognize(image).then(recognizedImage => console.log(recognizedImage.toString()));
                    }
                )
            );
    }
}