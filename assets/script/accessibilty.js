function a11y() {
    for(var header of ["1", "2", "3", "4", "5", "6"]) {
        for(var elem of find(">h" + header)) {
            elem.tabIndex = "0";
            elem.onkeyup = function(evt) {
                addFocus(evt, this);
            }
        }
    }
    
    for(var thing of [">a", ">img"]) {
        for(var elem of find(thing)) {
            elem.tabIndex = "0";
            elem.onkeyup = function(evt) {
                addFocus(evt, this);
            }
        }
    }

    for(var elem of find(">span")) {
        if(elem.className.includes("hide")) {
            elem.tabIndex = "0";
            elem.onkeyup = function(evt) {
                addFocus(evt, this);
            }
        } else {
            elem.tabIndex = "-1";
        }
    }
}

function addFocus(evt, elem) {
    for(var thing of find(".focusing")) {
        thing.classList.remove("focusing");
    }
    elem.classList.add("focusing");
    window.setTimeout(removeFocus, 1000, elem);
    if(evt.key == "Enter" || elem.nodeName.startsWith("H")) {
        elem.click();
    }
}

function removeFocus(elem) {
    try {
        elem.classList.remove("focusing");
    } catch(err) {
        console.log(err);
    }
}
