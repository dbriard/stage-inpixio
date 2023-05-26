export async function loginAsync(url, width, height) {
    window.open(url, "", `width=${width},height=${height}`);
    return await new Promise(resolve => {
        window.onstorage = function (e) {
            if (e.key == "inpixio-online_auth-code") {
                resolve();
            }
        };
    });
}


export function logout(url) {
    window.open(url, "", "width=1,height=1");
}


export function getCurrentUrl() {
    return window.location.href;
}
