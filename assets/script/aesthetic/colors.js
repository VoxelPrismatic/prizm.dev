let colors = {
    "red":     ["#f00", "#211",    "red"],
    "orange":  ["#f80", "#221511", "orange"],
    "yellow":  ["#ff0", "#221",    "yellow"],
    "green":   ["#0f0", "#121",    "green"],
    "cyan":    ["#0ff", "#122",    "blue"],
    "blue":    ["#44f", "#112",    "dark"],
    "pink":    ["#f08", "#221115", "pink"],
    "grey":    ["#aaa", "#111",    "grey"],
    "white":   ["#fff", "#222",    "white"],
    "purple":  ["#a0f", "#151122", "purple"],
    "blurple": ["#0af", "#111522", "blurple"]
}; let ls1 = [
    ".sect",
    ".sect:hover, .sect:focus",
    ".collapser",
    ".collapser:hover, .collapser:focus",
    ".collopen",
    ".collopen:hover, .collopen:focus"
]; let ls2 = [
    ".lnk:hover, .lnk:focus",
    ".sel:hover, .sel:focus",
    ".sel",
    ".lnk",
    ".btn"
];

function setTransitions() {
    var rules = document.styleSheets[2].cssRules;
    var stuffs = [];
    for(var rule of rules) {
        var txt = rule.selectorText;
        if(txt && (txt.includes("hover") || txt.includes("focus")) && !txt.includes(".sect")) {
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
            } if(!incl) {
                rule.style.transition = "none";
            }
        }
    }
}

function swapColor(colorName, swapImg = true) {
    var color;
    var bg; 
    var name;
    [color, bg, name] = colors[colorName];
    document.body.style.backgroundColor = bg;
    var rules = document.styleSheets[2].cssRules;
    for(var rule of rules) {
        let txt = rule.selectorText;
        if(!txt)
            continue
        var style = rule.style;
        if(selectors[txt]) {
            selectors[txt](style, color);
        }
    }
    if(swapImg)
        find("truelogo").src = `/prizm.dev/assets/image/priz_${name}.png`;
    /*Resize dict
    Key --------------------- Val
    Twitter ----- @VoxelPrismatic
    */
    resizeDicts(false);
}
