async function loadPage() {
    var content = await load("/prizm.dev/assets/text/changes.txt");
    setHtml("log", mark_page(content));
    var st = "";
    for(var elem of $all("#log h1")) {
        var tag = "";
        tag = `<div id="${elem.id}~" `;
        tag += `class="lnk" onclick="scroll_(this.id)">`;
        tag += `${elem.innerHTML.split(" ").slice(1).join(" ")}</div>`;
        st += tag;
    }
    setHtml("list", st);
}
