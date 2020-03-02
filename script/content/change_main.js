function loadPage() {
    setHtml("log", mark_page(load("/prizm.dev/text/changes.txt")));
    var st = "";
    for(var elem of find("log").children) {
        if(elem.tagName == "H1") {
            var tag = "";
            tag = `<div id="${elem.id}~" `;
            tag += `class="lnk" onclick="scroll_(this.id)">`;
            tag += `${elem.innerHTML.split(" ").slice(1).join(" ")}</div>`;
            st += tag;
        }
    }
    setHtml("list", st);
}
