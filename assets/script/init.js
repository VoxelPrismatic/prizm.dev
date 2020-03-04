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

var section = document.getElementById("scripts");

for(var script of scripts) {
    var elem = document.createElement("script");
    elem.type = "text/javascript";
    elem.src = `/prizm.dev/assets/script/${script}.js`;
    section.appendChild(elem);
}


startLoading();

window.onresize = resizeDicts;
window.onclick = changeFunnyTextThing;
window.onauxclick = changeFunnyTextThing;
