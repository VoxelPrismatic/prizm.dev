var footer = `\
<div style="text-align: center;"><div id="spacer" style="height: 0px;"></div>\
<sub id="footer" style="text-align: center !important;"><br><br>\
<b><span style="font-size: larger">BY PRIZ WITH WINKY BRACKET FACE ;]</span></b><br>`;
var url = document.URL.split("#")[0];
if(url.endsWith("prizm.dev") || url.endsWith("prizm.dev/"))
    footer += `<a href="https://github.com/voxelprismatic/prizm.dev" target="_blank">Website Repo</a>`;
else
    footer += `<a href="/prizm.dev">Home page</a>`;
footer += `\
<br><span id="funnytextthing">\
</span><br><br></sub></div>`;

var texts = [];

function regex(st, id) {
    st = st.trim();
    find(id).style.color = "#ffffff";
    if(st == "")
        return 1;
    if(st.endsWith("/") && st.startsWith("/")) {
        try {
            find(id).style.color = "#00ffff";
            return RegExp(st.slice(1, -1), "gm");
        } catch(err) {
            find(id).style.color = "#ff0000";
            return 1;
        }
    }
    var re = "(";
    for(var ch of st) {
        var lc = ch.toLowerCase().charCodeAt(0).toString(16);
        var uc = ch.toUpperCase().charCodeAt(0).toString(16);
        while(lc.length < 4)
            lc = "0" + lc;
        while(uc.length < 4)
            uc = "0" + uc;
        re += `[\\u${lc}\\u${uc}\\u200b\\\\]`; //Escape chars
    }
    re += ")";
    return RegExp(re, "gm");
}

function changeFunnyTextThing() {
    var theText = texts[Math.floor(Math.random() * texts.length)];
    while(theText == "" || theText == findHtml("funnytextthing"))
        theText = texts[Math.floor(Math.random() * texts.length)];
    setHtml("funnytextthing", theText);
}


function compSty(elem) {
    try {
        return window.getComputedStyle(find(elem));
    } catch(err) {
        return window.getComputedStyle(find(elem)[0]);
    }
}

window.onresize = resizeDicts;
window.onclick = changeFunnyTextThing;
window.onauxclick = changeFunnyTextThing;
