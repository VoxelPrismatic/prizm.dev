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
        updateSpacer();
    }
}

function sub_styles() {
    if(find(">table"))
        logFunc(styleTables);
    if(find(".accent"))
        logFunc(style_accents);
    if(find(".dict"))
        logFunc(resizeDicts);
    if(find("spacer").style.height != "0px")
        logFunc(updateSpacer);
}

function startLoading() {
    try {
        var swapDelay = delaySwapColor(theme);
        delaySetTransitions();
        $("#head")[0].innerHTML = document.title;
        loadPage();
        sub_styles();
        if(document.URL.includes("#"))
            for(var x = 0; x < 500; x += 100)
                window.setTimeout(scroll_, x, document.URL.split("#")[1]);

        loadFooter();
        texts = load("/prizm.dev/assets/text/footer.txt", false, true).split("\n");
        changeFunnyTextThing();
        window.onkeydown = delayUpdateSpacer;
        window.onresize = sub_styles;
    } catch(err) {
        if(!loadPage.toString().replace(/\n* *\/\/.*\n*/gm, "").includes("{}")) {
            stopDelay(swapDelay);
            console.warn(
                "%cThe following error broke the page",
                "font-weight: bold; color: #ff0; font-size: large"
            );
            console.error(err);
            var html = load("/prizm.dev/error.html").replace(/\&gt;/gm, ">").replace(/\&lt;/gm, "<");
            html = html.replace(/(\n|.)*\<div id="content"\>((\n|.)*?(<\/div>){2})(\n|.)*/gm, "$2");
            find("content").innerHTML = html;
            swapColor("red");
        }
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
        if(txt.match(/\\N\{[a-zA-Z1-9 ]+\}/gm))
           load_unicode_index();
        html += `<div id="${page}" class="sect">${mark_page(txt)}</div>`;
    }
    setHtml("content", html);
}

function load(filename, aio = false, strip = false) {
    if(aio) {
        return new Promise(async resolve => {
            resp = await fetch(filename);
            text = await resp.text();
            if(strip)
                text = text.trim();
            resolve(text);
        });
    } else {
        text = $.ajax(filename, {async: false}).responseText;
    } if(strip) {
        text = text.trim();
    }
    return text;
}
