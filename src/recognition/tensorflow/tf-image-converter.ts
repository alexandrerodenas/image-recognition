import * as tfnode from "@tensorflow/tfjs-node";
import { Tensor3D, Tensor4D } from "@tensorflow/tfjs-node";

const fs = require('fs');

export function toTensorImage(imagePath: string): Tensor3D | Tensor4D {
    const imageAsFile = fs.readFileSync(imagePath);
    return tfnode.node.decodeImage(new Uint8Array(imageAsFile), 3);
}