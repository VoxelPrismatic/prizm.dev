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

function head(m, p1) {
    for(var x = 0; x < 6; x += 1)
        if(m[x] != "#")
            break;
    var id = p1.replace(/[^\w\d]/gm, "").trim();
    var st = `<h${x} onclick="linkMe(this);"`;
    st += `id="${id}">${"#".repeat(x)}] ${p1}</h${x}>`;
    return st;
}

var line_regex = [
    [/\\([^uUNh])/gm, function(m, p) {return "\\u{" + p.charCodeAt(0).toString(16) + "}";}],
    
    //Pre-Escape
    [/^ /gm, "\u200b \u200b"],
    [/\&gt;/gm, ">"],
    [/\&lt;/gm, "<"],

    //Links
    [/\+\[\[(.+?)\]\]\<(.+?)\>/gm, "<a href='$2' target='\x5fblank'><span class='btn'>$1</span></a>"],
    [/\+\[(.+?)\]\<(.+?)\>/gm, "<a href='$2' target='\x5fblank'>$1</a>"],
    [/\[\[(.+?)\]\]\<(.+?)\>/gm, "<a href='$2'><span class='btn'>$1</span></a>"],
    [/\[(.+?)\]\<(.+?)\>/gm, "<a href='$2'>$1</a>"],
    [/\@\[(.+?)\]\((.+?)\)/gm, "<img alt='$1' src='$2'>"],
    [/e<<(.+?)>>/gm, "<a href='mailto:$1>$1</a>"],
    [/p<<(.+?)>>/gm, "<a href='tel:$1>$1</a>"],
    [/e\[(.+?)]<(.+?)>/gm, "<a href='mailto:$2'>$1</a>"],
    [/p\[(.+?)]<(.+?)>/gm, "<a href='tel:$2'>$1</a>"],
    [/<<(.+?)>>/gm, "<a href='$1'>$1</a>"],

    //Unicode Escape
    [/^\\x([A-Fa-f0-9]{2})/gm, "\\u{$1}"],
    [/^\\U([A-Fa-f0-9]{8})/gm, "\\u{$1}"],
    [/^\\u([A-Fa-f0-9]{4})/gm, "\\u{$1}"],
    [/^\\N\{(.+?)\}/gm, function(m, p) {return "\\u{"+unimap(p.toUpperCase())+"}";}],
    [/([^\\])\\x([A-Fa-f0-9]{2})/gm, "$1\\u{$2}"],
    [/([^\\])\\U([A-Fa-f0-9]{8})/gm, "$1\\u{$2}"],
    [/([^\\])\\u([A-Fa-f0-9]{4})/gm, "$1\\u{$2}"],
    [/([^\\])\\N\{(.+?)\}/gm, function(m, a, p) {return a+"\\u{"+unimap(p.toUpperCase())+"}";}],
    [/\\([^u])/gm, function(m, p1) {return `\\u{${p1.charCodeAt(0).toString(16)}}`;}],

    //Headers
    [/^\#\] +(.+)$/gm, head],
    [/^\##\] +(.+)$/gm, head],
    [/^\###\] +(.+)$/gm, head],
    [/^\####\] +(.+)$/gm, head],
    [/^\#####\] +(.+)$/gm, head],
    [/^\######\] +(.+)$/gm, head],
    
    //Main MD
    [/^\#(.+?)\#/gm, "<b>$1</b>"],
    [/^\*(.+?)\*/gm, "<i>$1</i>"],
    [/^\_(.+?)\_/gm, "<u>$1</u>"],
    [/^\~(.+?)\~/gm, "<s>$1</s>"],
    [/^\`(.+?)\`/gm, `<span class="code">$1</span>`],
    [/^\^(.+?)\^/gm, "<sup>$1</sup>"],
    [/^\%(.+?)\%/gm, "<sub>$1</sub>"],
    [/^\!\!(.+?)\!\!/gm, `<span class="hide" onclick="this.classList.toggle('unhide');">$1</span>`],
    [/([^\\])\#(.+?)\#/gm, "$1<b>$2</b>"],
    [/([^\\])\*(.+?)\*/gm, "$1<i>$2</i>"],
    [/([^\\])\_(.+?)\_/gm, "$1<u>$2</u>"],
    [/([^\\])\~(.+?)\~/gm, "$1<s>$2</s>"],
    [/([^\\])\`(.+?)\`/gm, `$1<span class="code">$2</span>`],
    [/([^\\])\^(.+?)\^/gm, "$1<sup>$2</sup>"],
    [/([^\\])\%(.+?)\%/gm, "$1<sub>$2</sub>"],
    [/([^\\])\!\!(.+?)\!\!/gm, `$1<span class="hide" onclick="this.classList.toggle('unhide');">$2</span>`],
    [/^\:\: (.+)$/gm, `<span class="md-com">\u200b \u200b$1</span>`],
    
    //Alignment
    [
        /(.*)\:\^\:(.*)/gm,
        "<div style='height: 24px;'>" + 
        "<div style='float: left;'>$1</div>" + 
        "<div class='dict'></div>" + 
        "<div style='float: right;'>$2</div>" + 
        "</div></br>"
    ],
    [/^\:\{\:(.+)/gm, "<div style='text-align: left;'>$1</div>"],
    [/^\:\}\:(.+)/gm, "<div style='text-align: right;'>$1</div>"],
    [/^\:\;\:(.+)/gm, "<div style='text-align: center;'>$1</div>"],

    //Others
    [/\{\{(\w+?)\}\}(.+?) /gm, "<span class='$1'>$2 </span>"],
    [/^--([\w\d_.-]+)--$/gm, "<div id='$1'></div></br>"],
    [/\\ *$/gm, "</br>"], //New line escape
    [/-~-/gm, "<div class='line'></div></br>"],
    [/(<u>_<\/u>|___)/gm, "<div>"],
    [/===/gm, "</div>"],

    [/\\u\{([a-fA-F0-9]+)\}/gm, function(m, p1) {return String.fromCharCode("0x"+p1);}],
];

function mark(st) {
    for(var r of line_regex) {
        if(typeof r[1] == "string" && !(r[1].startsWith("\\u")))
            st = st.replace(r[0], r[1]);
        else
            st = st.replace(r[0], r[1]);
    }
    return st;
}

function mk_table(st) {
    var table_lines = -1;
    var table_aligns = [];
    var table_str = [];
    var str = "";
    for(var line of st.split("\n")) {
        if(line != "" && line.replace(/^(\|.+)+\|$/gm, "") == "") {
            table_lines += 1
            table_str.push([]);
            if(table_lines == 0) {
                for(var header of line.split("|").slice(1, -1)) {
                    header = trim(header);
                    if(header.startsWith(":") && header.endsWith(":")) {
                        table_str[0].push(trim(header.slice(1, -1)));
                        table_aligns.push("center");
                    } else if(header.startsWith(":")) {
                        table_str[0].push(trim(header.slice(1)));
                        table_aligns.push("left");
                    } else if(header.endsWith(":")) {
                        table_str[0].push(trim(header.slice(0, -1)));
                        table_aligns.push("right");
                    } else {
                        table_str[0].push(trim(header));
                        table_aligns.push("left");
                    }
                }
            } else {
                for(var cell of line.split("|").slice(1, -1)) {
                    table_str.slice(-1)[0].push(trim(cell));
                }
                var max_len = 0;
                for(var row of table_str)
                    if(row.length > max_len)
                        max_len = row.length;
                for(var r = 0; r < table_str.length; r++)
                    while(table_str[r].length < max_len) {
                        table_str[r].push("");
                        if(r == 0)
                            table_aligns.push("left");
                    }
            }
            continue;
        }
    }
    var row_num = -1;
    str += "<table>";
    for(var row of table_str) {
        row_num += 1;
        str += "<tr>";
        var col_num = -1;
        for(var col of row) {
            col_num += 1;
            if(row_num == 0)
                str += Elm("th", mark_page(col), {style: "text-align: "+table_aligns[col_num]});
            else
                str += Elm("td", mark_page(col), {style: "text-align: "+table_aligns[col_num]});
        }
        str += "</tr>";
    }
    str += "</table>";
    return "</span>"+str+"<span>";
}

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

function mark_page(st) {
    if(!(st.endsWith("\n")))
       st += "\n";
    st = st.replace(/\\ *\n/gm, "");
    var str = "";
    var py = "";
    var table = "";
    var ol = "";
    var ul = "";
    var inpy = false;
    var intable = false;
    var inol = false;
    var inul = false;
    var incode = false;
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
    return str;
}
