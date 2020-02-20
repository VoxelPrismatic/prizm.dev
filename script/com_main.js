function loadPage() {
    var index = JSON.parse(load("/prizm.dev/data/commands.json"));
    var st = "";
    for(var com in index.constructor.keys(index)) {
        var div = `<div id="${com} ${index[com]["alias"].join(" ")}">`;
        var mark = `#] The \`${com.toUpper()}\` command\n`;
        mark += `#Category: #${index[com]["cat"]}\n`;
        mark += `#Aliases: \`${";]" + index[com]["alias"].join("`, `;]" || "NONE")}\`\n`;
        
    }
}
