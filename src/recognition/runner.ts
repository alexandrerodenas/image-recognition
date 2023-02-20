import { printRecognitionOutput } from "./recognition-output-printer";
import { TensorFlowImageRecognizer } from "./tensorflow/tf-image-recognizer";

export class RecognitionRunner {

    public static async runAnalysis(files: string[]): Promise<void> {
        console.log("running analysis...")
        return TensorFlowImageRecognizer.create()
            .then(
                models => files
                    .forEach(image =>
                        Promise.all([
                            models.detectObjects(image),
                            models.classifyScene(image)
                        ]).then(
                            detections => {
                                const objectsInScene = detections[0];
                                const classifiers = detections[1];
                                console.log(
                                    printRecognitionOutput(
                                        objectsInScene,
                                        classifiers
                                    )
                                )
                            }
                        )
                    )
            );
    }
}