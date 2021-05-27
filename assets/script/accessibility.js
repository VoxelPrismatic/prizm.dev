function doNothing(...args) {
}

function allowKeyboard(elem, more = doNothing) {
    elem.tabIndex = "0";
    elem.onkeyup = function(evt) {
        addFocus(evt, this);
    }
    more(elem)
}

function allowKeyboardBulk(thing, more = doNothing) {
    for(var elem of $$(thing)) {
        try {
            allowKeyboard(elem, more);
        } catch(err) {
            console.error(err);
        }
    }
}

function a11y() {
    allowKeyboard("h1, h2, h3, h4, h5, h6", function(elem) { elem.onfocus = flickery });
    allowKeyboard("a, img, .lnk, button, .collapser, .dropper");

    for(var elem of $$("span")) {
        try {
            if(elem.className.match(/(hide|dropper)/gm)) {
                allowKeyboard(elem);
            } else {
                elem.tabIndex = "-1";
            }
        } catch(err) {
            console.error(err);
        }
    }

    for(var elem of $("#head #truelogo .dropper")) {
        elem.tabIndex = "-1";
        elem.onkeyup = null;
    }
}

var focus_timeout = false;
var focusing = 0;

function addFocus(evt, elem) {
    console.log(evt, elem)
    if(focus_timeout)
        return;
    focus_timeout = true;
    window.setTimeout(function(){focus_timeout = false}, 100)
    focusing += 1;
    for(var thing of $$(".focusing"))
        thing.classList.remove("focusing");
    try {
        elem.classList.add("focusing");
        window.setTimeout(removeFocus, 5000, elem);
        if(evt.key == "Enter" || elem.nodeName.startsWith("H") && evt.key == "Tab")
            elem.click();
    } catch(err) {
    }
}

function removeFocus(elem) {
    focusing -= 1;
    if(!focusing) {
        try {
            elem.classList.remove("focusing");
        } catch(err) {
            console.log(err);
        }
    }
}
