function mk_ol(st) {
    var str = "<ol>";
    st = mark_page(st);
    for(var line of st.split("<br>")) {
        if(line) {
            str += "<li>" + line + "</li>";
        }
    }
    return str + "</ol><br>"
}
