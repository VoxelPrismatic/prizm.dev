var is_IE = /(MSIE|Trident\/)/.test(window.navigator.userAgent);
var is_Chrome = /Chrome\//.test(window.navigator.userAgent);

function jumpToEdge(delayed = 0) {
    window.navigator.vibrate([5]);
    window.setTimeout((e) => {globalThis.lastPosition = e}, 2000, window.scrollY);
    if($("#jumper").innerHTML == "[\u039b]") {
        if(is_IE)
            window.scrollTo(0, 0);
        else
            window.scrollTo({top: 0, behavior: "smooth"});
        $("#jumper").innerHTML = "[V]";
    } else {
        if(is_IE)
            window.scrollTo(0, window.scrollMaxY);
        else if(is_Chrome)
            $("#footer").scrollIntoView({block: "start", inline: "end", behavior: "smooth"});
        else
            window.scrollTo({top: window.scrollMaxY, behavior: "smooth"});
        $("#jumper").innerHTML = "[\u039b]";
    }
}

function resetUpdate() {
    shouldUpdate = true;
}

shouldUpdate = true;

function changeScrollingThingy(evt = null) {
    var elem = $("#jumper");
    if(evt == null || evt.deltaY == undefined) {
        if(window.scrollY % 2)
            return;
        if(window.scrollY / window.scrollMaxY >= 0.5) {
            elem.innerHTML = "[\u039b]";
            $("#nav").style.bottom = "-100px";
        } else{
            elem.innerHTML = "[V]";
            $("nav").style.bottom = "0px";
        }
    } else {
        var y = window.scrollY;
        var elem = $("#jumper");
        if(y >= window.scrollMaxY - 95) {
            elem.innerHTML = "[\u039b]";
            $("nav").style.bottom = "0px";
        } else if(evt.deltaY > 0 || y <= 32) {
            elem.innerHTML = "[V]";
            $("nav").style.bottom = "0px";
        } else {
            elem.innerHTML = "[\u039b]";
            $("nav").style.bottom = "-100px";
        }
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
    spacer = $("#spacer");
    spacer.style.transition = "none";
    spacer.style.height = "0px";
    var height = window.innerHeight;
    var x = 0;
    while(Number(compSty("body").height.slice(0, -2)) + 7 < height) {
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
    if(all && $("#spacer")) {
        console.log("Resizing spacer");
        logFunc(updateSpacer);
    } if(all && $("table")) {
        console.log("Styling tables");
        logFunc(styleTables);
    } if(all && $(".accent")) {
        console.log("Moving accents");
        logFunc(style_accents);
    } if($(".dict")) {
        logFunc(resizeDicts);
    } if($("#spacer")) {
        console.log("Resizing spacer");
        logFunc(updateSpacer);
    }
    console.groupEnd("Reformatting page");
    window.setTimeout(() => globalThis.sub_styles_timeout = false, 100);
}
