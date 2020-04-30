var scripts = [
    "find",
    "other",
    "unidata",
    "delay",
    "accessibility",

    "aesthetic/colors_func",
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

if(loader) {
    scripts.push("content/" + loader);
    if(loader != "404") {
        document.body.appendChild(tag({
            "tag": "div",
            "id": "jumper",
            "onclick": "jumpToEdge()",
            "#": "[V]"
        }));
    }
}

function ready() {
    startLoading();
    window.onclick = changeFunnyTextThing;
    window.onauxclick = changeFunnyTextThing;
}

var numReady = 0;

function maybeReady(elem, index) {
    console.log(`Script '${elem.id}' loaded`);
    if(numReady == scripts.length)
        ready();
}

var section = document.getElementById("scripts");

function nextReady(elem) {
    numReady += 1;
    maybeReady(elem, numReady);
};

elements = [
    {
        "tag": "div",
        "id": "file"
    }, {
        "tag": "a",
        "id": "hiddenlink"
    }
];


try {
    document.title = document.getElementById("title").content;
    document.getElementById("head").innerHTML = document.title;
} catch(err) {
}

for(var element of elements) {
    section.appendChild(tag(element));
}

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
        "id": `${script}.js`
    }
    section.appendChild(tag(elem));
}
