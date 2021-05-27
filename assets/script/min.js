try {
    window.parent.location.host;
} catch(err) {
    if(!document.referrer.includes("top.gg")) {
        url = "https://voxelprismatic.github.io/prizm.dev/" + document.referrer.split("/").slice(3).join("/");
        window.parent.location = url;
        window.location = url;
    }
}

function $(q, e = document) { return e.querySelector(q); }
function $$(q, e = document) { return e.querySelectorAll(q); }

// delay.js
function delayFunction(n,t,e,r,...o){for(var c=[],u=t;u<e;u+=r)c.push(window.setTimeout(n,u,...o));return c}function delaySwapColor(n,...t){try{return delayFunction(swapColor,0,3e3,100,n,...t)}catch(n){return[]}}function delaySetTransitions(){try{return delayFunction(setTransitions,1e3,4e3,100)}catch(n){return[]}}function delayUpdateSpacer(){try{return delayFunction(updateSpacer,0,100,25)}catch(n){return[]}}function delayResizeDicts(){try{return delayFunction(resizeDicts,0,100,25,!1)}catch(n){return[]}}function stopDelay(n){if(null!=n)for(var t of n)window.clearTimeout(t)}function logFunc(n,...t){if(null!=n)try{n(...t)}catch(n){console.error(n)}}

// accessibility.js
function doNothing(...o){}function allowKeyboard(o,e=doNothing){o.tabIndex="0",o.onkeyup=function(o){addFocus(o,this)},e(o)}function allowKeyboardBulk(o,e=doNothing){for(var t of $$(o))try{allowKeyboard(t,e)}catch(o){console.error(o)}}function a11y(){for(var o of(allowKeyboard("h1, h2, h3, h4, h5, h6",function(o){o.onfocus=flickery}),allowKeyboard("a, img, .lnk, button, .collapser, .dropper"),$$("span")))try{o.className.match(/(hide|dropper)/gm)?allowKeyboard(o):o.tabIndex="-1"}catch(o){console.error(o)}for(var o of $("#head #truelogo .dropper"))o.tabIndex="-1",o.onkeyup=null}var focus_timeout=!1,focusing=0;function addFocus(o,e){if(console.log(o,e),!focus_timeout){for(var t of(focus_timeout=!0,window.setTimeout(function(){focus_timeout=!1},100),focusing+=1,$$(".focusing")))t.classList.remove("focusing");try{e.classList.add("focusing"),window.setTimeout(removeFocus,5e3,e),("Enter"==o.key||e.nodeName.startsWith("H")&&"Tab"==o.key)&&e.click()}catch(o){}}}function removeFocus(o){if(!(focusing-=1))try{o.classList.remove("focusing")}catch(o){console.log(o)}}

// aesthetic/flicker.js
function flickery_element(n){n==$("h1#head")&&n.clientHeight>54&&(console.log(n.clientHeight),console.log(n),n.style.setProperty("top",-n.clientHeight/2-54+"px","important")),delayFunction(function(n){n.style.transition="none"},1e3,1001,1e3,n);var t=!0,e=compSty(n).color;e="rgba("+e.split("(")[1].slice(0,-1)+", 0.7)";for(var o=1500;o<=3e3;o+=Math.floor(200*Math.random())+25)(t=!t)?delayFunction(function(n){n.style.color=""},o,o+1,o,n):delayFunction(function(n){n.style.color=e},o,o+1,o,n);delayFunction(function(n){n.style.transition=""},o-25,o,5,n),delayFunction(function(n){n.style.color=e},o-50,o-49,o,n),delayFunction(function(n){n.style.color=""},o,o+1,o,n)}function flickery(){flickery_element(this)}window.setInterval(function(){flickery_element($("#head"))},15e3);

