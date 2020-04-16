var scripts = [
    "find",
    "md/fn",
    "md/re",
    "md/mk/table",
    "md/mk/ol",
    "md/mk/ul",
    "md/mk/head",
    "md/mark",
    "aesthetic/collapse",
    "aesthetic/dynamic",
    "other",
    "load",
    "aesthetic/colors_func",
    "aesthetic/colors",
    "redirect/urls",
    "redirect/shorts",
    "accessibility"
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

for(var script of scripts) {
    var elem = {
        "tag": "script",
        "type": "text/javascript",
        "src": `/prizm.dev/assets/script/${script}.js`,
        "onload": "nextReady()"
    }
    section.appendChild(tag(elem));
}
