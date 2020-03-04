var scripts = [
    "find",
    "md",
    "collapse",
    "dynamic",
    "other",
    "load",
    "content/" + loader,
    "colors"
]


function ready(name) {
    console.log(name + ".js loaded");
    if(name != "colors")
        return;
    startLoading();
    window.onresize = resizeDicts;
    window.onclick = changeFunnyTextThing;
    window.onauxclick = changeFunnyTextThing;
}

var section = document.getElementById("scripts");

for(var script of scripts) {
    var elem = document.createElement("script");
    elem.type = "text/javascript";
    elem.src = `/prizm.dev/assets/script/${script}.js`;
    elem.onload = function(){ready(script)};
    section.appendChild(elem);
}
