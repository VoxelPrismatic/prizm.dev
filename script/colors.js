var colors = {
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
    "blurple": ["#08f", "#111522", "blurple"],
}

var swapped = {
    "red": "green",
    "orange": "blue",
    "yellow": "cyan",
    "green": "red",
    "cyan": "yellow",
    "pink": "blurple",
    "grey": "white",
    "white": "grey",
    "purple": "pink",
    "blurple": "purple"
}

var desel = {
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
}

var btncol = {
    "red": "orange",
    "orange": "yellow",
    "yellow": "orange",
    "green": "yellow",
    "cyan": "blue",
    "blue": "blurple",
    "pink": "red",
    "white": "grey",
    "grey": "white",
    "purple": "blue"
}

var ls1 = [
    ".line",
    ".sect",
    ".collapser",
    ".collapser:hover, .collapser:focus",
    ".collopen",
    ".collopen:hover, .collopen:focus",
];

var ls2 = [
    ".lnk:hover, .lnk:focus",
    ".sel:hover, .sel:focus",
    ".sel",
    ".lnk"
];

function swapColor(colorName) {
    var color; var bg; var name;
    [color, bg, name] = colors[colorName];
    for(var rule of document.styleSheets[2].cssRules) {
        var txt = rule.selectorText;
        if(txt == "h1, h2, h3, h4, h5, h6")
            rule.style.color = color;
        else if(rule.selectorText == "a")
            rule.style.color = color.replace(/0/gm, "a");
        else if(ls1.includes(txt)) {
            var tmp = color;
            if(txt.includes(".collapser")) {
                tmp = colors["grey"][0];
                rule.style.backgroundColor = tmp + "0";
            } 
            if(txt.includes("coll") && txt.includes(":hover")) {
                tmp = colors["white"][0];
                rule.style.backgroundColor = tmp + "1";
            }
            if(ls1.slice(2).includes(txt) || txt == ".line") {
                rule.style.borderBottomColor = tmp;
                rule.style.color = tmp;
            }
            rule.style.borderTopColor = tmp;
            rule.style.borderLeftColor = tmp;
            rule.style.borderRightColor = tmp;
        }
        else if(txt == ".tab") {
            rule.style.borderTopColor = color;
        }
        else if(ls2.includes(txt)) {
            var tmp;
            if(txt.includes(".lnk:hover"))
                tmp = colors[swapped[colorName]][0];
            if(txt == ".sel")
                tmp = color;
            if(txt == ".sel:hover")
                tmp = colors[desel[colorName]][0];
            if(txt == ".lnk")
                tmp = color + "8";
            rule.style.borderTopColor = tmp;
            rule.style.borderLeftColor = tmp;
            rule.style.borderRightColor = tmp;
            if(txt != ".lnk")
                rule.style.backgroundColor = tmp + "4";
            rule.style.color = tmp.slice(0, 4);
        }
        else if(txt == ".btn") {
            var tmp = colors[btncol[colorName]][0];
            console.log("hi");
            rule.style.borderTopColor = tmp;
            rule.style.borderLeftColor = tmp;
            rule.style.borderRightColor = tmp;
            rule.style.color = tmp;
            rule.style.backgroundColor = tmp + "4";
        }
        else if(txt == ".btn:hover, .btn:focus") {
            rule.style.borderTopColor = color;
            rule.style.borderLeftColor = color;
            rule.style.borderRightColor = color;
            rule.style.color = color;
            rule.style.backgroundColor = color + "4";
        }
    }
    find("truelogo").src = `/prizm.dev/image/priz_${name}.png`;
}

loadPage();
var blocks = find("content").children;
addHtml(
    blocks.item(blocks.length - 1).id, 
    `<sub id="footer" style="text-align: center !important;"><br><br>BY PRIZ WITH WINKY BRACKET FACE ;]<br><br></sub>`
);

for(var x = 0; x <= 1000; x += 100) {
    window.setTimeout(swapColor, x, theme);
}
