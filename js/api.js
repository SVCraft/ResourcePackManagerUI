var apiBase = "https://rpmapi.bkaw.cf/";
var authorizationHeader = null;

function sendAuthenticatedRequest(url, method, body, responseType, callback) {
    if (!method) method = "GET";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.response);
        }
    }
    xhr.open(method, apiBase + url);
    xhr.setRequestHeader("Authorization", authorizationHeader);
    if (responseType) {
        xhr.responseType = responseType;
    }
    if (body) {
        xhr.send(body);
    } else {
        xhr.send();
    }
}

function sendPing(callback) {
    sendAuthenticatedRequest("ping", null, null, null, callback);
}