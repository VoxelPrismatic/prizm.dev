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
    for(var thing of [1, 2, 3, 4, 5, 6]) {
        for(var elem of $all("h" + thing)) {
            elem.onclick = function() {
                linkMe(this);
            }
            elem.onfocus = function() {
                flickery_element(this);
            }
        }
    }
    window.setInterval(flickery_element, 15000, $("h1#head"));
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

function loadFooter() {
}

function linkMe(elem) {
    elem.scrollIntoView({behavior: "smooth"});
    var id = elem.id;
    if(id[0] != "#") {
        id = "#" + id;
    }
    window.history.replaceState(window.history.state, document.title, id);
}

function flickery_element(h) {
    delayFunction(function(h){h.style.transition = "none";}, 1000, 1001, 1000, h);
    var shown = true;
    var halfOpacity = compSty(h).color;
    halfOpacity = "rgba(" + halfOpacity.split("(")[1].slice(0, -1) + ", 0.7)";
    for(var x = 1500; x <= 3000; x += Math.floor(Math.random() * 200) + 25) {
        shown = !shown;
        if(!shown)
            delayFunction(function(h){h.style.color = halfOpacity;}, x, x + 1, x, h);
        else
            delayFunction(function(h){h.style.color = "";}, x, x + 1, x, h);
    }
    delayFunction(function(h){h.style.transition = "";}, x - 25, x, 5, h);
    delayFunction(function(h){h.style.color = halfOpacity;}, x - 50, x - 49, x, h);
    delayFunction(function(h){h.style.color = "";}, x, x + 1, x, h);
}
