/**
 * We need this code to be executed at the app startup to be able to access the Skia canvas context pixels.
 */

var getContext = HTMLCanvasElement.prototype.getContext;

HTMLCanvasElement.prototype.getContext = function () {
    if (arguments[1]) arguments[1].preserveDrawingBuffer = true;
    var context = getContext.apply(this, arguments);
    return context;
}
