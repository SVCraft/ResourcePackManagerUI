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
            if (response === "Pong! Your API key works.") {
              document.getElementById('login').style.display = "none";
              document.getElementById('panel').style.display = "block";
            } else {
            alert("Your API key was incorrect, Please try again!");
            loginButton.setAttribute("enabled", "enabled");
            }
        });
    });
});
