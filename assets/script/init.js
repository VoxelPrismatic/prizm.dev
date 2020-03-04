var scripts = [
    "find",
    "md",
    "collapse",
    "dynamic",
    "other",
    "load",
    "colors"
];

function loadPage() {
    // In case of error/404 page
}

if(loader)
    scripts.push("content/" + loader);

function ready() {
    startLoading();
    window.onresize = resizeDicts;
    window.onclick = changeFunnyTextThing;
    window.onauxclick = changeFunnyTextThing;
}

var numReady = 0;

function maybeReady(index) {
    console.log(scripts[index] + ".js loaded");
    if(numReady == scripts.length)
        ready();
}

var section = document.getElementById("scripts");

for(var script of scripts) {
    var elem = document.createElement("script");
    elem.type = "text/javascript";
    elem.src = `/prizm.dev/assets/script/${script}.js`;
    elem.onload = function() {
        numReady += 1;
        maybeReady(numReady - 1);
    };
    section.appendChild(elem);
}
