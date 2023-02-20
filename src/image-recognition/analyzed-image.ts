import { DetectedObject, SceneClassifier } from "./recognizable-objects";
import { SCREENSHOT_RECOGNITION_KEYWORKDS } from "./screenshots-recognition-keywords";

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

    public isScreenshot(): boolean {
        return this.sceneClassifiers.some(sceneClassifier => SCREENSHOT_RECOGNITION_KEYWORKDS.includes(sceneClassifier.className));
    }
}