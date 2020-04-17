function mk_head(m, p1) {
    for(var x = 0; x < 6; x += 1)
        if(m[x] != "#")
            break;
    var id = p1.replace(/[^\w\d]/gm, "").trim();
    var st = `<h${x} onclick="linkMe(this);"`;
    st += `id="${id}">#] ${esc(p1)}</h${x}>`;
    return st;
}
