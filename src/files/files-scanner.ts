const glob = require("glob")

export function listFilesIn(pathPattern: string) : string[] {
    console.log("scanning directory...");
    return glob.sync(pathPattern);
}