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
    try {
        for(var elem of find(thing))
            allowKeyboard(elem, more);
    } catch(err) {
        console.error(err);
    }
}

function a11y() {
    for(var header of ["1", "2", "3", "4", "5", "6"]) {
        allowKeyboardBulk(">h" + header, function(elem){elem.onfocus = flickery});
    }

    for(var thing of [">a", ">img", ".lnk", ">button", ".collapser", ".dropper"]) {
        allowKeyboardBulk(thing);
    }

    for(var elem of find(">span")) {
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

    for(var thing of ["head", "truelogo", ".dropper"]) {
        try {
            for(var elem of find(thing)) {
                elem.tabIndex = "-1";
                elem.onkeyup = null;
            }
        } catch(err) {
            try {
                find(thing).tabIndex = "-1";
            } catch(err) {
                console.error(err);
            }
        }
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
    for(var thing of find(".focusing"))
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
