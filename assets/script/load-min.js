async function loadNow() {
    globalThis.texts = await load("/prizm.dev/assets/text/footer.txt", {list: true});
    if(document.URL.endsWith("/prizm.dev/") && (new Date()).getMonth() == 9) {
        swapColor("orange");
        find("truelogo").src = "/prizm.dev/assets/image/priz_orange.png";
        find("head").innerHTML = "SPOOKY DEV ;]";
    } else {
        swapColor(theme);
    }
    if(find("jumper")) {
        if(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile)/i.test(window.navigator.userAgent))
            window.onscroll = changeScrollingThingy;
        else
            window.onwheel = (evt) => changeScrollingThingy(evt);
        window.ontouchmove = changeScrollingThingy;
    }
    window.onkeydown = (evt) => {
        if(!(evt.ctrlKey == true && evt.key == "I"))
            return;
        if(/Edge/i.test(window.navigator.userAgent))
            console.warn("Is this the old edge? Wow.");
        else if(/Chrome/i.test(window.navigator.userAgent))
            console.warn("Try out Firefox sometime, you'll be impressed!");
        if(/(Linux x86_64|Ubuntu)/i.test(window.navigator.userAgent))
            console.warn("Thanks for using the best operating system there is");
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
    flickery_element(elem);
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

function resizeDicts(log = true, element = document) {
    if((window.innerHeight + "" + window.innerWidth).includes("."))
        return;
    var height = compSty(">H1").height.slice(0, -2) / 2;
    if(log) {
        console.log("Window resized to " + window.innerWidth + "x" + window.innerHeight);
        console.log("Resizing elements");
    }
    var tooSmol = false;
    for(var thing of find_in(element, ">dict")) {
        var parent = thing.parentElement;
        if(parent.clientWidth == 0) {
            continue;
        }
        var width = parent.clientWidth - 5
        ;var thisWidth = width;
        var style = thing.style;
        thisWidth -= thing.nextElementSibling.clientWidth;
        thisWidth -= thing.previousElementSibling.clientWidth;
        style.transition = "none";
        style.width = (thisWidth - 10) + "px";
        style.lineHeight = height + "px";
        style.top = "-4px";
        thing.classList.remove("smol-dict");
        if(thisWidth < 100) {
            tooSmol = true;
        }

        thing.parentElement.style.minHeight = height + "px";
        thing.parentElement.style.height = height + "px";
        var func = dictsPerfect;
    }
    if(tooSmol) {
        for(var thing of find(">dict")) {
            var parent = thing.parentElement;
            var width = parent.clientWidth - 5;
            thing.classList.add("smol-dict");
            thing.style.top = (height + 6) + "px";
            thing.parentElement.style.minHeight = (2 * height + 20) + "px";
            thing.parentElement.style.height = (2 * height + 20) + "px";
        }
        var func = dictsTooSmol;
    }
    delayFunction(func, 0, 4000, 1000);
    updateSpacer();
}

function dictsPerfect() {
    for(var thing of find(">dict")) {
        var parent = thing.parentElement;
        var width = parent.clientWidth - 5;
        var thisWidth = width;
        thisWidth -= thing.nextElementSibling.clientWidth;
        thisWidth -= thing.previousElementSibling.clientWidth;
        thing.style.width = (thisWidth - 10) + "px";
    }
}

function dictsTooSmol() {
    for(var thing of find(">dict")) {
        var parent = thing.parentElement;
        var width = parent.clientWidth - 5;
        thing.style.width = width + "px";
    }
}

function toggleDrop(elem) {
    if(elem.classList.toggle("h-dropper-closed")) {
        elem.innerHTML = "[V]";
    } else {
        elem.innerHTML = "[\u039b]";
    }
    target = elem.nextElementSibling;
    if(!target)
        target = elem.parentElement.nextElementSibling
    target.classList.toggle("invis");
    resizeDicts(false, target);
    elem.scrollIntoView({behavior: "smooth"});
}
