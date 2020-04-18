function mk_ul(st, thing = "ul") {
    var str = `<${thing}>`;
    st = mark_page(st);
    for(var line of st.split("<br>")) {
        if(line) {
            var extra = "";
            if(line.startsWith("<ul>") || line.startsWith("<ol>")) {
                extra = ' class="hidden-marker"';
            }
            str += `<li${extra}>` + line + "</li>";
        }
    }
    return str + `</${thing}><br>`;
}
