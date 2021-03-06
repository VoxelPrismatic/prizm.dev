/* This file is not meant to be minimized, just less resource intensive */

try {
    window.parent.location.host;
} catch(err) {
    if(!document.referrer.includes("top.gg")) {
        url = "https://voxelprismatic.github.io/prizm.dev/" + document.referrer.split("/").slice(3).join("/");
        window.parent.location = url;
        window.location = url;
    }
}

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

function $(q, e = document) { return e.querySelector(q); }
function $$(q, e = document) { return e.querySelectorAll(q); }
