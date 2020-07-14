var apiBase = "https://rpmapi.bkaw.cf/";
var authorizationHeader = null;

function sendAuthenticatedRequest(url, method, body, responseType, callback) {
    if (!method) method = "GET";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            callback(this.status, this.response, this);
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

function sendList(callback) {
    sendAuthenticatedRequest("list", null, null, null, callback);
}
