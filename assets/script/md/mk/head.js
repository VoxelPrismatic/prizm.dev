function mk_head(m, p1, escape = true, cls = "") {
    if(cls == m) {
        cls = "";
    }
    for(var x = 0; x < 6; x += 1)
        if(m[x] != "#")
            break;
    var id_ = p1.replace(/(\\u\{.*\}|[^\w\d])/gm, "").trim();
    var st = `<h${x} onclick="linkMe(this);"`;
    var thing = "\\u{23}";
    if(!escape) {
        thing = "#";
    }
    if(cls) {
        st += ` class="${cls}"`;
    }
    st += ` id="${id_}">${thing}] ${p1}</h${x}>`;
    return st;
}
