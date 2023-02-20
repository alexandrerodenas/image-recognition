const glob = require("glob")

export function listFilesAt(pathPattern: string) : string[] {
    console.log("scanning directory...");
    return glob.sync(pathPattern);
}