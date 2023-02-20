import { DetectedObject, SceneClassifier } from "./recognizable-objects";
import * as config from "../config.json";

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

    public getImagePath(): string {
        return this.imagePath;
    }

    public isScreenshot(): boolean {
        const allClassNames: string[] = this.sceneClassifiers
            .map(sceneClassifier => sceneClassifier.classNames)
            .reduce((arr, acc) => arr.concat(acc));
        
        return allClassNames.some(className => config.keywords.screenshots.includes(className));
    }
}