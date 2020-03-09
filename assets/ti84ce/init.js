var emuScripts = [];

let consts = [
    "color",
    "num"
];

let more = [
    "emu",
    "loadfont",
    "prgm/" + prgm
];

for(var l of "abcdefghijklmnopqrstuvwxyz") {
    emuScripts.push("catalog/fn/" + l + ".js");
    emuScripts.push("catalog/bts/" + l + ".js");
}

for(var c of consts) {
    emuScripts.push("catalog/const/" + c + ".js");
}

for(var m of more) {
    emuScripts.push(m + ".js");
}

function run() {
    // In case of error/404 page
}

function emuReady() {
    run();
    window.onresize = resizeDicts;
    window.onclick = changeFunnyTextThing;
    window.onauxclick = changeFunnyTextThing;
}

var numReady = 0;

function maybeEmuReady(index) {
    console.log(`Script '${scripts[index]}.js' loaded`);
    if(numReady == emuScripts.length)
        ready();
}

var section = document.getElementById("scripts");

function nextEmuReady() {
    numReady += 1;
    maybeReady(numReady - 1);
};

for(var script of emuScripts) {
    var elem = {
        "tag": "script",
        "type": "text/javascript",
        "src": `/prizm.dev/assets/ti84ce/${script}.js`,
        "onload": "nextEmuReady();"
    }
    section.appendChild(tag(elem));
}
