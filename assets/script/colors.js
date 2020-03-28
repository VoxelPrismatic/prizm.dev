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
    for(var rule of rules) {
        var txt = rule.selectorText;
        if(txt) {
            if(txt.includes("hover") || txt.includes("focus") || txt == "div")
                continue;
            rule.style.transition = "all ease 1s";
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
        if(txt == undefined)
            continue
        var style = rule.style;
        if(txt == "h1, h2, h3, h4, h5, h6") {
            style.color = color;
        } else if(txt == "#logo:hover") {
            style.filter = "drop-shadow(0px 0px 5px " + color + ")";
        } else if(txt == "a") {
            style.color = color.replace(/[a]/gm, "c").replace(/[04]/gm, "8");
        } else if(txt == "a:hover, a:focus") {
            style.color = color.replace(/[a]/gm, "e").replace(/[04]/gm, "c");
        } else if(txt == ".tab") {
            style.borderTopColor = color;
        } else if(ls1.includes(txt)) {
            var tmp = color;
            if(txt.includes(".collapser")) {
                tmp = colors["grey"][0];
                style.backgroundColor = tmp + "0";
            } if(txt.includes("coll") && txt.includes(":hover")) {
                tmp = colors["white"][0];
                style.backgroundColor = tmp + "0";
            } if(ls1.slice(3).includes(txt)) {
                style.borderBottomColor = tmp;
                style.color = tmp;
            }
            style.borderTopColor = tmp;
            style.borderLeftColor = tmp;
            style.borderRightColor = tmp;
        } else if(txt.includes("line")) {
            var linetmp = "0px 0px 5px " + color;
            if(txt.includes("hover"))
                linetmp = "0px 0px 10px " + color;
            style.boxShadow = linetmp + ", inset " + linetmp;
            style.borderColor = color;
        } else if(ls2.includes(txt)) {
            var tmp;
            if(txt.includes(".lnk:hover")) {
                tmp = color.replace(/[a]/gm, "c").replace(/[04]/gm, "8") + "8";
            } else if(txt == ".sel") {
                tmp = color.replace(/[a]/gm, "e").replace(/[04]/gm, "c") + "8";
            } else if(txt.includes(".sel:hover")) {
                tmp = color + "a";
            } else if(txt == ".lnk") {
                tmp = color + "8";
            } if(txt != ".lnk") {
                rule.style.backgroundColor = color + "4";
            }
            style.borderTopColor = tmp;
            style.borderLeftColor = tmp;
            style.borderRightColor = tmp;
            style.color = tmp.slice(0, 4);
        } else if(txt.includes(".btn")) {
            var tmp = color.replace(/[a]/gm, "e").replace(/[04]/gm, "c");
            if(!txt.includes("hover")) {
                tmp = color;
            }
            style.borderTopColor = tmp;
            style.borderLeftColor = tmp;
            style.borderRightColor = tmp;
            style.color = tmp;
            style.backgroundColor = tmp + "4";
        } else if(rule.selectorText.includes("#jumper")) {
            style.borderTopColor = color;
            style.borderLeftColor = color;
            style.color = color;
            style.boxShadow = "0px 0px 4px " + color;
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
