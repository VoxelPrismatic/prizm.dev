let fonts = "https://fonts.googleapis.com/css?family=";

try {
    window.parent.location.host;
} catch(err) {
    window.parent.location = "https://voxelprismatic.github.io/prizm.dev/" + document.referrer.split("/").slice(3).join("/");
}

var stylesheetLoaded = false;

function tryColor() {
    console.log("Stylesheet loaded");
    try {
        swapColor(theme, false);
    } catch(err) {
        console.error(err);
    }
}

try {
    document.title = document.getElementById("title").content;
} catch(err) {
}

var elements = [
    {
        "tag": "script",
        "src": "https://voxelprismatic.github.io/priz.md/markup.js",
        "id": "priz_script"
    }, {
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
    if(element["tag"] == "!")
        return document.createComment(element["#"]);
    var elem = document.createElement(element["tag"]);
    for(var property of element.constructor.keys(element)) {
        if(property == "tag")
            continue;

        if(property.search(/<[0-9A-Fa-f]+>/gm) == 0)
            elem.append(tag(element[property]))

        else if(property.search(/br[0-9A-Fa-f]*/gm) == 0)
            for(var x = 0; x < element[property]; x += 1)
                elem.append(document.createElement("br"));

        else if(property == "style") {
            if(typeof element[property] == "string") {
                for(var style of element[property].split(";")) {
                    if(!style)
                        continue;
                    var value = style.split(":")[1].trim();
                    style = style.split(":")[0].trim();
                    elem.style.setProperty(style, value);
                }
            }
            else
                styler(elem, element[property]);
        }

        else if(property.search(/#[0-9A-Fa-f]*/gm) == 0)
            elem.append(document.createTextNode(element[property]));

        else
            elem.setAttribute(property, element[property]);
    }
    return elem;
}

function styler(element, styles) {
    for(var property of styles.constructor.keys(styles))
        element.style.setProperty(property, styles[property]);
}

var head = document.head;

for(var element of elements)
    head.appendChild(tag(element));
