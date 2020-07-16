var currentPath = "";

var fileIcons = {
    "png": "file-image",
    "js": "file-code",
    "ogg": "file-audio",
    "zip": "file-archive",
    "txt": "file-alt",
    "json": "file-alt",
    "mcmeta": "file-alt"
};

window.addEventListener("DOMContentLoaded", function() {
    var listButton = document.getElementById("list--button");

    listButton.addEventListener("click", function() {
        list();
    });
});

function list() {
    sendList(currentPath, function (status, response, xhr) {
        if (status == 200) {
            var filesWindow = document.getElementById("files--window");
            var json = JSON.parse(response);

            filesWindow.innerHTML = "";
            for (var i = 0; i < json.length; i++) {
                var file = json[i];
                var fileElement = document.createElement("div");

                fileElement.className = "file-entry";
                fileElement.setAttribute("name", file.name);
                var icon = document.createElement("i");

                var iconName;
                if (file.type == "file") {
                    iconName = "file";
                    var extention = file.name.substr(file.name.lastIndexOf(".") + 1);
                    var specialFileIcon = fileIcons[extention];
                    if (specialFileIcon) {
                        iconName = specialFileIcon;
                    }
                }
                else if (file.type == "folder") iconName = "folder";
                else iconName = "question-circle";

                icon.className = "fas fa-fw fa-"+ iconName;

                fileElement.appendChild(icon);

                var nameElement = document.createElement("span");
                nameElement.className = "file-entry--name";
                nameElement.appendChild(document.createTextNode(file.name));
                fileElement.appendChild(nameElement);

                if (file.type == "folder") {
                    fileElement.addEventListener("click", function() {
                        currentPath += this.getAttribute("name");
                        list();
                    });

                    fileElement.addEventListener("mouseover", function() {
                        this.firstChild.className = "fas fa-fw fa-folder-open";
                    });
                    fileElement.addEventListener("mouseout", function() {
                        this.firstChild.className = "fas fa-fw fa-folder";
                    });
                }

                filesWindow.appendChild(fileElement);
            }
        } else {
            alert("Failed to list files. "+ response);
        }
    });
}