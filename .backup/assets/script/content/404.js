function loadPage() {
    var data = JSON.parse(load("/prizm.dev/assets/data/404.json").replace(/\\\n/gm, "\\n"));
    var thing = document.URL.split("/prizm.dev/")[1].split("?")[0].split("#")[0];
    var stuff = data[thing] || data[thing.slice(0, -1)];
    if(stuff) {
        setHtml("404", `\
<h1>#] Hey mate, you shouldn't be here.</h1>
But GG, you found where the ${stuff[0]} are stored.<br>
In here, you can find several things like ${stuff[1]}<br>
<a href="https://github.com/VoxelPrismatic/prizm.dev/tree/master/${thing}" target="_blank">[Goto in REPO]</a>`);
    }
}
