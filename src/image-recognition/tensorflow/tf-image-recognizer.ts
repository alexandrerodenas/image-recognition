import * as cocoSsd from '@tensorflow-models/coco-ssd/dist';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Tensor3D } from "@tensorflow/tfjs-core";
import * as tfnode from "@tensorflow/tfjs-node";
import { forkJoin, map, mergeMap, Observable, of, tap } from "rxjs";
import { getBlurrinessOf } from "../../post-processing/blurry/blurriness-handler";
import { ImageRecognizer } from "../image-recognizer";
import { DetectedObject, SceneClassifier } from "../recognizable-objects";
import { RecognizedImage } from "../recognized-image";
import { toTensorImage } from "./tf-image-converter";

export class TensorFlowImageRecognizer implements ImageRecognizer {

    private constructor(
        private readonly objectModel: cocoSsd.ObjectDetection,
        private readonly sceneClassifierModel: mobilenet.MobileNet
    ) {
    }

    public recognize(imagePath: string): Observable<RecognizedImage> {
        return of(toTensorImage(imagePath) as Tensor3D)
            .pipe(
                mergeMap(tensorFlowImage => 
                    forkJoin([
                        this.objectModel.detect(tensorFlowImage),
                        this.sceneClassifierModel.classify(tensorFlowImage),
                        getBlurrinessOf(imagePath)
                    ]).pipe(
                        map(([detectedObjectsFromTf, sceneClassifiersFromTf, blurriness]) => {
                            const detectedObjects = detectedObjectsFromTf
                                .map(detectedObject => new DetectedObject(
                                    detectedObject.class,
                                    detectedObject.score
                                ));
                            const sceneClassifiers = sceneClassifiersFromTf
                                .map(sceneClassifier => new SceneClassifier(
                                    sceneClassifier.className.split(', '),
                                    sceneClassifier.probability
                                ));
                            console.log(tfnode.memory())
                            tfnode.dispose(tensorFlowImage)
                            return new RecognizedImage(
                                imagePath,
                                blurriness,
                                detectedObjects,
                                sceneClassifiers
                            );
                        })
                    )
                )
            )
    }

    public static create(): Observable<ImageRecognizer> {
        console.log("loading models...");
        return forkJoin([
            cocoSsd.load(),
            mobilenet.load()
        ]).pipe(
            map(([objectModel, sceneClassifierModel]) =>
                new TensorFlowImageRecognizer(
                    objectModel,
                    sceneClassifierModel
                )
            ),
            tap(() => console.log(tfnode.memory()))
        );

    }
}