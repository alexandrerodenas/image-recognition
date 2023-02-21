export function resolveAllWithProgression<T>(promises: Promise<T>[]): Promise<T[]> {
    const numberOfPromises = promises.length;
    let current = 0;
    return Promise.all(
        promises
            .map(
                promise => {
                    console.log(`Progression: ${++current}/${numberOfPromises}`);
                    return promise;
                }
            )
    )
}