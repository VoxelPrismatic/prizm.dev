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
        updateSpacer(true);
    }
}

function startLoading() {
    try {
        delaySetTransitions();
        $("#head")[0].innerHTML = document.title;
        loadPage();
        if(document.URL.includes("#"))
            for(var x = 0; x < 500; x += 100)
                window.setTimeout(scroll_, x, document.URL.split("#")[1]);

        loadFooter();
        texts = load("/prizm.dev/assets/text/footer.txt", false, true).split("\n");
        changeFunnyTextThing();
        window.onkeydown = sub_styles;
        window.onresize = sub_styles;
        var swapDelay = delaySwapColor(theme);
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
    sub_styles();
    updateSpacer();
    window.setTimeout(sub_styles, 1000);
    if(find("jumper")) {
        window.onscroll = changeScrollingThingy;
        window.ontouchmove = changeScrollingThingy;
    }
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
