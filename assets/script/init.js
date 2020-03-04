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
    var elem = `<script type="text/javascript" `;
    elem += `src="/prizm.dev/assets/script/${script}.js">`;
    elem += "</script";
    section.innerHTML += elem;
}
