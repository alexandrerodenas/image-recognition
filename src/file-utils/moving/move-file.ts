import * as fs from 'fs';
import * as path from 'path';

export function moveIntoDirectory(file: string, directory: string): void {
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory, { recursive: true });
    }
    fs.renameSync(
        file, 
        path.join(directory, path.basename(file))
    );
}