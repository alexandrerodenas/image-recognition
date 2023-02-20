import { DetectedObject } from "@tensorflow-models/coco-ssd/dist";

interface ImageClassifier {
    className: string,
    probability: number
}

export class RecognitionOutput {

    constructor(
        private readonly detectedObjects: DetectedObject[],
        private readonly classifiers: ImageClassifier[]
    ) {}

    public toString(): string {
        const detectedObjectsToString = this.detectedObjects
            .map(detectedObject => `${detectedObject.class} (${detectedObject.score.toFixed(2)})`)
            .join('\n');
        const classifiersToString = this.classifiers
            .map(classifier => `${classifier.className} (${classifier.probability.toFixed(2)})`)
            .join('\n')
        return `${detectedObjectsToString}\n${classifiersToString}\n---------------\n`
    }
}