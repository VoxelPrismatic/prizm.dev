function mk_head(m, p1, escape = true) {
    for(var x = 0; x < 6; x += 1)
        if(m[x] != "#")
            break;
    var id = p1.replace(/[^\w\d]/gm, "").trim();
    var st = `<h${x} onclick="linkMe(this);"`;
    var thing = "\\u{23}";
    if(!escape) {
        thing = "#";
    }
    st += `id="${id}">${thing}] ${p1}</h${x}>`;
    return st;
}