// aesthetic/dynamic.js
var is_IE=/(MSIE|Trident\/)/.test(window.navigator.userAgent),is_Chrome=/Chrome\//.test(window.navigator.userAgent);function jumpToEdge(e=0){window.navigator.vibrate([5]),window.setTimeout(e=>{globalThis.lastPosition=e},2e3,window.scrollY),"[Λ]"==$("#jumper").innerHTML?(is_IE?window.scrollTo(0,0):window.scrollTo({top:0,behavior:"smooth"}),$("#jumper").innerHTML="[V]"):(is_IE?window.scrollTo(0,window.scrollMaxY):is_Chrome?$("#footer").scrollIntoView({block:"start",inline:"end",behavior:"smooth"}):window.scrollTo({top:window.scrollMaxY,behavior:"smooth"}),$("#jumper").innerHTML="[Λ]")}function resetUpdate(){shouldUpdate=!0}function changeScrollingThingy(e=null){var o=$("#jumper");if(null==e||null==e.deltaY){if(window.scrollY%2)return;window.scrollY/window.scrollMaxY>=.5?(o.innerHTML="[Λ]",$("#nav").style.bottom="-100px"):(o.innerHTML="[V]",$("nav").style.bottom="0px")}else{var t=window.scrollY;o=$("#jumper");t>=window.scrollMaxY-95?(o.innerHTML="[Λ]",$("nav").style.bottom="0px"):e.deltaY>0||t<=32?(o.innerHTML="[V]",$("nav").style.bottom="0px"):(o.innerHTML="[Λ]",$("nav").style.bottom="-100px")}shouldUpdate&&(updateSpacer(),shouldUpdate=!1,window.setTimeout(resetUpdate,500))}function getHeight(e){let o=compSty(e);var t=Number(o.height.slice(0,-2));return t+=Number(o.marginTop.slice(0,-2)),t+=Number(o.marginBottom.slice(0,-2))}function updateSpacer(e=!1){e||loadFooter(),spacer=$("#spacer"),spacer.style.transition="none",spacer.style.height="0px";for(var o=window.innerHeight,t=0;Number(compSty("body").height.slice(0,-2))+7<o;)spacer.style.height=t+"px",t+=1}shouldUpdate=!0;var sub_styles_timeout=!1;function sub_styles(e=!0){globalThis.sub_styles_timeout||(globalThis.sub_styles_timeout=!0,console.groupCollapsed("Reformatting page"),e&&$("#spacer")&&(console.log("Resizing spacer"),logFunc(updateSpacer)),e&&$("table")&&(console.log("Styling tables"),logFunc(styleTables)),e&&$(".accent")&&(console.log("Moving accents"),logFunc(style_accents)),$(".dict")&&logFunc(resizeDicts),$("#spacer")&&(console.log("Resizing spacer"),logFunc(updateSpacer)),console.groupEnd("Reformatting page"),window.setTimeout(()=>globalThis.sub_styles_timeout=!1,100))}

