window.addEventListener("DOMContentLoaded", function() {
    var loginInput = document.getElementById("login--token");
    var loginButton = document.getElementById("login--button");

    loginInput.addEventListener("keydown", function(e) {
        if (e.key == "Enter") loginButton.click();
    });

    loginButton.addEventListener("click", function() {
        loginButton.setAttribute("disabled", "disabled");

        authorizationHeader = btoa(loginInput.value);
        sendPing(function(status, response, xhr) {
            alert(response);
            if (response === "Pong! Your API key works.") console.log("logged in")
        });
    });
});
