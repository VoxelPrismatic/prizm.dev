function jumpToEdge() {
    if(window.scrollY / window.scrollMaxY >= 0.5)
        find("truelogo").scrollIntoView({behavior: "smooth"});
    else
        find("footer").scrollIntoView({behavior: "smooth"});
}

function resetUpdate() {
    shouldUpdate = true;
}

shouldUpdate = true;

function changeScrollingThingy() {
    if(window.scrollY % 2)
        return;
    if(window.scrollY / window.scrollMaxY >= 0.5)
        setHtml("jumper", "[\u039b]");
    else
        setHtml("jumper", "[V]");
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
