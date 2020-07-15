window.addEventListener("DOMContentLoaded", function() {
    var listButton = document.getElementById("list--button");

    listButton.addEventListener("click", function() {
        listButton.setAttribute("disabled", "disabled");

        sendList(null, function(status, response, xhr) {
            //alert(response);
            var fileWindow = document.getElementById("file--window");
            fileWindow.innerHTML = "";
            var h1 = document.createElement("h1");
            h1.appendChild(document.createTextNode(response));
            fileWindow.appendChild(h1);            
            listButton.removeAttribute("disabled");
        });
    });
});
