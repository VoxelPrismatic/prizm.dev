function load(filename, aio = false, strip = false) {
    var f = new XMLHttpRequest()
    f.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resp = f.responseText;
            resp = resp.trim() + "\n"
            resp = resp.replace(/</gm, "&lt;");
            resp = resp.replace(/>/gm, "&gt;")
            if(strip)
                resp = resp.trim();
            setHtml("file", resp);
        }
    }
    f.open("GET", filename, aio);
    f.send();
    if(aio)
        return new Promise(resolve => {
            setTimeout(() => {resolve(findHtml("file"));}, 100)
        });
    return findHtml("file");
}

function collsel(elem = find("list")) {
    var ch = elem.children;
    var itm = null;
    for(var c of ch) {
        if(c.className.includes("collhover"))
            itm = null;
        var tmp = collsel(c);
        if(tmp != null) 
            return itm
    }
    return itm;
}

function setcoll(elem) {
    colldesel();
    if(!elem.className.includes("collopen") && elem.className.includes("collapser")) {
        var child = elem.children;
        for(var c of child) {
            if(c.style.display == "block" && !c.className.includes("invis")) {
                collapser(elem);
                break;
            }
        }
    }
}

function setjump(elem) {
    colldesel(find("sect"));
    if(!elem.className.includes("collopen") && elem.className.includes("collapser")) {
        var child = elem.children;
        for(var c of child) {
            if(c.style.display == "block" && !c.className.includes("invis")) {
                collapser(elem);
                break;
            }
        }
    }
}

function colldesel(elem = find("list")) {
    var ch = elem.children;
    for(var c of ch) {
        if(c.className.includes("collhover"))
            collapser(c, true);
        colldesel(c);
    }
}

var timeout = false;

function collapser(elem, force = false) {
    if(globalThis.timeout && !force)
        return;
    globalThis.timeout = true;
    window.setTimeout(function() {globalThis.timeout = false;}, 500);
    //Set timeout so multiple collapses cannot run at the same time
    if(elem.className.includes("lnk")) {
        for(var cat of find("list").children)
            for(var lnk of cat.children)
                if(lnk.className.includes("sel"))
                   lnk.classList.remove("sel");
        elem.classList.add("sel");
        setHtml("com_help", findHtml(elem.id.slice(4)));
        return;
    }
    if(elem == undefined || elem == null)
        return;
    var disp = true;
    var name = "collapser collopen";
    if(elem.className.includes("collopen")) {
        disp = false;
        name = "collapser";
    }
    var thing = elem.children;
    for(var child of thing) {
        if(child.tagName != "DIV")
            continue;
        if(disp && !child.className.includes("invis"))
            child.style.display = "block";
        else
            child.style.display = "none";
    }
    elem.className = name;
}

function collall(parent = find("list"), sub = false) {
    var child = parent.children;
    for(var c of child) {
        c.classList.remove("invis");
        if(c.className.includes("collapser")) {
            collall(c, true);
            c.classList.remove("collopen");
        }
        if(sub) {
            c.style.display = "none";
        }
    }
}

function regex(st, id) {
    st = st.trim();
    find(id).style.color = "#ffffff";
    if(st == "")
        return 1;
    if(st.endsWith("/") && st.startsWith("/")) {
        try {
            find(id).style.color = "#00ffff";
            return RegExp(st.slice(1, -1), "gm");
        } catch(err) {
            find(id).style.color = "#ff0000";
            return 1;
        }
    }
    var re = "(";
    for(var ch of st) {
        var lc = ch.toLowerCase().charCodeAt(0).toString(16);
        var uc = ch.toUpperCase().charCodeAt(0).toString(16);
        while(lc.length < 4)
            lc = "0" + lc;
        while(uc.length < 4)
            uc = "0" + uc;
        re += `[\\u${lc}\\u${uc}\\u200b\\\\]`; //Escape chars
    }
    re += ")";
    return RegExp(re, "gm");
}

function locate(thing, parent = find("list"), loc = "find_command") {
    var pages = parent.children;
    re = regex(thing, loc);
    var nothidden = false;
    for(var page of pages) {
        if(page.tagName != "DIV")
            continue;
        page.classList.remove("invis");
        page.style.display = "block";
        if(re != 1) {
            if(page.className.includes("collapser")) {
                if(!page.className.includes("collopen")) {
                    collapser(page);
                }
                var donthideme = locate(thing, page, loc);
                if(!donthideme) {
                    page.style.display = "none";
                    page.classList.add("invis");
                    collapser(page);
                }
                nothidden = nothidden || donthideme;
            } else {
                var rawtext = page.children.item(0).innerHTML;
                rawtext += page.children.item(1).innerHTML;
                if(rawtext.search(re) != -1) {
                    nothidden = true
                    page.classList.remove("invis");
                } else {
                    page.style.display = "none";
                    page.classList.add("invis");
                }
            }
        }
    }
    if(re == 1) {
        collall();
    }
    return nothidden;
}

