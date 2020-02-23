function loadPage() {
    var things = {}
    var index = JSON.parse(load("/prizm.dev/data/commands.json"));
    var st = "";
    var comindex = "";
    for(var com of index.constructor.keys(index)) {
        var div = `<div id="${com} ${index[com]["alias"].join(" ")}">`;
        var mark = `#] The \`${com.toUpperCase()}\` command\n`;
        mark += `#Category: #${index[com]["cat"]}\n`;
        mark += `#Aliases: \`${";]" + index[com]["alias"].join("`, `;]" || "NONE")}\`\n`;
        mark += `#] Usage\n\`\`\`${index[com]["use"]}\`\`\`\n`;
        mark += `#] More info\n\`\`\`${index[com]["desc"]}\`\`\`\n`;
        mark += `#NOTICE:# The \`{arg}\` stuff is what to put, not what to write.\n`;
        mark += `#EXAMPLE:# \`;]help {?com}\` can be \`;]help\` or \`;]help graph\``;
        try {
            things[index[com]["cat"]][com] = mark;
        } catch(err) {
            things[index[com]["cat"]] = {};
            things[index[com]["cat"]][com] = mark;
        }
    }
    for(var cat of things.constructor.keys(things)) {
        st += `<div id="DROP_${cat}" class="collapser" onmouseover="setcoll(this)" onclick="collapser(this)">`;
        for(var com of things.constructor.keys(things[cat])) {
            st += `<div id="COM_${com}" style="display: none" class="lnk">`;
            st += `${com}</div>`;
            comindex += `<div id="${com}">${mark_page(things[cat][com])}</div>`;
        }
        st += "</div>";
    }
    setHtml("command_index", comindex);
    setHtml("list", st);
    setHtml("com_help", "^ Choose a command");
}

window.setTimeout(loadPage, 100);
