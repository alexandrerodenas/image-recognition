import * as cocoSsd from '@tensorflow-models/coco-ssd/dist';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { DetectedObject } from '@tensorflow-models/coco-ssd/dist';

export class RecognitionModels {

    constructor(
        private readonly objectModel: cocoSsd.ObjectDetection,
        private readonly classifier: mobilenet.MobileNet
    ) {
    }

    public async detectObject(imageTensor: any): Promise<DetectedObject[]> {
        return await this.objectModel.detect(imageTensor);
    }

    public async classify(imageTensor: any) {
        return await this.classifier.classify(imageTensor);
    }

    public static async create(): Promise<RecognitionModels> {
        return new RecognitionModels(
            await cocoSsd.load(),
            await mobilenet.load()
        )
    }
}
