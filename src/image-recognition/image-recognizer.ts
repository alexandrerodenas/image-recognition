import { RecognizedImage } from "./analyzed-image";

export interface ImageRecognizer {
    recognize(image: string): Promise<RecognizedImage>;
}