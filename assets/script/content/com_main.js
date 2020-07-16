var categories = {
    "fun": "Fun & Games",
    "math": "Math & Calculators",
    "pub": "Fun & Games",
    "oth": "Other things",
    "ai": "Artificial Intelligence",
    "inf": "Informational content",
    "mod": "Moderation stuff",
    "music": "Sounds & Music",
    "dis": "Discord & Meta",
    "int": "Interative [between 2 people]",
}

var commands = {};

async function loadPage() {
    try {
        var target_command = document.URL.split("?command=")[1].split("&")[0];
    } catch(err) {
        var target_command = null;
    }
    var things = {};
    var index = await load("/prizm.dev/assets/data/commands.json", {json: true});
    var st = "";
    var comindex = "";
    for(var com of Object.keys(index)) {
        commands[com] = index[com]["alias"];
        var div = `<div id="${com} ${index[com]["alias"].join(" ")}">`;
        var mark = `#] The \`${com.toUpperCase().replace(/_/gm, "\\_")}\` command\n`;
        mark += `#Category: #${categories[index[com]["cat"]]}\n`;
        mark += `#Description: #${index[com]["desc"]}\n`
        if(index[com]["alias"].length)
            mark += `#Aliases: #\`${";]" + index[com]["alias"].join("`, `;]")}\`\n`;
        else
            mark += `#Aliases: #\`NONE\`\n`;
        mark += `#] Usage\n\`\`\`\n${index[com]["use"]}\n\`\`\`\n`;
        mark += `#] Input info\n\`\`\`\n${index[com]["inp"]}\n\`\`\`\n\n`;
        mark += `#NOTICE:# The \`{arg}\` stuff is what to put, not what to write.\n`;
        mark += `#EXAMPLE:# \`;]help {?com}\` can be \`;]help\` or \`;]help ${com}\``;
        try {
            things[index[com]["cat"]][com] = mark;
        } catch(err) {
            things[index[com]["cat"]] = {};
            things[index[com]["cat"]][com] = mark;
        }
    }
    for(var cat of Object.keys(things)) {
        st += `<div id="DROP_${cat}" class="collapser" onmouseover="setcoll(this)" `;
        st += `onclick="collapser(this)">${categories[cat]}`;
        for(var com of things.constructor.keys(things[cat])) {
            st += `<div id="COM_${com}" style="display: none" class="lnk" `;
            st += `onmouseover="setcoll(this)" onclick="collapser(this, false, '?command=${com}')" `;
            st += `search-terms="${com} ${commands[com].join(" ")} ${cat}">`;
            st += `${com}</div>`;
            comindex += `<div id="${com}">${mark_page(things[cat][com])}${footer.outerHTML}</div>`;
        }
        st += "</div>";
    }
    setHtml("command_index", comindex);
    setHtml("list", st);
    setHtml("com_help", "^ Choose a command");
    try {
        document.getElementById("COM_" + target_command).click();
    } catch(err) {
    }
}
