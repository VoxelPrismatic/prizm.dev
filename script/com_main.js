function loadPage() {
    var things = {}
    var index = JSON.parse(load("/prizm.dev/data/commands.json"));
    var st = "";
    var comindex = "";
    for(var com of index.constructor.keys(index)) {
        var div = `<div id="${com} ${index[com]["alias"].join(" ")}">`;
        var mark = `#] The \`${com.toUpperCase()}\` command\n`;
        mark += `#Category: #${index[com]["cat"]}\n`;
        mark += `#Description: #${index[com]["desc"]}\n`
        if(index[com]["alias"].length)
            mark += `#Aliases: #\`${";]" + index[com]["alias"].join("`, `;]")}\`\n`;
        else
            mark += `#Aliases: #\`NONE\`\n`;
        mark += `#] Usage\n\`\`\`${index[com]["use"]}\`\`\`\n`;
        mark += `#] Input info\n\`\`\`${index[com]["inp"]}\`\`\`\n`;
        mark += `#NOTICE:# The \`{arg}\` stuff is what to put, not what to write.\n`;
        mark += `#EXAMPLE:# \`;]help {?com}\` can be \`;]help\` or \`;]help ${com}\``;
        try {
            things[index[com]["cat"]][com] = mark;
        } catch(err) {
            things[index[com]["cat"]] = {};
            things[index[com]["cat"]][com] = mark;
        }
    }
    for(var cat of things.constructor.keys(things)) {
        st += `<div id="DROP_${cat}" class="collapser" onmouseover="setcoll(this)" onclick="collapser(this)">${cat}`;
        for(var com of things.constructor.keys(things[cat])) {
            st += `<div id="COM_${com}" style="display: none" class="lnk" `;
            st += `onmouseover="setcoll(this)" onclick="collapser(this)">`
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


function collsel(elem = find("list")) {
    var ch = elem.children;
    var itm = null;
    for(var c of ch) {
        if(c.className.includes("collhover"))
            itm = null;
        var tmp = collsel(c);
        if(tmp != null) 
            return itm
    }
    return itm;
}
    

function setcoll(elem) {
    colldesel();
    if(!elem.className.includes("collopen") && elem.className.includes("collapser")) {
        var child = elem.children;
        for(var c of child) {
            if(c.style.display == "block" && !c.className.includes("invis")) {
                collapser(elem);
                break;
            }
        }
    }
}

function setjump(elem) {
    colldesel(find("sect"));
    if(!elem.className.includes("collopen") && elem.className.includes("collapser")) {
        var child = elem.children;
        for(var c of child) {
            if(c.style.display == "block" && !c.className.includes("invis")) {
                collapser(elem);
                break;
            }
        }
    }
}

function colldesel(elem = find("list")) {
    var ch = elem.children;
    for(var c of ch) {
        if(c.className.includes("collhover"))
            collapser(c, true);
        colldesel(c);
    }
}

var timeout = false;

function collapser(elem, force = false) {
    if(globalThis.timeout && !force)
        return;
    globalThis.timeout = true;
    window.setTimeout(function() {globalThis.timeout = false;}, 500);
    //Set timeout so multiple collapses cannot run at the same time
    if(elem.className.includes("lnk")) {
        for(var cat of find("list").children)
            for(var lnk of cat.children)
                if(elem.className.includes("sel"))
                   elem.classList.remove("sel");
        elem.classList.add("sel");
        setHtml("com_help", findHtml(elem.id.slice(4)));
        return;
    }
    if(elem == undefined || elem == null)
        return;
    var disp = true;
    var name = "collapser collopen";
    if(elem.className.includes("collopen")) {
        disp = false;
        name = "collapser";
    }
    var thing = elem.children;
    for(var child of thing) {
        if(child.tagName != "DIV")
            continue;
        if(disp && !child.className.includes("invis"))
            child.style.display = "block";
        else
            child.style.display = "none";
    }
    elem.className = name;
}

function collall(parent = find("list")) {
    var child = parent.children;
    for(var c of child) {
        if(c.className.includes("collapser")) {collapser(c, true);
        	if(c.className.includes("collopen")) {
            	collapser(c, true);
        	}
        	collall(c);
    	}
    }
}
