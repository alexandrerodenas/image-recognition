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
        return `${this.imagePath}\n${detectedObjectsToString}\n${sceneClassifications}\n--------------\n`;
    }

    public getImagePath(): string {
        return this.imagePath;
    }

    public getAllClassNames(): string[] {
        return this.sceneClassifiers
            .map(sceneClassifier => sceneClassifier.classNames)
            .reduce((arr, acc) => arr.concat(acc));
    }
}