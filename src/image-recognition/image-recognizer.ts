import { RecognizedImage } from "./recognized-image";
import { Observable } from 'rxjs';

export interface ImageRecognizer {
    recognize(image: string): Observable<RecognizedImage>;
}