function jumpToEdge() {
    if(window.scrollY / window.scrollMaxY >= 0.5)
        find("truelogo").scrollIntoView({behavior: "smooth"});
    else
        find("footer").scrollIntoView({behavior: "smooth"});
}

function changeScrollingThingy() {
    if(window.scrollY % 2)
        return;
    if(window.scrollY / window.scrollMaxY >= 0.5)
        setHtml("jumper", "[\u039b]");
    else
        setHtml("jumper", "[V]");
    if(window.scrollMaxY - window.scrollY <= 50)
        updateSpacer();
}

function resizeDicts(log = true) {
    if((window.innerHeight + "" + window.innerWidth).includes("."))
        return;
    var height = compSty(">H1").height.slice(0, -2) / 2;
    var width = find(".sect")[0].clientWidth - 25;
    if(log) {
        console.log("Window resized to " + window.innerWidth + "x" + window.innerHeight);
        console.log("Resizing elements");
    }
    for(var thing of find(".dict")) {
        var thisWidth = width;
        var style = thing.style
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
        thing.parentElement.style.minHeight = height + "px";
        thing.parentElement.style.height = height + "px";
    }
    if(width <= 540) {
        for(var thing of find(".dict")) {
            thing.style.top = (height + 10) + "px";
            thing.parentElement.style.minHeight = (2 * height + 20) + "px";
            thing.parentElement.style.height = (2 * height + 20) + "px";
            thing.style.width = width + "px";
            thing.style.margin = "auto";
        }
    }
    updateSpacer();
}

function getHeight(elem) {
    let style = compSty(elem);
    var height = Number(style.height.slice(0, -2));
    height += Number(style.marginTop.slice(0, -2));
    height += Number(style.marginBottom.slice(0, -2));
    return height;
}

function updateSpacer() {
    var spacer = find("spacer");
    spacer.style.height = "0px";
    var height = window.innerHeight;
    var x = 0;
    while(Number(compSty(">BODY").height.slice(0, -2)) + 5 < height) {
        spacer.style.height = x + "px";
        x += 1;
    }
}
