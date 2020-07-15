window.addEventListener("DOMContentLoaded", function() {
    var listButton = document.getElementById("list--button");

    listButton.addEventListener("click", function() {

        sendList(null, function(status, response, xhr) {
            alert(response);
        });
    });
});
