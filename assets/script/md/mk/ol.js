function mk_ol(st) {
    var str = "";
    var ol = [];
    for(var line of st.split("\n").slice(0, -1))
        ol.push(trim(line.replace(/^\d+[\]\)\.\-] (.*)$/gm, "$1")));
    str += "<ol>";
    for(var li of ol)
        str += `<li>${mark_page(li)}</li>`;
    str += "</ol>";
    return "</span>"+str+"<span>";
}
