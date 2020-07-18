/**
 * A callback for api requests
 *
 * @callback requestCallback
 * @param {number} status The http status code the request responses with
 * @param {any} response The message the request responsed with. Will be the type that was specified in the request's responseType
 * @param {XMLHttpRequest} request The request that was sent
 */

var apiBase = "https://rpmapi.bkaw.cf/";
var authorizationHeader = null;
var lastApiRequest = null;

/**
 * Send a XMLHttpRequest to the specified api endpoint
 * 
 * @param {string} url The endpoint to request to, not starting with a /
 * @param {string} [method = "GET"] The method to use, if not specified defaults to GET
 * @param {any} body The request body to send, only works if the method is not GET (POST)
 * @param {string} responseType The type of the response.
 * @param {boolean} authenticate Whether to authenticate the request
 * @param {requestCallback} callback The callback function to call when the request is done
 */
function sendRequest(url, method, body, responseType, authenticate, callback) {
    if (!method) method = "GET";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            callback(this.status, this.response, this);
            if (this.status == 0) {
                var apiStatus = document.getElementById("api-status");
                apiStatus.innerHTML = "Down";
                apiStatus.className = "badge badge-danger";
            } else {
                var apiStatus = document.getElementById("api-status");
                apiStatus.innerHTML = "Operational";
                apiStatus.className = "badge badge-success";
            }
        }
    }
    xhr.open(method, apiBase + url);

    if (authenticate) xhr.setRequestHeader("Authorization", authorizationHeader);
    if (responseType) xhr.responseType = responseType;

    if (body) xhr.send(body);
    else xhr.send();
    setTimeout(function() {
        if (xhr.readyState <= 1) {
            var apiStatus = document.getElementById("api-status");
            apiStatus.innerHTML = "Waking Up";
            apiStatus.className = "badge badge-warning";
        }
    }, 2500);

    lastApiRequest = new Date();
}

/**
 * Send an authenticated XMLHttpRequest to the specified api endpoint including the Authoriaztion header
 * 
 * @see {@link sendRequest}
 */
function sendAuthenticatedRequest(url, method, body, responseType, callback) {
    sendRequest(url, method, body, responseType, true, callback);
}

/**
 * Send an unauthenticated XMLHttpRequest to the specified api endpoint not including the Authoriaztion header
 * 
 * @see {@link sendRequest}
 */
function sendUnauthenticatedRequest(url, method, body, responseType, callback) {
    sendRequest(url, method, body, responseType, false, callback);
}

/**
 * Send a request to the no operation (noop) endpoint. Makes sure the
 * repl.it api is awake, and if it isn't it will start waking up and
 * will hopefully be fully awake by the time the login requests are
 * sent.
 */
function sendNoop() {
    sendUnauthenticatedRequest("noop", null, null, null, function noop() {});
}

/**
 * Send a ping to the api to make sure the entered token is correct.
 * 
 * @param {requestCallback} callback 
 */
function sendPing(callback) {
    sendAuthenticatedRequest("ping", null, null, null, callback);
}

/**
 * Send a list request to the api listing the specified directory or the root directory
 * 
 * @param {string} [folder] The folder to list, if not specified list root
 * @param {requestCallback} callback A callback with the response being a json string
 */
function sendList(folder, callback) {
    var url = "list";
    if (typeof folder == "string" && folder.length > 0) url += "?folder="+ encodeURIComponent(folder);
    sendAuthenticatedRequest(url, null, null, null, callback);
}

/**
 * Send a read request to the api read the specified file
 * 
 * @param {string} [folder] The file to read
 * @param {string} [responseType] The type of the response
 * @param {requestCallback} callback A callback with the response being the file content
 */
function sendRead(file, responseType, callback) {
    if (typeof callback == "undefined" && typeof responseType == "function") {
        callback = responseType;
        responseType = undefined;
    }
    sendAuthenticatedRequest("read?file="+ encodeURIComponent(file), null, null, responseType, callback);
}