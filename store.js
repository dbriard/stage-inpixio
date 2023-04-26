export function setLocalStorage(todosJson) {
	window.localStorage.setItem('dotnet-wasm-inpixiolabs', todosJson);
}

export function getLocalStorage() {
	return window.localStorage.getItem('dotnet-wasm-inpixiolabs') || '[]';
};
