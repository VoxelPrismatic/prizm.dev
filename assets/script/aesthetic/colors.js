let colors = {
    "red":     ["#f00", "#211",    "red"],
    "orange":  ["#f80", "#221511", "orange"],
    "yellow":  ["#ff0", "#221",    "yellow"],
    "nuclear": ["#8f0", "#152211", "nuclear"],
    "green":   ["#0f0", "#121",    "green"],
    "sea":     ["#0f8", "#112215", "sea"],
    "cyan":    ["#0ff", "#122",    "cyan"],
    "blurple": ["#4af", "#111522", "blurple"],
    "blue":    ["#44f", "#112",    "blue"],
    "purple":  ["#a4f", "#151122", "purple"],
    "magenta": ["#f0f", "#212",    "magenta"],
    "pink":    ["#f08", "#221115", "pink"],
    "grey":    ["#aaa", "#111",    "grey"],
    "white":   ["#fff", "#222",    "white"],
};

var selectors__ = selectors__ || [];

function swapColor(colorName, swapImg = true) {
    var color;
    var bg;
    var name;
    [color, bg, name] = colors[colorName || "cyan"];
    document.body.style.backgroundColor = bg;
    var rules = getRules();
    if(rules) {
        for(var rule of rules) {
            let txt = rule.selectorText;
            if(txt && selectors__[txt])
                selectors__[txt](rule.style, color, bg);
        }
    }
    var img = find("truelogo");
    var src = `/prizm.dev/assets/image/webp/priz_${name}.webp`;
    if(img.src != src)
        img.src = src; // Change source if different

    /* Resize dict                   *
     * Key --------------------- Val *
     * Twitter ----- @VoxelPrismatic */

    try {
        resizeDicts(false);
    } catch(err) {
        // Not important
    } try {
        setTransitions(false);
    } catch(err) {
        // Not important
    }
}
