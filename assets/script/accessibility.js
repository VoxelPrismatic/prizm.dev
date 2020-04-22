function flickery_element(h) {
    delayFunction(function(h){h.style.transition = "none";}, 1000, 1001, 1000, h);
    var shown = true;
    var halfOpacity = compSty(h).color;
    halfOpacity = "rgba(" + halfOpacity.split("(")[1].slice(0, -1) + ", 0.7)";
    for(var x = 1500; x <= 3000; x += Math.floor(Math.random() * 200) + 25) {
        shown = !shown;
        if(!shown) {
            delayFunction(function(h){h.style.color = halfOpacity;}, x, x + 1, x, h);
        } else {
            delayFunction(function(h){h.style.color = "";}, x, x + 1, x, h);
        }
    }
    delayFunction(function(h){h.style.transition = "";}, x - 25, x, 5, h);
    delayFunction(function(h){h.style.color = halfOpacity;}, x - 50, x - 49, x, h);
    delayFunction(function(h){h.style.color = "";}, x, x + 1, x, h);
}

function flickery() {
    flickery_element(this);
}

function a11y() {
    for(var header of ["1", "2", "3", "4", "5", "6"]) {
        try {
            for(var elem of find(">h" + header)) {
                elem.tabIndex = "0";
                elem.onkeyup = function(evt) {
                    addFocus(evt, this);
                }
                elem.onfocus = flickery;
            }
        } catch(err) {
            console.error(err);
        }
    }

    for(var thing of [">a", ">img", ".lnk", ">button", ".collapser", ".dropper"]) {
        try {
            for(var elem of find(thing)) {
                elem.tabIndex = "0";
                elem.onkeyup = function(evt) {
                    addFocus(evt, this);
                }
            }
        } catch(err) {
            console.error(err);
        }
    }

    for(var elem of find(">span")) {
        try {
            if(elem.className.match(/(hide|dropper)/gm)) {
                elem.tabIndex = "0";
                elem.onkeyup = function(evt) {
                    addFocus(evt, this);
                }
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
    if(focus_timeout) {
        return;
    }
    focus_timeout = true;
    window.setTimeout(function(){focus_timeout = false}, 100)
    focusing += 1;
    for(var thing of find(".focusing")) {
        thing.classList.remove("focusing");
    }
    try {
        elem.classList.add("focusing");
        window.setTimeout(removeFocus, 1000, elem);
        if(evt.key == "Enter" || elem.nodeName.startsWith("H") && evt.key == "Tab") {
            elem.click();
        }
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

window.setTimeout(function(){find("head").focus()}, 5000);
