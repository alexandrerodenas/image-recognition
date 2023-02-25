import * as config from '../config.json';
const glob = require("glob")

export function getImagesToProcess(): string[] {
    const directoryToScan = config.directoryToScan;
    const files = listFilesAt(directoryToScan);
    return files.filter(isImage);
}

function listFilesAt(pathPattern: string) : string[] {
    console.log("scanning directory...");
    const files = glob.sync(pathPattern);
    console.log(`scanning ${files.length} files`);
    return files;
}

function isImage(path: string) : boolean {
    return config.extensionsForImages.some(extension => path.endsWith(`.${extension}`));
}