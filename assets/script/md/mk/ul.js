function mk_ul(st) {
    var str = "<ul>";
    st = mark_page(st);
    for(var line of st.split("<br>")) {
        if(line) {
            str += "<li>" + line + "</li>";
        }
    }
    return str + "</ul><br>"
}
