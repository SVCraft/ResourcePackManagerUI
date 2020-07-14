var apiBase = "https://rpmapi.bkaw.cf/";

function sendRequest(endpoint, method, callback) {
    if (!method) method = "GET";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.response);
        }
    }
    xhr.open(method, endpoint);
    xhr.send();
}
