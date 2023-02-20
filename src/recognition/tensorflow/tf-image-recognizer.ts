import { ImageRecognizer } from "../image-recognizer";
import { DetectedObject, SceneClassifier } from "../recognizable-objects";
import * as cocoSsd from '@tensorflow-models/coco-ssd/dist';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { toTensorImage } from "./tf-image-converter";
import { Tensor3D } from "@tensorflow/tfjs-core";

export class TensorFlowImageRecognizer implements ImageRecognizer {

    private constructor(
        private readonly objectModel: cocoSsd.ObjectDetection,
        private readonly classifier: mobilenet.MobileNet
    ) {
    }

    public async detectObjects(image: string): Promise<DetectedObject[]> {
        const tensorFlowImage = toTensorImage(image) as Tensor3D;
        return await (await this.objectModel.detect(tensorFlowImage))
            .map(detectedObject => new DetectedObject(
                detectedObject.class,
                detectedObject.score
            ));
    }

    public async classifyScene(image: string): Promise<SceneClassifier[]> {
        const tensorFlowImage = toTensorImage(image) as Tensor3D;
        return await (await this.classifier.classify(tensorFlowImage))
            .map(sceneClassifier => new SceneClassifier(
                sceneClassifier.className,
                sceneClassifier.probability
            ));
    }

    public static async create(): Promise<TensorFlowImageRecognizer> {
        return new TensorFlowImageRecognizer(
            await cocoSsd.load(),
            await mobilenet.load()
        )
    }
}