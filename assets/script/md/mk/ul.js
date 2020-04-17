function mk_ul(st, thing = "ul") {
    var str = `<${thing}>`;
    st = mark_page(st);
    for(var line of st.split("<br>")) {
        if(line) {
            if(line.startsWith("<ul>") || line.startsWith("<ol>"))
            str += "<li class='hidden-marker'>" + line + "</li>";
        }
    }
    return str + `</${thing}><br>`;
}
