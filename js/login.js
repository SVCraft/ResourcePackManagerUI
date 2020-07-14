window.addEventListener("DOMContentLoaded", function() {
    var loginInput = document.getElementById("login--token");
    var loginButton = document.getElementById("login--button");

    loginInput.addEventListener("keydown", function(e) {
        console.log(e);
        if (e.key == "Enter") loginButton.click();
    });

    loginButton.addEventListener("click", function() {
        authorizationHeader = btoa(loginInput.value);
        sendPing(function(status, response, xhr) {
            alert(response);
        });
    });
});