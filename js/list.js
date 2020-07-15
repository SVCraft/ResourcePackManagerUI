window.addEventListener("DOMContentLoaded", function() {
    var listButton = document.getElementById("list--button");

    listButton.addEventListener("click", function() {
        listButton.setAttribute("disabled", "disabled");

        sendList(null, function(status, response, xhr) {
            //alert(response);
            document.getElementById("file--window").innerHTML = `<h1>${response}</h1>`;
            listButton.removeAttribute("disabled");
        });
    });
});
