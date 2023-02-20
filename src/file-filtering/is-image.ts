const IMAGE_EXTENSIONS = ["jpeg", "jpg", "png"];

export function isImage(path: string) : boolean {
    return IMAGE_EXTENSIONS.some(extension => path.endsWith(`.${extension}`));
}