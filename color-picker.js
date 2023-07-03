export function getPixelColor(x, y) {
    const canvas = document.getElementsByTagName("canvas")[0];
    const context = canvas.getContext("webgl");
    const pixels = new Uint8Array(4);
    context.readPixels(x, context.drawingBufferHeight - y, 1, 1, context.RGBA, context.UNSIGNED_BYTE, pixels);
    return [pixels[0], pixels[1], pixels[2], pixels[3]];
}
