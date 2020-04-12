function startLoading() {
    try {
        for(var x = 0; x <= 5000; x += 100) {
            window.setTimeout(swapColor, x, theme, false); // Sometimes it doesn't load right away
        }
        window.setTimeout(setTransitions, 1000);
        
        loadPage();
        if(document.URL.includes("#")) {
            for(var x = 0; x < 300; x += 100) {
                window.setTimeout(scroll_, x, document.URL.split("#")[1]);
            }
        }
        if(!document.URL.includes("/error")) {
            var blocks = find("content").children;
            blocks.item(blocks.length - 1).appendChild(footer);
        }
    
        texts = load("/prizm.dev/assets/text/footer.txt", false, true).split("\n");
        changeFunnyTextThing();
    } catch(err) {
        console.info("The below error prevented the page from loading fully");
        console.error(err);
        var html = load("/prizm.dev/error.html").replace(/\&gt;/gm, ">").replace(/\&lt;/gm, "<");
        html = html.replace(/(\n|.)*\<div id="content"\>((\n|.)*?(<\/div>){2})(\n|.)*/gm, "$2");
        find("content").innerHTML = html;
        swapColor("red");
    }
    updateSpacer();
    if(find("jumper"))
        window.onscroll = changeScrollingThingy;
}

function textPage(...pages) {
    var html = "";
    for(var page of pages) {
        var txt = load("/prizm.dev/assets/text/" + page + ".txt");
        html += `<div id="${page}" class="sect">${mark_page(txt)}</div>`;
    }
    setHtml("content", html);
}

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
            setHtml("file", resp);
        }
    }
    f.open("GET", filename, aio);
    f.send();
    if(aio)
        return new Promise(resolve => {
            setTimeout(() => {resolve(findHtml("file"));}, 100)
        });
    return findHtml("file");
}
