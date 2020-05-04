function loadFooter() {
    if(!document.URL.includes("/error")) {
        try {
            find("footer").parentElement.remove();
        } catch(err) {
        }
        var blocks = find("content").children;
        var section = blocks[0];
        for(var child of blocks)
            if(child.className.includes("sect"))
                section = child;
        section.appendChild(footer);
        updateSpacer(true);
    }
}

async function startLoading() {
    try {
        delaySetTransitions();
        find("head").innerHTML = document.title;
        await loadPage();
        if(document.URL.includes("#"))
            for(var x = 0; x < 500; x += 100)
                window.setTimeout(scroll_, x, document.URL.split("#")[1]);

        loadFooter();
        var texts = await load("/prizm.dev/assets/text/footer.txt", {list: true});
        changeFunnyTextThing();
        var swapDelay = delaySwapColor(theme);
    } catch(err) {
        if(!loadPage.toString().replace(/\n* *\/\/.*\n*/gm, "").includes("{}")) {
            stopDelay(swapDelay);
            console.warn(
                "%cThe following error broke the page",
                "font-weight: bold; color: #ff0; font-size: large"
            );
            console.error(err);
            var html = await load("/prizm.dev/error.html");
            html = html.replace(/(\n|.)*\<div id="content"\>((\n|.)*?(<\/div>){2})(\n|.)*/gm, "$2");
            find("content").innerHTML = html;
            swapColor("red");
            find("head").innerHTML = "ERROR ;[";
        }
    }
    sub_styles();
    updateSpacer();
    window.setTimeout(sub_styles, 1000);
    delayFunction(function() {
        if(find("jumper")) {
            window.onscroll = changeScrollingThingy;
            window.ontouchmove = changeScrollingThingy;
        }
        window.onclick = changeFunnyTextThing;
        window.onauxclick = changeFunnyTextThing;
        window.ontouchend = changeFunnyTextThing;
        window.onresize = sub_styles;
    }, 0, 5000, 1000);
    a11y();
}

async function textPage(...pages) {
    var html = "";
    for(var page of pages) {
        var txt = await load("/prizm.dev/assets/text/" + page + ".txt");
        if(txt.match(/\\N\{[a-zA-Z1-9 ]+\}/gm))
           await load_unicode_index();
        html += `<div id="${page}" class="sect">${mark_page(txt)}</div>`;
    }
    setHtml("content", html);
}

async function load(filename, strip = false, json = false, list = false) {
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
