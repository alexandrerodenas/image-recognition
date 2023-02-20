import { toTensorImage } from "./image-converter";
import { RecognitionModels } from "./operations";
import { RecognitionOutput } from "./output";

export class RecognitionRunner {

    public static async runAnalysis(files: string[]): Promise<void> {
        console.log("running analysis...")
        return RecognitionModels.create().then(
            models => files
                .map(toTensorImage)
                .forEach(image => 
                    Promise.all([
                        models.detectObject(image),
                        models.classify(image)
                    ]).then(
                        detections => {
                            const objectsInScene = detections[0];
                            const classifiers = detections[1];
                            console.log(
                                new RecognitionOutput(
                                    objectsInScene,
                                    classifiers
                                ).toString()
                            )
                        }
                    )
            )
        );
    }
}