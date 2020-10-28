async function try_url(url, not_found_page) {
    var subpage = await load(url);
    if(subpage != not_found_page)
        window.location = url;
}

async function loadPage() {
    var url = document.URL.split("#")[0].split("?")[0];
    var not_found_page = await load("/prizm.dev/404");
    // check for ending /, so index.html/ --> index.html
    if(document.URL.includes("/re/")) {
        url = document.URL.replace("/re/", "/");
        await try_url(url, not_found_page);
    } if(url.endsWith("/")) {
        url = url.slice(0, -1);
        await try_url(url, not_found_page) 
    } if(!url.endsWith(".html")) {
        url += ".html";
        try_url(url, not_found_page);
    }
    var data = await load("/prizm.dev/assets/data/404.json", {json: true});
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

async function load(filename, strip = false, json = false, list = false) {
    if(!filename.endsWith("error.html"))
        find("head").innerHTML = document.title;
    else
        find("head").innerHTML = "ERROR ;[";
    console.log("Reading " + filename);
    if(strip.list)
        list = true;
    if(strip.json)
        json = true;
    var resp = await fetch(filename);
    var content = await resp.text();
    if(strip || list || json)
        content = content.trim();
    if(json)
        return JSON.parse(content.replace(/\\\n/gm, "\\n"));
    if(list)
        return content.split("\n");
    return content;
}
