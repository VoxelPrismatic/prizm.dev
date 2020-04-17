function resizeDicts(log = true, times = 0) {
    if((window.innerHeight + "" + window.innerWidth).includes("."))
        return;
    var height = compSty(">H1").height.slice(0, -2) / 2;
    if(log) {
        console.log("Window resized to " + window.innerWidth + "x" + window.innerHeight);
        console.log("Resizing elements");
    }
    var tooSmol = false;
    for(var thing of find(".dict")) {
        var parent = thing.parentElement;
        var width = parent.clientWidth - 5;
        var thisWidth = width;
        var style = thing.style;
        thisWidth -= thing.nextElementSibling.clientWidth;
        thisWidth -= thing.previousElementSibling.clientWidth;
        style.width = (thisWidth - 10) + "px";
        style.marginLeft = "5px";
        style.marginRight = "5px";
        style.height = "2px";
        style.lineHeight = height + "px";
        style.display = "inline-block";
        style.borderColor = "#444f";
        style.top = "";
        if(thisWidth < 100) {
            tooSmol = true;
        }
        thing.parentElement.style.minHeight = height + "px";
        thing.parentElement.style.height = height + "px";
        var func = dictsPerfect;
    }
    if(tooSmol) {
        for(var thing of find(".dict")) {
            var parent = thing.parentElement;
            var width = parent.clientWidth - 5;
            thing.style.top = (height + 10) + "px";
            thing.parentElement.style.minHeight = (2 * height + 20) + "px";
            thing.parentElement.style.height = (2 * height + 20) + "px";
            thing.style.width = width + "px";
            thing.style.margin = "auto";
        }
        var func = dictsTooSmol;
    }
    delayFunction(func, 0, 4000, 1000);
    updateSpacer();
}

function dictsTooSmol() {
    for(var thing of find(".dict")) {
        var parent = thing.parentElement;
        var width = parent.clientWidth - 5;
        thing.style.width = width + "px";
    }
}

function dictsPerfect() {
    for(var thing of find(".dict")) {
        var parent = thing.parentElement;
        var width = parent.clientWidth - 5;
        var thisWidth = width;
        thisWidth -= thing.nextElementSibling.clientWidth;
        thisWidth -= thing.previousElementSibling.clientWidth;
        thing.style.width = (thisWidth - 10) + "px";
    }
}