// aesthetic/colors.js
function swapColor(colorName, swapImg = true) {
    var q = $$("link[rel='stylesheet']")
    if(!q[q.length - 1].href.endsWith("priz-" + colorName + ".css")
        document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" type="text/css" href="/prizm.dev/assets/css/priz-${colorName}.css"/>`)
    if(!$("#truelogo").src.endsWith("priz_" + colorName + ".webp"))
        $("#truelogo").src = `/prizm.dev/assets/image/webp/priz_${colorName}.webp`
    try {
        resizeDicts(false);
    } catch(err) {
        // Not important
    } try {
        setTransitions(false);
    } catch(err) {
        // Not important
    }
}


// load-min.js

var lastPosition = 0;

function checkScrollPosition() {
    var y = window.scrollY;
    if(y == lastPosition)
        return;
    var elem = $("#jumper");
    if(y >= window.scrollMaxY - 95) {
        elem.innerHTML = "[\u039b]";
        $("nav").style.bottom = "0px";
    } else if(y > lastPosition || y <= 32) {
        elem.innerHTML = "[V]";
        $("nav").style.bottom = "0px";
    } else {
        elem.innerHTML = "[\u039b]";
        $("nav").style.bottom = "-100px";
    }
    lastPosition = y;
}

async function loadNow() {
    globalThis.texts = await load("/prizm.dev/assets/text/footer.txt", {list: true});
    if(document.URL.split("#")[0].split("?")[0].endsWith("/prizm.dev/")) {
        var d = new Date();
        var day = d.getDate();
        switch(d.getMonth()) {
            case 0: // January
                swapColor("cyan");
                break;
            case 1: // February
                if(day == 14) {
                    swapColor("pink");
                    $("#truelogo").src = "/prizm.dev/assets/image/webp/holi/priz_heart.webp";
                    $("#head").innerHTML = "LOVE ;]";
                } else {
                    swapColor("cyan");
                }
                break;
            case 2: // March
                swapColor("cyan");
                break;
            case 3: // April
                swapColor("cyan");
                break;
            case 4: // May
                swapColor("cyan");
                break;
            case 5: // June
                swapColor("cyan");
                break;
            case 6: // July
                swapColor("cyan");
                break;
            case 7: // August
                swapColor("cyan");
                break;
            case 8: // September
                swapColor("cyan");
                break;
            case 9: // October
                swapColor("orange");
                $("#truelogo").src = "/prizm.dev/assets/image/webp/holi/priz_spook.webp";
                $("#head").innerHTML = "SPOOK ;]";
                break;
            case 10: // November
                swapColor("cyan");
                if(day == 11) {
                    $("#truelogo").src = "/prizm.dev/assets/image/webp/holi/priz_bday.webp";
                    $("#head").innerHTML = "BDAY ;]";
                }
                break;
            case 11:
                // December -- Festive
                swapColor("cyan");
                $("#truelogo").src = "/prizm.dev/assets/image/webp/holi/priz_xmas.webp";
                $("#head").innerHTML = "FESTIVE ;]";
                break;
            default:
                swapColor("red");
                $("#head").innerHTML = "13th MONTH?";
        }
    } else {
        swapColor(theme);
    }
    if($("#jumper")) {
        if(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile)/i.test(window.navigator.userAgent)) {
            //window.onscroll = changeScrollingThingy;
            $("#jumper").style.fontSize = "200%";
            window.setInterval(checkScrollPosition, 100);
        } else {
            window.onwheel = (evt) => changeScrollingThingy(evt);
        }
        window.ontouchmove = changeScrollingThingy;
    }
    window.onkeydown = (evt) => {
        if(!(evt.ctrlKey == true && evt.key == "I"))
            return;
        if(/Edge/i.test(window.navigator.userAgent))
            console.warn("Is this the old edge? Wow.");
        else if(/Chrome/i.test(window.navigator.userAgent))
            console.warn("Try out Firefox sometime, you'll be impressed!");
        if(/(Linux x86_64|Ubuntu)/i.test(window.navigator.userAgent))
            console.warn("Thanks for using the best operating system there is");
    }
    window.onclick = changeFunnyTextThing;
    window.onauxclick = changeFunnyTextThing;
    //window.ontouchend = changeFunnyTextThing;
    changeFunnyTextThing();
    window.onresize = function() {sub_styles(false)};
    for(var thing of [1, 2, 3, 4, 5, 6]) {
        for(var elem of $all("h" + thing)) {
            elem.onclick = function() {
                linkMe(this);
            }
            elem.onfocus = function() {
                flickery_element(this);
            }
        }
    }
    var h1 = $("h1#head");
    var fS = getComputedStyle(h1).fontSize
    h1.style.transition = "none"
    if(fS != "48px") {
        if(navigator.userAgent.includes("Android")) {
            var scales = {
                "38.4px": "60px",
                "43.2px": "54px",
                "52.8px": "47px",
                "62.4px": "40px",
                "72px": "34px",
                "81.6px": "30px",
                "96px": "26px"
            }
            if(scales[fS]) {
                h1.style.fontSize = scales[fS];
            }
            fS = getComputedStyle(h1).fontSize;
        }
        var fN = Number(fS.slice(0, -2))
        if(fN < 48 || fN > 52) {
            n = Math.round(fS.slice(0, -2));
            while(Number(getComputedStyle(h1).fontSize.slice(0, -2)) < 48 && n < 100) {
                n += 1;
                h1.style.fontSize = n + "px";
            }
            while(Number(getComputedStyle(h1).fontSize.slice(0, -2)) > 52) {
                n -= 1;
                h1.style.fontSize = n + "px";
            }
        }
    }
    h1.style.transition = ""
    //window.setInterval(flickery_element, 15000, $("h1#head"));
    document.head.insertAdjacentHTML("beforeend", `<style>
a { text-decoration:underline; }
nav {
    position: fixed;
    left: 0;
    right: 0;
    text-align: center !important;
    background: inherit;
    box-shadow: 0px 0px 1vw 1vw ${$("body").style.backgroundColor};
    bottom: -100px;
    z-index: 50;
    margin-bottom: 0px !important;
}
div.sect:last-child > div:last-child  {
    margin-bottom: 30px !important;
}
.focusing {
    outline: currentcolor dashed medium;
}
</style>`)
    document.body.insertAdjacentHTML("beforeend", patreon_nav)
    a11y();
}

async function load(filename, strip = false, json = false, list = false) {
    if(!filename.endsWith("error.html"))
        $("#head").innerHTML = document.title;
    else
        $("#head").innerHTML = "ERROR ;[";
    console.log("Reading " + filename);
    if(strip.list)
        list = true;
    if(strip.json)
        json = true;
    var resp = await fetch(filename);
    var content = await resp.text();
    if(strip || list || json)
        content = content.trim();
    if(json)
        return JSON.parse(content.replace(/\\\n/gm, "\\n"));
    if(list)
        return content.split("\n");
    return content;
}

