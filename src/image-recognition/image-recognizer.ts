import { RecognizedImage } from "./recognized-image";

export interface ImageRecognizer {
    recognize(image: string): Promise<RecognizedImage>;
}