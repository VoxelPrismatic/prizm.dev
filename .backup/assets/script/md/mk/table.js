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
    return str.replace(/<br><\/t(d|h)>/gm, "</t$1>");
}
