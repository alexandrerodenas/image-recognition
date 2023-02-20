import { DetectedObject, SceneClassifier } from "./recognizable-objects";

export function printRecognitionOutput(
    detectedObjects: DetectedObject[],
    sceneClassifiers: SceneClassifier[]
) {
    return `${detectedObjects
            .map(detectedObject => detectedObject.toString())
            .join('\n')}\n
        ${sceneClassifiers
            .map(sceneClassifier => sceneClassifier.toString()).join('\n')
        }\n--------------\n`
}