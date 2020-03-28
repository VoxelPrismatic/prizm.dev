//Find
function find_in(thing, ids) {
    var ls = [];
    for(var id of ids.split(" ")) {
        if(id.startsWith("."))
            ls.push(...thing.getElementsByClassName(id.slice(1)));
        else if(id.startsWith(">"))
            ls.push(...thing.getElementsByTagName(id.slice(1)));
        else if(id.startsWith(":"))
            ls.push(...thing.getElementsByName(id.slice(1)));
        else
            return thing.getElementById(id);
    }
    return ls;
}
function find(ids) {
    return find_in(document, ids);
}

//Inner HTML
function findHtml_in(thing, ids) {
    var ls = [];
    var elm = find_in(thing, ids);
    try {
        for(var e of elm)
            ls.push(e.innerHTML);
    } catch(err) {
        return elm.innerHTML; // Not iterable
    }
    if(ls.length == 1)
        return ls[0]
    return ls;
}
function findHtml(ids) {
    return findHtml_in(document, ids);
}

//Outer HTML
function findOHtml_in(thing, ids) {
    var ls = [];
    var elm = find_in(thing, ids);
    try {
        for(var e of elm)
            ls.push(e.outerHTML);
    } catch(err) {
        return elm.outerHTML; // Not iterable
    }
    return ls;
}
function findOHtml(ids) {
    return findOHtml_in(document, ids);
}

//Value
function findVal_in(thing, ids) {
    var ls = [];
    var elm = find_in(thing, ids);
    try {
        for(var e of elm)
            ls.push(e.value);
    } catch(err) {
        return elm.value; // Not iterable
    }
    return ls;
}
function findVal(ids) {
    return findVal_in(document, ids);
}

//Make Element
function Elm(typ, txt, params = {}, end = true) {
    var str = "<" + typ;
    for(var key of params.constructor["entries"](params))
        str += ` ${key[0]}="${key[1]}"`;
    str += `>${txt}`
    if(end)
        str += `</${typ}>`;
    return str;
}

//Edit Inner HTML
function setHtml(thing, val) {
    find(thing).innerHTML = val;
}

function addHtml(thing, val) {
    find(thing).innerHTML += val;
}

//Find & Scroll
function scroll_(ids) {
    try {
        if(ids.endsWith("~"))
            ids = ids.slice(0, -1);
        find(ids).scrollIntoView({behavior: "smooth"});
    } catch(err) {
        console.log(err);
    }
}

function scrollIfNeeded(ids) {
    find(ids).scrollIntoViewIfNeeded({behavior: "smooth"});
}

function scrollBy(ids, x, y) {
    find(ids).scrollBy(x, y, {behavior: "smooth"});
}

function scrollXY(ids, x, y) {
    find(ids).scroll(x, y, {behavior: "smooth"});
}

function scrollToHash(elem) {
    elem.scrollIntoView({behavior: "smooth"});
    window.location = "#" + elem.id;
}

//Others

function linkMe(elem) {
    find("hiddenLink").href = "#" + elem.id;
    find("hiddenLink").click();
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
                var donthideme = locate(thing, page, loc);
                if(!donthideme) {
                    page.style.display = "none";
                    page.classList.add("invis");
                    collapser(page);
                }
                nothidden = nothidden || donthideme;
            } else {
                var rawtext;
                if(page.children.length) {
                    rawtext = page.children.item(0).innerHTML;
                    rawtext += page.children.item(1).innerHTML;
                } else {
                    rawtext = page.innerHTML;
                }
                if(rawtext.search(re) != -1) {
                    nothidden = true
                    page.classList.remove("invis");
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
