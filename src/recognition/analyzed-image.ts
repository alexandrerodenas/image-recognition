import { DetectedObject, SceneClassifier } from "./recognizable-objects";

export class RecognizedImage {
    constructor(
        private readonly imagePath: string,
        private readonly detectedObjects: DetectedObject[],
        private readonly sceneClassifiers: SceneClassifier[] 
    ){
    }

    public toString(): string {
        const detectedObjectsToString = this.detectedObjects.map(detectedObject => detectedObject.toString()).join('\n');
        const sceneClassifications = this.sceneClassifiers.map(sceneClassifier => sceneClassifier.toString()).join('\n');
        return `${detectedObjectsToString}\n${sceneClassifications}\n--------------\n`;
    }
}