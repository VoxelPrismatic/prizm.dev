function loadPage() {
    var pages = ["prizm"];
    var html = "";
    for(var page of pages) {
        var txt = load("/prizm.dev/text/" + page + ".txt");
        html += `<div id="${page}" class="sect">${mark_page(txt)}</div>`;
    }
    setHtml("content", html);
}
