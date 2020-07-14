window.addEventListener("DOMContentLoaded", function() {
    var loginInput = document.getElementById("login--token");
    var loginButton = document.getElementById("list--button");

    loginButton.addEventListener("click", function() {

        authorizationHeader = btoa(loginInput.value);
        sendList(function(status, response, xhr) {
            alert(response);
        });
    });
});
