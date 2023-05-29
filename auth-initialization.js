// In case we are in the login flow, this code must be run in the broswer popup.
// So, we have to save "code" parameter we get from the auth service and then close the popup.
const queryParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
})
const code = queryParams.code;
if (code) {
    window.localStorage.setItem("inpixio-online_auth-code", code);
    window.close();
    document.getElementsByTagName("body")[0].innerHTML = "Thank You!";
}

if (queryParams.logout) {
    window.close();
}
