var editor;

function loadEditor(callback) {
    var loaderScript = document.createElement("script");
    loaderScript.src = "https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0/dev/vs/loader.js";
    loaderScript.onload = function() {
        require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0/dev/vs' }});

        require(['vs/editor/editor.main'], function() {
            console.log("hi");
            editor = monaco.editor.create(document.getElementById("files--secondary"));
        });
    };
    document.head.appendChild(loaderScript);

    window.addEventListener("resize", function() {
        editor.layout();
    });
}