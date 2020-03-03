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
    if(window.scrollY % 4)
        return;
    if(Math.abs(window.scrollMaxY - window.scrollY) < 20)
        return;
    if(window.scrollY / window.scrollMaxY >= 0.5)
        setHtml("jumper", "[\u039b]");
    else
        setHtml("jumper", "[V]");
    updateSpacer();
}

function compSty(elem) {
    try {
        return window.getComputedStyle(find(elem));
    } catch(err) {
        return window.getComputedStyle(find(elem)[0]);
    }
}

function changeFunnyTextThing() {
    var theText = texts[Math.floor(Math.random() * texts.length)];
    while(theText == "" || theText == findHtml("funnytextthing"))
        theText = texts[Math.floor(Math.random() * texts.length)];
    setHtml("funnytextthing", theText);
}
var footer = `\
<div style="text-align: center;"><div id="spacer" style="height: 0px;"></div>\
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

function resizeDicts(log = true) {
    if((window.innerHeight + "" + window.innerWidth).includes("."))
        return;
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
    updateSpacer();
}

function getHeight(elem) {
    let style = compSty(elem);
    var height = Number(style.height.slice(0, -2));
    height += Number(style.marginTop.slice(0, -2));
    height += Number(style.marginBottom.slice(0, -2));
    return height;
}

function updateSpacer() {
    var spacer = find("spacer");
    spacer.style.height = "0px";
    var height = window.innerHeight;
    var x = 0;
    while(Number(compSty(">BODY").height.slice(0, -2)) + 5 < height) {
        spacer.style.height = x + "px";
        x += 1;
    }
}

function startLoading() {
    try {
        loadPage();
        if(document.URL.includes("#")) {
            for(var x = 0; x < 300; x += 100) {
                window.setTimeout(scroll_, x, document.URL.split("#")[1]);
            }
        }
        if(!document.URL.includes("/error")) {
            var blocks = find("content").children;
            addHtml(blocks.item(blocks.length - 1).id, footer);
        }
    
        texts = load("/prizm.dev/assets/text/footer.txt", false, true).split("\n");
        changeFunnyTextThing();

        for(var x = 0; x <= 1000; x += 100) {
            window.setTimeout(swapColor, x, theme, false); // Sometimes it doesn't load right away
        }

        console.log(`Theme '${theme}' loaded`);
    } catch(err) {
        var html = load("/prizm.dev/error.html").replace(/\&gt;/gm, ">").replace(/\&lt;/gm, "<");
        html = html.replace(/(\n|.)*\<div id="content"\>((\n|.)*?(<\/div>){2})(\n|.)*/gm, "$2");
        find(">BODY")[0].innerHTML = html;
        swapColor("red");
        console.error(err);
    }
    updateSpacer();
}

window.onresize = resizeDicts;
window.onclick = changeFunnyTextThing;
window.onauxclick = changeFunnyTextThing;
if(find("jumper"))
    window.onscroll = changeScrollingThingy;
