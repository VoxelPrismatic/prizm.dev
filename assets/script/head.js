let fonts = "https://fonts.googleapis.com/css?family=";

var stylesheetLoaded = false;

function tryColor() {
    console.log("Stylesheet loaded");
    try {
        swapColor(theme, false);
    } catch(err) {
    }
}

try {
    document.title = document.getElementById("title").content;
} catch(err) {
}

var elements = [
    {
        "tag": "link",
        "rel": "icon",
        "type": "image/png",
        "href": "/prizm.dev/assets/image/favicon.png"
    }, {
        "tag": "meta",
        "name": "viewport",
        "content": "width=device-width, initial-scale=1.0"
    }, {
        "tag": "meta",
        "charset": "utf-8"
    }, {
        "tag": "link",
        "rel": "stylesheet",
        "type": "text/css",
        "href": fonts + "Ubuntu+Mono:400,400i,700,700i&display=swap"
    }, {
        "tag": "link",
        "rel": "stylesheet",
        "type": "text/css",
        "href": fonts + "Ubuntu:400,400i,500,500i,700,700i&display=swap"
    }, {
        "tag": "link",
        "rel": "stylesheet/less",
        "type": "text/css",
        "href": "/prizm.dev/assets/style.less"
    }, {
        "tag": "script",
        "src": "https://cdnjs.cloudflare.com/ajax/libs/less.js/3.11.0/less.min.js",
        "onload": "tryColor()",
        "id": "lesscss"
    }, {
        "tag": "meta",
        "property": "og:url",
        "content": document.URL.split("#")[0]
    }, {
        "tag": "meta",
        "name": "author",
        "content": "PRIZ ;]"
    }
];

function tag(element) {
    var elem = document.createElement(element["tag"]);
    for(var property of element.constructor.keys(element)) {
        if(property == "tag") {
            continue;
        }
        if(property.search(/<[0-9A-Fa-f]+>/gm) == 0) {
            elem.appendChild(tag(element[property]))
        } else if(property.search(/br[0-9A-Fa-f]*/gm) == 0) {
            for(var x = 0; x < element[property]; x += 1) {
                elem.appendChild(document.createElement("br"));
            }
        } else if(property == "style") {
            if(typeof element[property] == "string") {
                for(var style of element[property].split(";")) {
                    if(!style)
                        continue;
                    var value = style.split(":")[1].trim();
                    style = style.split(":")[0].trim();
                    elem.style.setProperty(style, value);
                }
            } else {
                styler(elem, element[property]);
            }
        } else if(property.search(/#[0-9A-Fa-f]*/gm) == 0) {
            elem.appendChild(document.createTextNode(element[property]));
        } else {
            elem.setAttribute(property, element[property]);
        }
    }
    return elem;
}

function styler(element, styles) {
    for(var property of styles.constructor.keys(styles)) {
        element.style.setProperty(property, styles[property]);
    }
}

var head = document.head;

for(var element of elements) {
    head.appendChild(tag(element));
}