function loadFooter() {
}

function linkMe(elem) {
    elem.scrollIntoView({behavior: "smooth"});
    var id = elem.id;
    if(id[0] != "#")
        id = "#" + id;
    window.history.replaceState(window.history.state, document.title, id);
    flickery_element(elem);
}

function flickery_element(h) {
    delayFunction(function(h){h.style.transition = "none";}, 1000, 1001, 1000, h);
    var shown = true;
    var halfOpacity = compSty(h).color;
    halfOpacity = "rgba(" + halfOpacity.split("(")[1].slice(0, -1) + ", 0.7)";
    for(var x = 1500; x <= 3000; x += Math.floor(Math.random() * 200) + 25) {
        shown = !shown;
        if(!shown)
            delayFunction(function(h){h.style.color = halfOpacity;}, x, x + 1, x, h);
        else
            delayFunction(function(h){h.style.color = "";}, x, x + 1, x, h);
    }
    delayFunction(function(h){h.style.transition = "";}, x - 25, x, 5, h);
    delayFunction(function(h){h.style.color = halfOpacity;}, x - 50, x - 49, x, h);
    delayFunction(function(h){h.style.color = "";}, x, x + 1, x, h);
}

function resizeDicts(log = true, element = document) {
    if((window.innerHeight + "" + window.innerWidth).includes("."))
        return;
    var height = compSty("h1").height.slice(0, -2) / 2;
    if(log) {
        console.log("Window resized to " + window.innerWidth + "x" + window.innerHeight);
        console.log("Resizing elements");
    }
    var tooSmol = false;
    var n = (2 * height + 20) + "px";
    var n2 = (height + 6) + "px";
    var n3 = height + "px";
    for(var thing of $(element, $("dict"))) {
        var parent = thing.parentElement;
        if(parent.clientWidth == 0)
            continue;
        var width = parent.clientWidth - 5
        ;var thisWidth = width;
        var style = thing.style;
        thisWidth -= thing.nextElementSibling.clientWidth;
        thisWidth -= thing.previousElementSibling.clientWidth;
        style.lineHeight = n3;
        thing.classList.remove("smol-dict");
        if(thisWidth < 100)
            tooSmol = true;

        thing.parentElement.style.minHeight = height + "px";
        thing.parentElement.style.height = height + "px";
        var func = dictsPerfect;
    }
    if(tooSmol) {
        for(var thing of $all("dict")) {
            thing.classList.add("smol-dict");
            thing.style.top = n2;
            thing.parentElement.style.minHeight = n;
            thing.parentElement.style.height = n;
        }
        var func = dictsTooSmol;
    }
    delayFunction(func, 0, 1000, 500);
    updateSpacer();
}

function dictsPerfect() {
    for(var thing of $all("dict")) {
        var parent = thing.parentElement;
        parent.classList.add("dict-good");
        parent.classList.remove("dict-smol");
        thing.style.top = "";
    }
}

function dictsTooSmol() {
    for(var thing of $all("dict")) {
        var parent = thing.parentElement;
        parent.classList.add("dict-smol");
        parent.classList.remove("dict-good");
        thing.style.top = (Number(thing.style.lineHeight.slice(0, -2)) + 5) + "px";
    }
}

function toggleDrop(elem) {
    if(elem.classList.toggle("h-dropper-closed")) {
        elem.innerHTML = "[V]";
    } else {
        elem.innerHTML = "[\u039b]";
    }
    target = elem.nextElementSibling;
    if(!target)
        target = elem.parentElement.nextElementSibling
    target.classList.toggle("invis");
    resizeDicts(false, target);
    elem.scrollIntoView({behavior: "smooth"});
    lastPosition = window.scrollMaxY + 10;
}

var patreon_nav = `
<nav class="sect">
    Consider supporting me on <a href="/prizm.dev/re/patreon" target="_blank">Patreon</a>!
</nav>`

var texts = [];

function changeFunnyTextThing() {
    var theText = texts[Math.floor(Math.random() * texts.length)];
    while(theText == "" || theText == $("#funnytextthing").innerHTML)
        theText = texts[Math.floor(Math.random() * texts.length)];
    $("#funnytextthing").innerHTML = theText;
    delayUpdateSpacer();
}

function compSty(elem) {
    try {
        return window.getComputedStyle(elem);
    } catch(err) {
        return window.getComputedStyle($$(elem)[0]);
    }
}

