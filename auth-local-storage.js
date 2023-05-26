export function setItem(key, item) {
    window.localStorage.setItem(key, item)
}

export function getItem(key) {
    return window.localStorage.getItem(key);
}

export function removeItem(key) {
    window.localStorage.removeItem(key);
}

export function clear() {
    window.localStorage.clear();
}
