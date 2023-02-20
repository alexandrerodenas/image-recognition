import { ImageRecognizer } from "../image-recognizer";
import { DetectedObject, SceneClassifier } from "../recognizable-objects";
import * as cocoSsd from '@tensorflow-models/coco-ssd/dist';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { toTensorImage } from "./tf-image-converter";
import { Tensor3D } from "@tensorflow/tfjs-core";
import { RecognizedImage } from "../analyzed-image";

export class TensorFlowImageRecognizer implements ImageRecognizer {

    private constructor(
        private readonly objectModel: cocoSsd.ObjectDetection,
        private readonly classifier: mobilenet.MobileNet
    ) {
    }
    
    public async recognize(imagePath: string): Promise<RecognizedImage> {
        const tensorFlowImage = toTensorImage(imagePath) as Tensor3D;
        return Promise.all([
            this.objectModel.detect(tensorFlowImage),
            this.classifier.classify(tensorFlowImage)
        ]).then(
            detections => {
                const detectedObjects = detections[0]
                    .map(detectedObject => new DetectedObject(
                        detectedObject.class,
                        detectedObject.score
                    ));
                const sceneClassifiers = detections[1]
                    .map(sceneClassifier => new SceneClassifier(
                        sceneClassifier.className,
                        sceneClassifier.probability
                    ));
                return new RecognizedImage(
                    imagePath,
                    detectedObjects,
                    sceneClassifiers
                );
            }
        )
    }

    public static async create(): Promise<ImageRecognizer> {
        return new TensorFlowImageRecognizer(
            await cocoSsd.load(),
            await mobilenet.load()
        )
    }
}