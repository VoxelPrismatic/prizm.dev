function loadPage() {
    setHtml("content", load("changes"));
    var st = "";
    for(var elem of find("content").children) {
        if(elem.tagName == "h1") {
            st += `<div id="${elem.id}~ ";
            st += `class="collapser" onclick="find(this.id.slice(0, -1)).scrollIntoView()">
            st += `${elem.id.split("_").slice(0, -1).join("_")}</div>`;
        }
    }
    setHtml("list", st);
}
