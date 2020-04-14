function a11y() {
    for(var header of ["1", "2", "3", "4", "5", "6"]) {
        try {
            for(var elem of find(">h" + header)) {
                elem.tabIndex = "0";
                elem.onkeyup = function(evt) {
                    addFocus(evt, this);
                }
            }
        } catch(err) {
            console.error(err);
        }
    }
    
    for(var thing of [">a", ">img", ".lnk", ">button", ".collapser"]) {
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
            if(elem.className.includes("hide")) {
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
    
    find("head").tabIndex = "-1";
    find("truelogo").tabIndex = "-1";
}

function addFocus(evt, elem) {
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
    try {
        elem.classList.remove("focusing");
    } catch(err) {
        console.log(err);
    }
}
