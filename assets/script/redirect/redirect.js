try {
    window.parent.location.host;
} catch(err) {
    console.error(err);
    console.log(document.referrer);
    thing = document.referrer.split("/").slice(3).join("/");
    if(thing.startsWith("@"))
        thing = "?short=" + thing.slice(1);
    url = "https://voxelprismatic.github.io/prizm.dev/re/" + thing;
    window.parent.location = url;
}


function load(filename, aio = false, strip = false) {
    var f = new XMLHttpRequest()
    f.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resp = f.responseText;
            resp = resp.trim() + "\n";
            if(strip)
                resp = resp.trim();
            globalThis.resp__ = resp;
        }
    }
    f.open("GET", filename, aio);
    f.send();
    return globalThis.resp__;
}

function didntRedirect() {
    document.body.innerHTML = `<h1>#] REDIRECT</h1><div>I'm redirecting you to <a href="${url}" style="color: #fff">
this link</a>, try allowing redirects for this site.<br>
<sub>This is a shortlink subpage, all links are public.<br>
<sub>Note: if <u>.github.io</u> isn't in the URL, DO NOT ALLOW REDIRECTS.
Google Chrome redirects to the website home page rather than to the
destination. Thanks for your understanding</sub></sub></div>`;
}

function getUrl(re, block) {
    var tmp;
    for(var r of re)
        if(document.URL.includes(r))
            tmp = document.URL.split(r)[1];
    var url;
    var text;
    var append = "";
    if(tmp.includes("+")) {
        append = tmp.split("+")[1];
        tmp = tmp.split("+")[0];
    }
    if(block[tmp]) {
        url = block[tmp] + append;
        text = tmp;
    } else {
        url = "https://voxelprismatic.github.io/prizm.dev/418";
        text = "http/418";
    }
    return [url, text];
}

var raw = "https://raw.githubusercontent.com/VoxelPrismatic/prizm.dev/master/assets/script/redirect/";
eval(load(raw + "urls.js"));
eval(load(raw + "shorts.js"));

var url = "https://voxelprismatic.github.io/prizm.dev/";
var uri = url;
var text = "home";
var URL = document.URL;
if(URL.includes("?url=")) {
    url = decodeUriCompontent(URL.split("?url=")[1]);
    text = url;
} else if(URL.match(/(\?(page|p)|\$)=/gm)) {
    var re = [
        "?page=",
        "?p=",
        "\\$"
    ];
    [url, text] = getUrl(re, urls);
} else if(URL.match(/(\?(link|l|short|s)=|\#)/gm)) {
    var re = [
        "?link=",
        "?l=",
        "?short=",
        "?s=",
        "#"
    ];
    [url, text] = getUrl(re, shorts);
}
window.parent.location = url;
