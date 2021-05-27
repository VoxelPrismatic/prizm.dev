function loadFooter() {
    if(!document.URL.includes("/error")) {
        try {
            $("#footer").parentElement.remove();
        } catch(err) {
        }
        var blocks = $("#content").children;
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
        $("#head").innerHTML = document.title;
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
            swapColor("red");
            console.groupEnd("Loading page");
            console.warn(
                "%cThe following error broke the page",
                "font-weight: bold; color: #ff0; font-size: large"
            );
            console.error(err);
            console.groupCollapsed("Loading page");
            var html = await load("/prizm.dev/error.html");
            html = html.replace(/(\n|.)*\<div id="content"\>((\n|.)*?(<\/div>){2})(\n|.)*/gm, "$2");
            $("#content").innerHTML = html;
        }
    }
    sub_styles();
    updateSpacer();
    window.setTimeout(sub_styles, 1000, false);
    delayFunction(function() {
        console.log("Updating listeners");
        if($("#jumper")) {
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

link_queue_ready = true;
link_queue = [];
function queue_links() {
    link_queue_ready = false;
    try {
        page = link_queue[0];
        if(!$("#page_source_" + page)) {
            link = ` // <a id="page_source_${page}" target="_blank" href="https://github.com/VoxelPrismatic/prizm.dev/blob/master/assets/text/${page}.txt">View source [${page}]</a>`
            $("#links_and_sources").innerHTML += link;
        }
        link_queue = link_queue.slice(1);
        link_queue_ready = !link_queue.length;
    } catch(err) {
        console.error(err);
        window.setTimeout(queue_links, 100);
    }
}

async function textPage(...pages) {
    var html = "";
    for(var page of pages) {
        var txt = await load("/prizm.dev/assets/text/" + page + ".txt");
        html += `<div id="${page}" class="sect">${mark_page(txt)}</div>`;
        link_queue.push(page);
        if(link_queue_ready)
            queue_links();
    }
    setHtml("content", html);
}

async function load(filename, strip = false, json = false, list = false) {
    if(!filename.endsWith("error.html"))
        $("#head").innerHTML = document.title;
    else
        $("#head").innerHTML = "ERROR ;[";
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
