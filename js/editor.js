var editor;
var modelCache = {};

function loadEditor(callback) {
    openSecondaryPage("files--editor--container");
    var editorContainer = document.getElementById("files--editor");
    editorContainer.innerHTML = "<i class=\"fas fa-spinner fa-spin fa-10x\"></i>";

    var loaderScript = document.createElement("script");
    loaderScript.src = "https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0/dev/vs/loader.js";
    loaderScript.onload = function() {
        require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0/dev/vs' }});

        require(['vs/editor/editor.main'], function() {
            editorContainer.innerHTML = "";
            editor = monaco.editor.create(editorContainer);
            callback();
        });
    };
    document.head.appendChild(loaderScript);

    window.addEventListener("resize", function() {
        editor.layout();
    });
}

function ensureEditorLoaded(callback) {
    if (typeof monaco !== "undefined") callback();
    else loadEditor(callback);
}