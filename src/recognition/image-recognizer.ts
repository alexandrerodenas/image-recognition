import { DetectedObject, SceneClassifier } from "./recognizable-objects";

export interface ImageRecognizer {
    detectObjects(image: string):  Promise<DetectedObject[]>; 
    classifyScene(image: string): Promise<SceneClassifier[]>;
}