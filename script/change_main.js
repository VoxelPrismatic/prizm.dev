function loadPage() {
    setHtml("log", mark_page(load("/prizm.dev/text/changes.txt")));
    var st = "";
    for(var elem of find("log").children) {
        if(elem.tagName == "H1") {
            var tag = "";
            tag = `<div id="${elem.id}~" `;
            tag += `class="lnk" onclick="scroll(this.id.slice(0, -1))">`;
            tag += `${elem.innerHTML.split(" ", 1)[1]}</div>`;
            st += tag;
        }
    }
    setHtml("list", st);
}
