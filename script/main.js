function loadPage() {
    var pages = ["about", "links"];
    var html = "";
    for(var page of pages) {
        var txt = load("/prizm.dev/text/" + page + ".txt");
        html += `<div id="${page}" class="sect">${mark_page(txt)}</div>`;
    }
    setHtml("content", html);
}

window.setTimeout(loadPage, 100);
