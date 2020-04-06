function load(filename, aio = false, strip = false) {
    var f = new XMLHttpRequest()
    f.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resp = f.responseText;
            resp = resp.trim() + "\n"
            resp = resp.replace(/</gm, "&lt;");
            resp = resp.replace(/>/gm, "&gt;")
            if(strip)
                resp = resp.trim();
            document.getElementById("file").innerHTML = resp;
        }
    }
    f.open("GET", filename, aio);
    f.send();
    if(aio)
        return new Promise(resolve => {
            setTimeout(() => {resolve(document.getElementById("file").innerHTML);}, 100)
        });
    return document.getElementById("file").innerHTML;
}

function didntRedirect() {
    var st = `<h1>#] REDIRECT ;]</h1><div>Hey mate, I'm redirecting you to <a href="${url}">`
    try {
        st += text;
    } catch(err) {
        st += url;
    } 
    st += "</a>, try allowing redirects... especially if you are using Firefox ;]</div>";
    document.body.innerHTML = st;
}

eval(load("https://raw.githubusercontent.com/VoxelPrismatic/prizm.dev/master/assets/script/redirect/urls.js"));
eval(load("https://raw.githubusercontent.com/VoxelPrismatic/prizm.dev/master/assets/script/redirect/shorts.js"));

var url = "https://voxelprismatic.github.io/prizm.dev";
var text = "home";
var URL = document.URL;
if(URL.includes("?url=")) {
    url = decodeUriCompontent(URL.split("?url=")[1]);
    text = url;
} else if(URL.includes(/\?(page|p)=/gm)) {
    var tmp = URL.split(/\?(page|p)=/gm)[1]
    if(urls[tmp]) {
        url = urls[tmp];
        text = tmp;
    } else {
        url += "/418";
        text = "http/418";
    }
} else if(URL.includes(/\?(link|l|short|s)=/gm)) {
    var tmp = URL.split(/\?(link|l|short|s)=/gm)[1];
    if(shorts[tmp]) {
        url = shorts[tmp];
        text = tmp;
    } else {
        url += "/418";
        text = "http/418";
    }
}
window.location = url;
