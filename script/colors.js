let colors = {
    "red":     ["#f00", "#211",    "red"],
    "orange":  ["#f80", "#221511", "orange"],
    "yellow":  ["#ff0", "#221",    "yellow"],
    "green":   ["#0f0", "#121",    "green"],
    "cyan":    ["#0ff", "#122",    "blue"],
    "blue":    ["#00f", "#112",    "dark"],
    "pink":    ["#f08", "#221115", "pink"],
    "grey":    ["#aaa", "#111",    "grey"],
    "white":   ["#fff", "#222",    "white"],
    "purple":  ["#80f", "#151122", "purple"],
    "blurple": ["#08f", "#111522", "blurple"]
}; let swapped = {
    "red": "green",
    "orange": "blue",
    "yellow": "cyan",
    "green": "red",
    "cyan": "yellow",
    "pink": "blurple",
    "grey": "white",
    "white": "grey",
    "purple": "pink",
    "blurple": "purple",
    "blue": "yellow"
}; let desel = {
    "red": "yellow",
    "orange": "green",
    "yellow": "cyan",
    "green": "cyan",
    "cyan": "pink",
    "pink": "orange",
    "purple": "red",
    "blurple": "orange",
    "white": "white",
    "grey": "grey",
    "blue": "yellow"
}; let btncol = {
    "red": "orange",
    "orange": "yellow",
    "yellow": "orange",
    "green": "yellow",
    "cyan": "blue",
    "blue": "blurple",
    "pink": "red",
    "white": "grey",
    "grey": "white",
    "purple": "blue",
    "blurple": "blue"
}; let ls1 = [
    ".line",
    ".sect",
    ".collapser",
    ".collapser:hover, .collapser:focus",
    ".collopen",
    ".collopen:hover, .collopen:focus"
]; let ls2 = [
    ".lnk:hover, .lnk:focus",
    ".sel:hover, .sel:focus",
    ".sel",
    ".lnk"
];

function swapColor(colorName) {
    var color;
    var bg; 
    var name;
    [color, bg, name] = colors[colorName];
    var rules = document.styleSheets[2].cssRules;
    for(var rule of rules) {
        let txt = rule.selectorText;
        if(txt == undefined)
            continue
        if(txt == "h1, h2, h3, h4, h5, h6") {
            rule.style.color = color;
        } else if(txt == "a") {
            rule.style.color = color.replace(/0/gm, "a");
        } else if(txt == ".tab") {
            rule.style.borderTopColor = color;
        } else if(ls1.includes(txt)) {
            var tmp = color;
            if(txt.includes(".collapser")) {
                tmp = colors["grey"][0];
                rule.style.backgroundColor = tmp + "0";
            }  if(txt.includes("coll") && txt.includes(":hover")) {
                tmp = colors["white"][0];
                rule.style.backgroundColor = tmp + "0";
            } if(ls1.slice(2).includes(txt) || txt == ".line") {
                rule.style.borderBottomColor = tmp;
                rule.style.color = tmp;
            }
            rule.style.borderTopColor = tmp;
            rule.style.borderLeftColor = tmp;
            rule.style.borderRightColor = tmp;
        } else if(ls2.includes(txt)) {
            var tmp;
            if(txt.includes(".lnk:hover")) {
                tmp = colors[swapped[colorName]][0];
            } else if(txt == ".sel") {
                tmp = color;
            } else if(txt.includes(".sel:hover")) {
                tmp = colors[desel[colorName]][0];
            } else if(txt == ".lnk") {
                tmp = color + "8";
            } if(txt != ".lnk") {
                rule.style.backgroundColor = tmp + "4";
            }
            rule.style.borderTopColor = tmp;
            rule.style.borderLeftColor = tmp;
            rule.style.borderRightColor = tmp;
            rule.style.color = tmp.slice(0, 4);
        } else if(txt.includes(".btn")) {
            var tmp = color;
            if(!txt.includes("hover"))
                tmp = colors[btncol[colorName]][0];
            rule.style.borderTopColor = tmp;
            rule.style.borderLeftColor = tmp;
            rule.style.borderRightColor = tmp;
            rule.style.color = tmp;
            rule.style.backgroundColor = tmp + "4";
        } else if(rule.selectorText.includes("#jumper")) {
            var tmp = color;
            if(rule.selectorText.includes("hover"))
                tmp = colors[swapped[colorName]][0];
            rule.style.backgroundColor = "inherit";
            rule.style.borderTopColor = tmp;
            rule.style.borderLeftColor = tmp;
            rule.style.color = tmp;
        }
    }
    find("truelogo").src = `/prizm.dev/image/priz_${name}.png`;
}
loadPage();
var blocks = find("content").children;
var footer = `<div style="text-align: center;"><sub id="footer" style="text-align: center !important;">`;
footer += `<br><br>BY PRIZ WITH WINKY BRACKET FACE ;]<br><br></sub></div>`
addHtml(
    blocks.item(blocks.length - 1).id, 
    footer
);

for(var x = 0; x <= 2000; x += 200) {
    window.setTimeout(swapColor, x, theme);
}