function locater(elem) {
    locate(elem.value, elem.parent, elem.id);
}

function locateId(id) {
    locater(find(id));
}

function textPage(...pages) {
    var html = "";
    for(var page of pages) {
        var txt = load("/prizm.dev/assets/text/" + page + ".txt");
        html += `<div id="${page}" class="sect">${mark_page(txt)}</div>`;
    }
    setHtml("content", html);
}

function jumpToEdge() {
    if(window.scrollY / window.scrollMaxY >= 0.5)
        find("truelogo").scrollIntoView();
    else
        find("footer").scrollIntoView();
}

function changeScrollingThingy() {
    if(Math.round(window.scrollY) % 10)
        return;
    if(window.scrollY / window.scrollMaxY >= 0.5)
        setHtml("jumper", "[\u039b]");
    else
        setHtml("jumper", "[V]");
}

function linkMe(elem) {
    find("hiddenLink").href = "#" + elem.id;
    find("hiddenLink").click();
}

function compSty(elem) {
    try {
        return window.getComputedStyle(find(elem));
    } catch(err) {
        return window.getComputedStyle(find(elem)[0]);
    }
}

function resizeDicts(log = true) {
    var height = compSty(">H1").height.slice(0, -2) / 2;
    var width = find(".sect")[0].clientWidth - 25;
    if(log) {
        console.log("Window resized to " + window.innerWidth + "x" + window.innerHeight);
        console.log("Resizing elements");
    }
    for(var thing of find(".dict")) {
        var thisWidth = width;
        var style = thing.style
        thisWidth -= thing.nextElementSibling.clientWidth;
        thisWidth -= thing.previousElementSibling.clientWidth;
        style.width = (thisWidth - 10) + "px";
        style.marginLeft = "5px";
        style.marginRight = "5px";
        style.height = "1px";
        style.lineHeight = height + "px";
        style.display = "inline-block";
        style.borderColor = "#444f";
        style.top = "";
        thing.parentElement.style.minHeight = height + "px";
        thing.parentElement.style.height = height + "px";
    }
    if(width <= 540) {
        for(var thing of find(".dict")) {
            thing.style.top = (height + 10) + "px";
            thing.parentElement.style.minHeight = (2 * height + 20) + "px";
            thing.parentElement.style.height = (2 * height + 20) + "px";
            thing.style.width = width + "px";
            thing.style.margin = "auto";
        }
    }
}

function changeFunnyTextThing() {
    var theText = texts[Math.floor(Math.random() * texts.length)];
    while(theText == "")
        theText = texts[Math.floor(Math.random() * texts.length)];
    setHtml("funnytextthing", theText);
}
var footer = `\
<div style="text-align: center;">\
<sub id="footer" style="text-align: center !important;">\
<br><br>BY PRIZ WITH WINKY BRACKET FACE ;]<br>`;
var url = document.URL.split("#")[0];
if(url.endsWith("prizm.dev") || url.endsWith("prizm.dev/"))
    footer += `<a href="https://github.com/voxelprismatic/prizm.dev" target="_blank">Website Repo</a>`;
else
    footer += `<a href="/prizm.dev">Home page</a>`;
footer += `\
<br><span id="funnytextthing">\
</span><br><br></sub></div>`;

var texts = [];

function startLoading() {

    loadPage();
    if(document.URL.includes("#")) {
        for(var x = 0; x < 300; x += 100) {
            window.setTimeout(scroll_, x, document.URL.split("#")[1]);
        }
    }
    var blocks = find("content").children;
    addHtml(blocks.item(blocks.length - 1).id, footer);
    
    texts = load("/prizm.dev/text/footer.txt", false, true).split("\n");
    changeFunnyTextThing();

    for(var x = 0; x <= 1000; x += 100) {
        window.setTimeout(swapColor, x, theme, false); // Sometimes it doesn't load right away
    }

    console.log(`Theme '${theme}' loaded`);
}

window.onresize = resizeDicts;
window.onclick = changeFunnyTextThing;
window.onscroll = changeScrollingThingy;
