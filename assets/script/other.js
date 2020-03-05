var url = document.URL.split("#")[0];
var linkContent = "Home page";
var linkHref = "/prizm.dev";
if(url.endsWith("prizm.dev") || url.endsWith("prizm.dev/")) {
    linkHref = "https://github.com/VoxelPrismatic/prizm.dev";
    linkContent = "Website Repo";
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
        "<00>": {
            "tag": "br"
        },
        "<01>": {
            "tag": "br"
        },
        "<0>": {
            "tag": "b",
            "style": "font-size: larger;",
            "#": "BY PRIZ WITH WINKY BRACKET FACE ;]"
        },
        "<02>": {
            "tag": "br"
        },
        "<1>": {
            "tag": "a",
            "href": linkHref,
            "#": linkContent
        },
        "<03>": {
            "tag": "br"
        },
        "<2>": {
            "tag": "span",
            "id": "funnytextthing"
        },
        "<04>": {
            "tag": "br"
        },
        "<05>": {
            "tag": "br"
        }
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
        while(lc.length < 4)
            lc = "0" + lc;
        while(uc.length < 4)
            uc = "0" + uc;
        re += `[\\u${lc}\\u${uc}\\u200b\\\\]`; //Escape chars
    }
    re += ")";
    return RegExp(re, "gm");
}

function changeFunnyTextThing() {
    var theText = texts[Math.floor(Math.random() * texts.length)];
    while(theText == "" || theText == findHtml("funnytextthing"))
        theText = texts[Math.floor(Math.random() * texts.length)];
    setHtml("funnytextthing", theText);
}


function compSty(elem) {
    try {
        return window.getComputedStyle(find(elem));
    } catch(err) {
        return window.getComputedStyle(find(elem)[0]);
    }
}
