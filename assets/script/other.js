var url = document.URL.split("#")[0];
var linkContent = "Home page";
var linkHref = "/prizm.dev";
var linkTarget = "";
if(url.endsWith("prizm.dev") || url.endsWith("prizm.dev/")) {
    linkHref = "/prizm.dev/map";
    linkContent = "Site map";
    linkTarget = "";
}

if(url.endsWith("prizm.dev/map") || url.endsWith("prizm.dev/map.html")) {
    linkHref = "https://github.com/voxelprismatic/prizm.dev/";
    linkContent = "Website repo";
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
            "tag": "span",
            "id": "links_and_sources",
            "<1>": {
                "tag": "a",
                "href": linkHref,
                "#": linkContent,
                "target": linkTarget
            }
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
