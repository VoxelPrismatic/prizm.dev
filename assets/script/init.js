var scripts = [
    "find",
    "md",
    "collapse",
    "dynamic",
    "other",
    "load",
    "content/" + loader,
    "colors"
];

function ready() {
    startLoading();
    window.onresize = resizeDicts;
    window.onclick = changeFunnyTextThing;
    window.onauxclick = changeFunnyTextThing;
}

var numReady = 0;

function maybeReady(name) {
    console.log(name + ".js loaded");
    if(numReady == scripts.length)
        ready();
}

for(var script of scripts) {
    var elem = document.createElement("script");
    elem.type = "text/javascript";
    elem.src = `/prizm.dev/assets/script/${script}.js`;
    elem.onload = function() {
        numReady += 1;
        maybeReady(script);
    };
    section.appendChild(elem);
}
