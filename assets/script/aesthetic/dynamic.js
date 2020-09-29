function jumpToEdge() {
    if(find("jumper").innerHTML == "[\u039b]")
        find("truelogo").scrollIntoView({behavior: "smooth"});
    else
        find("footer").scrollIntoView({behavior: "smooth"});
    changeScrollingThingy()
}

function resetUpdate() {
    shouldUpdate = true;
}

shouldUpdate = true;

function changeScrollingThingy(evt = null) {
    if(evt == null || evt.deltaY == undefined) {
        if(window.scrollY % 2)
            return;
        if(window.scrollY / window.scrollMaxY >= 0.5)
            setHtml("jumper", "[\u039b]");
        else
            setHtml("jumper", "[V]");
    } else {
        if(evt.deltaY < 0)
            setHtml("jumper", "[\u039b]");
        else
            setHtml("jumper", "[V]");
    }
    if(shouldUpdate) {
        updateSpacer();
        shouldUpdate = false;
        window.setTimeout(resetUpdate, 500);
    }
}

function getHeight(elem) {
    let style = compSty(elem);
    var height = Number(style.height.slice(0, -2));
    height += Number(style.marginTop.slice(0, -2));
    height += Number(style.marginBottom.slice(0, -2));
    return height;
}

function updateSpacer(dontLoad = false) {
    if(!dontLoad)
        loadFooter();
    spacer = find("spacer");
    spacer.style.transition = "none";
    spacer.style.height = "0px";
    var height = window.innerHeight;
    var x = 0;
    while(Number(compSty(">BODY").height.slice(0, -2)) + 7 < height) {
        spacer.style.height = x + "px";
        x += 1;
    }
}

var sub_styles_timeout = false;

function sub_styles(all = true) {
    if(globalThis.sub_styles_timeout)
        return;
    globalThis.sub_styles_timeout = true;
    console.groupCollapsed("Reformatting page");
    if(all && find("spacer")) {
        console.log("Resizing spacer");
        logFunc(updateSpacer);
    } if(all && find(">table")) {
        console.log("Styling tables");
        logFunc(styleTables);
    } if(all && find(".accent")) {
        console.log("Moving accents");
        logFunc(style_accents);
    } if(find(".dict")) {
        logFunc(resizeDicts);
    } if(find("spacer")) {
        console.log("Resizing spacer");
        logFunc(updateSpacer);
    }
    console.groupEnd("Reformatting page");
    window.setTimeout(() => globalThis.sub_styles_timeout = false, 100);
}
