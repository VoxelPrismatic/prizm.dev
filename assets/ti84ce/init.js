var scripts = [
    "emu",
    
    "prgm/" + prgm
];

function run() {
    // In case of error/404 page
}

function ready() {
    run();
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
