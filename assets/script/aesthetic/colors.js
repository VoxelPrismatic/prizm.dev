let colors = {
    "red":     ["#f00", "#211",    "red"],
    "orange":  ["#f80", "#221511", "orange"],
    "yellow":  ["#ff0", "#221",    "yellow"],
    "nuclear": ["#8f0", "#152211", "nuclear"],
    "green":   ["#0f0", "#121",    "green"],
    "sea":     ["#0f8", "#112215", "sea"],
    "cyan":    ["#0ff", "#122",    "blue"],
    "blurple": ["#4af", "#111522", "blurple"],
    "blue":    ["#44f", "#112",    "dark"],
    "purple":  ["#a4f", "#151122", "purple"],
    "magenta": ["#f0f", "#212",    "magenta"],
    "pink":    ["#f08", "#221115", "pink"],
    "grey":    ["#aaa", "#111",    "grey"],
    "white":   ["#fff", "#222",    "white"],
};

function getRules() {
    for(var ruleset of document.styleSheets)
        if(ruleset.ownerNode.id.includes("less:"))
            return ruleset.cssRules;
}

function setTransitions() {
    var rules = getRules();
    var stuffs = [];
    for(var rule of rules) {
        var txt = rule.selectorText;
        if(txt && (txt.includes("hover") || txt.includes("focus"))) {
            if(txt.includes(".sect"))
                rule.style.transition = "none !important";
            else
                stuffs.push(txt.split(":")[0]);
        }
    }
    for(var rule of rules) {
        var txt = rule.selectorText;
        if(txt  && !(txt.includes("hover") || txt.includes("focus"))) {
            var incl = false;
            for(var stuff of stuffs) {
                if(txt.includes(stuff)) {
                    rule.style.transition = "all ease 1s";
                    incl = true;
                    break;
                }
            } if(!incl)
                rule.style.transition = "none";
        }
    }
    for(var css of [".sect", ".dict"])
        for(var elem of find(css))
            elem.style.transition = "none";
}

function swapColor(colorName, swapImg = true) {
    var color;
    var bg;
    var name;
    [color, bg, name] = colors[colorName];
    document.body.style.backgroundColor = bg;
    var rules = getRules();
    if(rules) {
        for(var rule of rules) {
            let txt = rule.selectorText;
            if(!txt)
                continue
            var style = rule.style;
            if(selectors[txt])
                selectors[txt](style, color);
        }
    }
    var img = find("truelogo");
    var src = `/prizm.dev/assets/image/priz_${name}.png`;
    if(img.src != src)
        img.src = src; // Change source if different

    /* Resize dict                   *
     * Key --------------------- Val *
     * Twitter ----- @VoxelPrismatic */

    logFunc(resizeDicts, false);
}
