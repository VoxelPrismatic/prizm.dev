function mk_ul(st, thing = "ul") {
    var str = `<${thing}>`;
    st = mark_page(st);
    for(var line of st.split("<br>")) {
            if(line.startsWith("<ul>") || line.startsWith("<ol>")) {
                str = str.slice(0, -5);
                str += line + "</li>";
            } else {
                str += `<li>` + line + "</li>";
            }
        }
    }
    return str + `</${thing}><br>`;
}
