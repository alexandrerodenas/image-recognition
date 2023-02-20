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
        public readonly className: string,
        public readonly probability: number
    ){}

    public toString(): string {
        return `${this.className} (${this.probability.toFixed(2)})`
    }
}