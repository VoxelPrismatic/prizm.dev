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

function nextScript(index = 0) {
    var section = document.getElementById("scripts");
    var script = scripts[index];
    if(script == undefined)
        return ready();
    var elem = document.createElement("script");
    elem.type = "text/javascript";
    elem.src = `/prizm.dev/assets/script/${script}.js`;
    elem.onload = function(){nextScript(index + 1)};
    section.appendChild(elem);
    console.log(script + ".js loaded");
}

function ready() {
    startLoading();
    window.onresize = resizeDicts;
    window.onclick = changeFunnyTextThing;
    window.onauxclick = changeFunnyTextThing;
}

nextScript();
