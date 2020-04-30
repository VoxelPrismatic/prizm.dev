var url = document.URL.split("#")[0];
var linkContent = "Home page";
var linkHref = "/prizm.dev";
var linkTarget = "";
if(url.endsWith("prizm.dev") || url.endsWith("prizm.dev/")) {
    linkHref = "https://github.com/VoxelPrismatic/prizm.dev";
    linkContent = "Website Repo";
    linkTarget = "_blank";
}

var footTag = {
    "tag": "div",
    "style": "text-align: center;",
    "<0>": {
        "tag": "div",
        "style": "height: 0px;",
        "id": "spacer"
    },
    "<1>": {
        "tag": "sub",
        "style": "text-align: center !important;",
        "id": "footer",
        "br0": 2,
        "<0>": {
            "tag": "b",
            "style": "font-size: larger;",
            "#": "BY PRIZ WITH WINKY BRACKET FACE ;]"
        },
        "br1": 1,
        "<1>": {
            "tag": "a",
            "href": linkHref,
            "#": linkContent,
            "target": linkTarget
        },
        "br2": 1,
        "<2>": {
            "tag": "span",
            "id": "funnytextthing"
        },
        "br3": 2
    }
}

var footer = tag(footTag);

var texts = [];

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
        lc.padStart(4, "0");
        uc.padStart(4, "0");
        re += `[\\u${lc}\\u${uc}\\u200b\\\\]`; // Escape chars
    }
    re += ")";
    return RegExp(re, "gm");
}

function changeFunnyTextThing() {
    var theText = texts[Math.floor(Math.random() * texts.length)];
    while(theText == "" || theText == findHtml("funnytextthing"))
        theText = texts[Math.floor(Math.random() * texts.length)];
    setHtml("funnytextthing", theText);
    delayUpdateSpacer();
}

function compSty(elem) {
    try {
        return window.getComputedStyle(elem);
    } catch(err) {
        try {
            return window.getComputedStyle(find(elem));
        } catch(err) {
            return window.getComputedStyle(find(elem)[0]);
        }
    }
}
