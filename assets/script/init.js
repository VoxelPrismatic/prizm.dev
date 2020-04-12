var scripts = [
    "find",
    "aesthetic/md",
    "aesthetic/collapse",
    "aesthetic/dynamic",
    "other",
    "load",
    "aesthetic/colors_func",
    "aesthetic/colors",
    "redirect/urls",
    "redirect/shorts",
    "accessibilty"
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
    console.log(`Script '${scripts[index]}.js' loaded`);
    if(numReady == scripts.length)
        ready();
}

var section = document.getElementById("scripts");

function nextReady() {
    numReady += 1;
    maybeReady(numReady - 1);
};

for(var script of scripts) {
    var elem = {
        "tag": "script",
        "type": "text/javascript",
        "src": `/prizm.dev/assets/script/${script}.js`,
        "onload": "nextReady()"
    }
    section.appendChild(tag(elem));
}
