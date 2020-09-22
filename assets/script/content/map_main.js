var map = {
    "/": [
        ".", 
        "404",
        "418",
        "apple",
        "cat",
        "credits",
        "disqus",
        "error",
        "google",
        "linux-sucks",
        "map",
        "md",
        "tech",
        "toilet",
        "wat",
        "ileies",
        {
            "/prizm/": [
                ".",
                "changes",
                "commands",
                "perms"
            ]
        },
        {
            "/re/": [
                ".",
                "bot",
                "discord",
                "github",
                "patreon",
                "reddit",
                "twitter",
                "kofi",
            ]
        }
    ]
};

function setup(object, root = "") {
    var st = ""
    for(var obj of object) {
        if(obj.constructor.name == "Object") {
            st += `<h1>${Object.keys(obj)[0]}</h1>`
            st += "<blockquote>";
            st += setup(obj[Object.keys(obj)[0]], Object.keys(obj)[0]);
            st += "</blockquote>";
        } else {
            st += `<a href="/prizm.dev${root + obj}">${obj}</a><br>`;
        }
    }
    return st;
}

async function loadPage() {
    find(".sect")[0].innerHTML = setup([map]);
}
