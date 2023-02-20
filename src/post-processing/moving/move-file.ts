import * as fs from 'fs';

export function move(source: string, destination: string): void {
    fs.renameSync(source, destination);
}