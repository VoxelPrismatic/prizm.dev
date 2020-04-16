function mark(st) {
    for(var r of line_regex) {
        if(typeof r[1] == "string" && !(r[1].startsWith("\\u")))
            st = st.replace(r[0], r[1]);
        else
            st = st.replace(r[0], r[1]);
    }
    return st;
}

function mark_page(st) {
    if(!(st.endsWith("\n")))
       st += "\n";
    st = st.replace(/\\ *\n/gm, "");

    var str = "";
    var py = "";
    var table = "";
    var ol = "";
    var ul = "";
    var quoted = "";
    var incode = false;
    var intable = false;

    for(var line of st.split("\n")) {
        if(line == "```") {
            incode = !incode;
            if(incode)
                str += `<div class="code">`;
            else
                str += `</div>`
            continue;
        }
        if(incode) {
            str += line + "\n";
            continue;
        }

        //Block Quote
        if(line.startsWith(":: ")) {
            quoted += line.slice(3) + "\n";
            continue;
        }
        if(quoted) {
            str += "<blockquote>" + mark_page(quoted.slice(0, -1)).slice(0, -4) + "</blockquote>";
            quoted = "";
        }

        //Table
        if(line && line.replace(/^(\|.+)+\|$/gm, "") == "" && !intable) {
            intable = true;
        }
        if((line == "---" || line == "" || line.replace(/^(\|.+)+\|$/gm, "") != "") && intable) {
            str += mk_table(table).replace(/\n/gm, "<br>");
            table = "";
            intable = false;
            continue;
        }
        if(intable) {
            table += line + "\n";
            continue;
        }
        
        if(line && line.replace(/^\d+[\]\)\.\-] .*$/gm, "") == "") {
            ol += line.replace(/^\d+[\]\)\.\-] /gm, "") + "\n";
            continue;
        }
        if(ol) {
            str += mk_ol(ol.slice(0, -1));
            ol = "";
        }

        // Unordered list
        if(line && line.replace(/^[\>\]\)\~\-\+] .*$/gm, "") == "") {
            ul += line.slice(2) + "\n";
            continue;
        }
        if(ul) {
            str += mk_ul(ul.slice(0, -1));
            ul = "";
        }

        line = mark(line);
        if(line.endsWith("<br>"))
            str += line.slice(0, -4) + "<br>";
        else if(line.endsWith("§"))
            str += line.slice(0, -1);
        else if(line.includes("</br>"))
            str += line.replace(/<\/br>/gm, "");
        else
            str += line+"\n";
    }
    str = str.replace(/\n/gm, "<br>");
    //Only one <br> after start/end tag
    str = str.replace(/\<((\/)?(h\d|div|ol|ul))\>([ \n]*\<br\>[ \n]*)+/gm, "<$1$2><br>");
    str = str.replace(/([ \n]*\<br\>[ \n]*)+\<((\/)?(h\d|div|ol|ul))\>/gm, "<br><$2$3>");
    str = str.replace(/(<br>)*?<(\/)blockquote>(<br>)*?/gm, "<$2blockquote>");
    return str;
}
