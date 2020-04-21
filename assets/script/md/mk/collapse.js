function mk_drop(st) {
    var str = "";
    var id = st.split("\n")[0].sub(3, -3);
    var heading = mk_head(id);
    id = "DROP_" + heading.split("id=")[1].split(">")[0].slice(1, -1);
    str += `<div id=${id} class="dropper dropper-closed" onclick="this.classList.toggle('dropper-closed')">`;
    str += heading + "<div>" + mark_page(st.split("\n").slice(1).join("\n");
    str += "</div></div>";
    return st;
}
