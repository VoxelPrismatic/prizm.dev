function mk_dropper(st) {
    var str = "";
    var id = st.split("\n")[0].slice(3, -3);
    var heading = mk_head(id, id.split(" ").slice(1).join(" "), false);
    var thing = heading.slice(-5);
    heading = heading.slice(0, -5);
    heading += "<span class='h-dropper h-dropper-closed' onclick='toggleDrop(this)'>[V]</span>";
    heading += thing;
    id = "DROP_" + heading.split("id=")[1].split(">")[0].slice(1, -1);
    str += `<div id=${id} class="dropper dropper-closed">`;
    str += heading + "<div>" + mark_page(st.split("\n").slice(1).join("\n"));
    str += "</div></div>";
    return str;
}
