function loadPage() {
    setHtml("content", mark_page(load("/prizm.dev/text/changes.txt")));
    var st = "";
    for(var elem of find("content").children) {
        if(elem.tagName == "h1") {
            st += `<div id="${elem.id}~ `;
            st += `class="collapser" onclick="scoll(this.id.slice(0, -1))"`;
            st += `${elem.id.split("_").slice(0, -1).join("_")}</div>`;
        }
    }
    setHtml("list", st);
}
