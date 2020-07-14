window.addEventListener("DOMContentLoaded", function() {
    var loginInput = document.getElementById("login--token");
    var loginButton = document.getElementById("list--button");

    loginButton.addEventListener("click", function() {
        loginButton.setAttribute("disabled", "disabled");

        authorizationHeader = btoa(loginInput.value);
        sendList(function(status, response, xhr) {
            alert(response);
        });
    });
});
