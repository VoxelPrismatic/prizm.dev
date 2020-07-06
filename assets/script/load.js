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
    console.groupCollapsed("Loading page");
    try {
        delaySetTransitions();
        find("head").innerHTML = document.title;
        await loadPage();
        if(document.URL.includes("#"))
            for(var x = 0; x < 500; x += 100)
                window.setTimeout(scroll_, x, document.URL.split("#")[1]);
            loadFooter();
        globalThis.texts = await load("/prizm.dev/assets/text/footer.txt", {list: true});
        try {
            changeFunnyTextThing();
        } catch(err) {
            console.error(err);
            window.setTimeout(changeFunnyTextThing, 1000);
        }
        var swapDelay = delaySwapColor(theme);
    } catch(err) {
        if(!loadPage.toString().replace(/\n* *\/\/.*\n*/gm, "").includes("{}")) {
            stopDelay(swapDelay);
            console.groupEnd("Loading page");
            console.warn(
                "%cThe following error broke the page",
                "font-weight: bold; color: #ff0; font-size: large"
            );
            console.error(err);
            console.groupCollapsed("Loading page");
            var html = await load("/prizm.dev/error.html");
            html = html.replace(/(\n|.)*\<div id="content"\>((\n|.)*?(<\/div>){2})(\n|.)*/gm, "$2");
            find("content").innerHTML = html;
            swapColor("red");
            find("head").innerHTML = "ERROR ;[";
        }
    }
    sub_styles();
    updateSpacer();
    window.setTimeout(sub_styles, 1000, false);
    delayFunction(function() {
        console.log("Updating listeners");
        if(find("jumper")) {
            window.onscroll = changeScrollingThingy;
            window.ontouchmove = changeScrollingThingy;
        }
        window.onclick = changeFunnyTextThing;
        window.onauxclick = changeFunnyTextThing;
        window.ontouchend = changeFunnyTextThing;
        window.onresize = function() {sub_styles(false)};
    }, 0, 5000, 1000);
    a11y();
    window.setTimeout(() => console.groupEnd("Loading page"), 1000);
}

async function textPage(...pages) {
    var html = "";
    for(var page of pages) {
        var txt = await load("/prizm.dev/assets/text/" + page + ".txt");
        html += `<div id="${page}" class="sect">${mark_page(txt)}</div>`;
        find("links_and_sources").innerHTML +=
            ` // <a href="https://github.com/VoxelPrismatic/prizm.dev/blob/master/assets/text/${page}.txt">View source [${page}]</a>`
    }
    setHtml("content", html);
}

async function load(filename, strip = false, json = false, list = false) {
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
