function mk_ul(st) {
    var str = "";
    var ul = [];
    for(var line of st.split("\n").slice(0, -1))
        ul.push(trim(line.slice(2)));
    str += "<ul>";
    for(var li of ul)
        str += `<li>${mark_page(li)}</li>`;
    str += "</ul>";
    return "</span>"+str+"<span>";
}
