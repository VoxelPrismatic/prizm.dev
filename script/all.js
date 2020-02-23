function load(filename, aio = false) {
    var f = new XMLHttpRequest()
    f.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resp = f.responseText;
            resp = resp.trim() + "\n"
            setHtml("file", resp.replace(/</gm, "&lt;").replace(/>/gm, "&gt;"));
        }
    }
    f.open("GET", filename, aio);
    f.send();
    if(aio)
        return new Promise(resolve => {
            setTimeout(() => {resolve(findHtml("file"));}, 100)
        });
    return findHtml("file");
}

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
                if(lnk.className.includes("sel"))
                   lnk.classList.remove("sel");
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

function regex(st, id) {
    st = st.trim();
    find(id).style.color = "#ffffff";
    if(st == "")
        return 1;
    if(st.endsWith("/") && st.startsWith("/")) {
        try {
            find(id).style.color = "#00ffff";
            return RegExp(st.slice(1, -1), "gm");
        } catch(err) {
            find(id).style.color = "#ff0000";
            return 1;
        }
    }
    var re = "(";
    for(var ch of st) {
        var lc = ch.toLowerCase().charCodeAt(0).toString(16);
        var uc = ch.toUpperCase().charCodeAt(0).toString(16);
        while(lc.length < 4)
            lc = "0" + lc;
        while(uc.length < 4)
            uc = "0" + uc;
        re += `[\\u${lc}\\u${uc}\\u200b\\\\]`; //Escape chars
    }
    re += ")";
    return RegExp(re, "gm");
}

function locate(thing, parent = find("list"), loc = "find_command") {
    var pages = parent.children;
    re = regex(thing, loc);
    var nothidden = false;
    for(var page of pages) {
        if(page.tagName != "DIV")
            continue;
        page.classList.remove("invis");
        page.style.display = "block";
        if(re != 1) {
            if(page.className.includes("collapser")) {
                if(!page.className.includes("collopen")) {
                    collapser(page);
                }
                var donthideme = filter_docs(thing, page, loc);
                if(!donthideme) {
                    page.style.display = "none";
                    page.classList.add("invis");
                    collapser(page);
                }
                nothidden = nothidden || donthideme;
            } else {
                var rawtext = page.children.item(0).innerHTML;
                rawtext += page.children.item(1).innerHTML;
                if(rawtext.search(re) != -1) {
                    nothidden = true
                } else {
                    page.style.display = "none";
                    page.classList.add("invis");
                }
            }
        }
    }
    if(re == 1) {
        collall();
    }
    return nothidden;
}

function locater(elem) {
    locate(elem.value, elem.parent, elem.id);
}

function locateId(id) {
    locater(find(id));
}
