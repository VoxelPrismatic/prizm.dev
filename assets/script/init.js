var scripts = [
    "find",
    "other",
    "delay",
    "accessibility",

    "aesthetic/colors",
    "aesthetic/flicker",
    "aesthetic/dynamic",

    "redirect/urls",
    "redirect/shorts",

    "load",
];

function loadPage() {
    // In case of error/404 page
}

function mark_page() {
    // In case the external markdown doesn't load right away
    return "<i>*still loading</i>";
}

if(loader) {
    scripts.push("content/" + loader);
    if(loader != "404")
        document.body.appendChild(tag({
            "tag": "div",
            "id": "jumper",
            "onclick": "jumpToEdge()",
            "#": "[V]"
        }));
}

function ready() {
    startLoading();
}

var numReady = 0;

function maybeReady(elem, index) {
    if(index == 1)
        console.groupCollapsed("Loading scripts");
    console.log(`Script '${elem.id}' loaded`);
    if(numReady == scripts.length) {
        console.groupEnd("Loading scripts");
        ready();
    }
}

var section = document.getElementById("scripts");

function nextReady(elem) {
    numReady += 1;
    maybeReady(elem, numReady);
}

elements = [
    {
        "tag": "a",
        "id": "hiddenlink"
    }
];


try {
    document.title = document.getElementById("title").content;
    document.getElementById("head").innerHTML = document.title;
} catch(err) {
}

for(var element of elements)
    section.appendChild(tag(element));

section.appendChild(tag({
    "tag": "!",
    "#": "NOTICE: This has a bunch of scripts that aren't organized. Enjoy looking though here!"
}));

for(var script of scripts) {
    var elem = {
        "tag": "script",
        "type": "text/javascript",
        "src": `/prizm.dev/assets/script/${script}.js`,
        "onload": "nextReady(this)",
        "onerror": "nextReady(this)",
        "id": `${script}.js`
    }
    section.appendChild(tag(elem));
}
