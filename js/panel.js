var currentPath = "";

var fileExtentionInfo = {
    "png": { icon: "file-image", type: "image" },
    "ogg": { icon: "file-audio", type: "sound" },
    "zip": { icon: "file-archive", type: null },
    "js": { icon: "file-code", type: "text" },
    "txt": { icon: "file-alt", type: "text" },
    "json": { icon: "file-alt", type: "text" },
    "mcmeta": { icon: "file-alt", type: "text" }
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

                var extention = file.name.substr(file.name.lastIndexOf(".") + 1);
                var extentionInfo = fileExtentionInfo[extention];

                var iconName;
                if (file.type == "file") {
                    if (extentionInfo && extentionInfo.icon) {
                        iconName = extentionInfo.icon;
                    } else {
                        iconName = "file";
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
                } else if (file.type == "file") {
                    var type = extentionInfo ? extentionInfo.type : null;
                    
                    if (type == "text") {
                        fileElement.addEventListener("click", function() {
                            var filename = this.getAttribute("name");
                            ensureEditorLoaded(function() {
                                sendRead(currentPath + "/" + filename, function(status, response, xhr) {
                                    var model = monaco.editor.createModel(
                                        response,
                                        undefined, // language
                                        monaco.Uri.file(filename) // uri
                                    );

                                    editor.setModel(model);
                                });
                            });
                        });
                    }
                }

                filesWindow.appendChild(fileElement);
            }
        } else {
            alert("Failed to list files. "+ response);
        }
    });
}