async function loadNow() {
    globalThis.texts = await load("/prizm.dev/assets/text/footer.txt", {list: true});
    swapColor(theme);
    if(find("jumper")) {
        window.onscroll = changeScrollingThingy;
        window.ontouchmove = changeScrollingThingy;
    }
    window.onclick = changeFunnyTextThing;
    window.onauxclick = changeFunnyTextThing;
    window.ontouchend = changeFunnyTextThing;
    changeFunnyTextThing();
    window.onresize = function() {sub_styles(false)};
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
