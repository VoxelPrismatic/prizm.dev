function flickery() {
    delayFunction(function(h){h.style.transition = "none";}, 1000, 1001, 1000, this);
    var shown = true;
    for(var x = 1500; x <= 2500; x += Math.floor(Math.random() * 150) + 50) {
        shown = !shown;
        if(shown) {
            delayFunction(function(h){h.style.textShadow = "";}, x, x + 1, x, this);
        } else {
            delayFunction(function(h){h.style.textShadow = "none";}, x, x + 1, x, this);
        }
    }
    delayFunction(function(h){h.style.transition = "";}, x - 25, x, 5, this);
    delayFunction(function(h){h.style.textShadow = "none";}, x - 50, x - 49, x, this);
    delayFunction(function(h){h.style.textShadow = "";}, x, x + 1, x, this);
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
