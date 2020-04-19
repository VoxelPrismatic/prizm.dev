function loadFooter() {
    if(!document.URL.includes("/error")) {
        try {
            find("footer").parentElement.remove();
        } catch(err) {
        }
        var blocks = find("content").children;
        var section = blocks[0];
        for(var child of blocks) {
            if(child.className.includes("sect")) {
                section = child;
            }
        }
        section.appendChild(footer);
    }
}

function startLoading() {
    try {
        delaySwapColor(theme, false);
        delaySetTransitions();
        document.getElementById("head").innerHTML = document.title;
        set_regex();
        loadPage();
        if(find(">table")) {
            styleTables();
        }
        if(document.URL.includes("#")) {
            for(var x = 0; x < 500; x += 100) {
                window.setTimeout(scroll_, x, document.URL.split("#")[1]);
            }
        }

        loadFooter();

        texts = load("/prizm.dev/assets/text/footer.txt", false, true).split("\n");
        changeFunnyTextThing();
        window.onkeydown = delayUpdateSpacer;
    } catch(err) {
        console.warn(
            "%cThe following error broke the page",
            "font-weight: bold; color: #ff0; font-size: large"
        );
        console.error(err);
        var html = load("/prizm.dev/error.html").replace(/\&gt;/gm, ">").replace(/\&lt;/gm, "<");
        html = html.replace(/(\n|.)*\<div id="content"\>((\n|.)*?(<\/div>){2})(\n|.)*/gm, "$2");
        find("content").innerHTML = html;
        window.setTimeout(delaySwapColor, 3000, "red", false);
    }
    updateSpacer();
    if(find("jumper"))
        window.onscroll = changeScrollingThingy;
    a11y();
}

function textPage(...pages) {
    var html = "";
    for(var page of pages) {
        var txt = load("/prizm.dev/assets/text/" + page + ".txt");
        if(txt.match(/\\N\{[a-zA-Z1-9 ]+\}/gm)) {
           load_unicode_index();
        }
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
    return findHtml("file").replace(/\&lt\;/gm, "<").replace(/\&gt\;/gm, ">");
}
