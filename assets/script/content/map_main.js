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
        "md",
        "tech",
        "toilet",
        "wat",
        {
            "/prizm/": [
                ".",
                "changes",
                "commands"
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
                "twitter"
            ]
        }
    ]
};

function setup(object, root = "") {
    var st = "<blockquote>";
    for(var obj of object) {
        if(obj.constructor.name == "Object") {
            st += `<h1>${Object.keys(obj)[0]}</h1>`
            st += setup(obj[Object.keys(obj)[0]], Object.keys(obj)[0]);
        } else {
            st += `<a href="${root + obj}">${obj}</a><br>`;
        }
    }
    return st;
}

async function loadPage() {
    find(".sect")[0].innerHTML = setup([map]);
}
