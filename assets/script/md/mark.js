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
    var inpy = false;
    var intable = false;
    var inol = false;
    var inul = false;
    var incode = false;
    var inquoted = false;

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
            inquoted = true;
            quoted += line.slice(3) + "\n";
            continue;
        }
        if(inquoted) {
            inquoted = false;
            str += "<blockquote>" + mark_page(quoted.slice(0, -1)).slice(0, -4) + "</blockquote>";
            quoted = "";
        }

        //Table
        if(line.replace(/^(\|.+)+\|$/gm, "") == "" && !intable && line != "") {
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

        // Ordered list
        if(line.replace(/^\d+[\]\)\.\-] .*$/gm, "") == "" && !inol && line != "") {
            inol = true;
        }
        if((line == "---" || line == "" || line.replace(/^\d+[\]\)\.\-] .*$/gm, "") != "") && inol) {
            str += mk_ol(ol);
            ol = "";
            inol = false;
            continue;
        }
        if(inol) {
            ol += line + "\n";
            continue;
        }

        // Unordered list
        if(line.replace(/^[\>\]\)\~\-\+] .*$/gm, "") == "" && !inul && line != "") {
            inul = true;
        }
        if((line == "---" || line == "" || line.replace(/^[\+\]\)\-] .*$/gm, "") != "") && inul) {
            str += mk_ul(ul);
            ul = "";
            inul = false;
            continue;
        }
        if(inul) {
            ul += line + "\n";
            continue;
        }

        line = mark(line);
        if(line.endsWith("<br>"))
            str += line.slice(0, -4) + "</span><br></span>";
        else if(line.endsWith("§"))
            str += line.slice(0, -1);
        else if(line.includes("</br>"))
            str += line.replace(/<\/br>/gm, "");
        else
            str += line+"\n";
    }
    str = str.replace(/\n/gm, "<br>");
    //Only one <br> after ending block
    str = str.replace(/\<(\/(h\d|div))\>([ \n]*\<br\>[ \n]*)+/gm, "<$1><br>");
    //No <br> after starting block
    str = str.replace(/\<(div|h\d)\>([ \n]*\<br\>[ \n]*)+/gm, "<$1>");
    str = str.replace(/(<br>)*?<(\/)blockquote>(<br>)*?/gm, "<$2blockquote>");
    return str;
}
