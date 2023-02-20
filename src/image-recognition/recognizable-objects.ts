export class DetectedObject {
    constructor(
        public readonly name: string,
        public readonly probability: number
    ){}

    public toString(): string {
        return `${this.name} (${this.probability.toFixed(2)})`
    }
}

export class SceneClassifier {
    constructor(
        public readonly classNames: string[],
        public readonly probability: number
    ){}

    public toString(): string {
        return `${this.classNames.join(', ')} (${this.probability.toFixed(2)})`
    }
}