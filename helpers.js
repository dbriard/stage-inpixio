/**
 * querySelector wrapper
 *
 * @param {string} selector Selector to query
 * @param {Element} [scope] Optional scope element for the selector
 */
export function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}

/**
 * addEventListener wrapper
 *
 * @param {Element|Window} target Target Element
 * @param {string} type Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} [capture] Capture the event
 */
export function $on(target, type, callback, capture) {
    target.addEventListener(type, callback, !!capture);
}

/**
 * Attach a handler to an event for all elements matching a selector.
 *
 * @param {Element} target Element which the event must bubble to
 * @param {string} selector Selector to match
 * @param {string} type Event name
 * @param {Function} handler Function called when the event bubbles to target
 *                           from an element matching selector
 * @param {boolean} [capture] Capture the event
 */
export function $delegate(target, selector, type, handler, capture) {
    const dispatchEvent = event => {
        const targetElement = event.target;
        const potentialElements = target.querySelectorAll(selector);
        let i = potentialElements.length;

        while (i--) {
            if (potentialElements[i] === targetElement) {
                handler.call(targetElement, event);
                break;
            }
        }
    };

    $on(target, type, dispatchEvent, !!capture);
}

export function getCurrentUrl() {
    let url = window.location.href;
    return url;
};

export function getToto() {
    return "toto";
};

export function getLastPastedText() {
    return latestPaste;
};

export function getPromptText(message, placeholder) {
    return prompt(message, placeholder);
};

export function isFirefox() {
    return navigator.userAgent.indexOf("Firefox") != -1;
}

export function initFirefoxPasteWorkaround() {
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        const avaloniaInputElement = document.querySelector("input.avalonia-input-element");
        avaloniaInputElement.contentEditable = true;
        //document.onpaste = (e) => {
        //	e.preventDefault();
        //	pastedText = (e.clipboardData || window.clipboardData).getData("text");
        //	console.log("pasted text:");
        //	console.log(pastedText);
        //};
        return true;
    }
    return false;
}

export async function openFilePicker() {
    //return img src
    return new Promise((resolve, reject) => {
        var input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = (e) => {
                var img = document.createElement("img");
                img.src = e.target.result;
                document.body.appendChild(img);
                resolve(e.target.result);
            };
            reader.readAsDataURL(file);
        };
        input.click();
    });
}

export function saveFile(byteArray, mimeType, fileName) {


    var blob = new Blob([byteArray], { type: mimeType });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
   
}
//export function () {
//	readClipboardTextAsync(): Promise < string > {
//		if(globalThis.navigator.clipboard.readText) {
//		return await globalThis.navigator.clipboard.readText();
//	}
//  else {
//		return this.latestPaste;
//	}
//}
//}