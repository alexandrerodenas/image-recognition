import * as config from "../../config.json";

export function isImage(path: string) : boolean {
    return config.extensionsForImages.some(extension => path.endsWith(`.${extension}`));
}