// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { dotnet } from './dotnet.js'
import { environment } from './environment.js'

const is_browser = typeof window != "undefined";
if (!is_browser) throw new Error(`Expected to be running in a browser`);

const dotnetRuntime = await dotnet
    .withDiagnosticTracing(false)
    .withApplicationArgumentsFromQuery()
    .create();

const config = dotnetRuntime.getConfig();

let latestPaste = undefined;
if (navigator.userAgent.indexOf("Firefox") != -1) {
    window.addEventListener("paste", e => { latestPaste = e.clipboardData.getData("text"); alert(latestPaste); });
}

const exports = await dotnetRuntime.getAssemblyExports(config.mainAssemblyName);

window.addEventListener('beforeunload', (event) => {
    console.log("beforeUnload")
    exports.InPixioLabs.Web.Interop.Save.SaveSettings();
});

const terminationEvent = 'onpagehide' in self ? 'pagehide' : 'unload';
console.log(terminationEvent)
window.addEventListener(terminationEvent, (event) => {
    console.log("terminationEvent")
    exports.InPixioLabs.Web.Interop.Save.SaveSettings();
});

/*

let latestPaste = undefined;
globalThis.addEventListener("paste", (e) => latestPaste = (e.clipboardData || window.clipboardData).getData("text"));

function getCpText(e) {
    e.preventDefault();
    latestPaste = (e.clipboardData || window.clipboardData).getData("text");
    console.log("pasted text:");
    console.log(latestPaste);
    //var pastedText = undefined;
    //if (window.clipboardData && window.clipboardData.getData) {
    //    pastedText = window.clipboardData.getData('Text');
    //}
    //else if (e.clipboardData && e.clipboardData.getData) {
    //    pastedText = e.clipboardData.getData('text/plain');
    //}
    //unityInstance.SendMessage(gameObjectName, voidName, pastedText);
}

if (navigator.userAgent.indexOf("Firefox") != -1) {
    document.onpaste = getCpText;
}*/

await dotnetRuntime.runMainAndExit(config.mainAssemblyName, [`Environment=${environment}`]);
