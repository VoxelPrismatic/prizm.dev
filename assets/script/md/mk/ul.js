function mk_ol(st) {
    var str = "<ul>";
    st = mark_page(st);
    for(var line of st.split("<br>")) {
        str += "<li>" + line + "</li>";
    }
    return str + "</ul>"
}
