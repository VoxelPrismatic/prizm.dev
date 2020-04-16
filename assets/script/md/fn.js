function trim(str) {
    return str.replace(/<br>/gm, "\n").replace(/^([ \u200b\n]+)/, "").replace(/([ \u200b\n]+)$/, "").trim();
}

var hexs = [];

function rngHex(len = 16) {
    var st = "";
    for(var x = 0; x < len; x += 1)
        st += Math.floor(Math.random() * 16).toString(16)
    if(globalThis.hexs.includes(st))
        st = rngHex();
    globalThis.hexs.push(st);
    return st;
}

function esc(st) {
    st = st.replace(/\\u\{([a-fA-F0-9]+)\}/gm, function(m, p1) {return String.fromCharCode("0x" + p1);});
    var lnk = "";
    for(var c of st) {
        lnk += "\\u{" + c.charCodeAt(0).toString(16) + "}";
    }
    return lnk
}

function head(m, p1) {
    for(var x = 0; x < 6; x += 1)
        if(m[x] != "#")
            break;
    var id = p1.replace(/[^\w\d]/gm, "").trim();
    var st = `<h${x} onclick="linkMe(this);"`;
    st += `id="${id}">#] ${p1}</h${x}>`;
    return st;
}
