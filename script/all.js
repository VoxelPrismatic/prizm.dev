var colors = {
    "red": ["#f00", "#211", "red"],
    "orange": ["#f80", "#221511", "orange"],
    "yellow": ["#ff0", "#221", "yellow"],
    "green": ["#0f0", "#121", "green"],
    "cyan": ["#0ff", "#122", "blue"],
    "blue": ["#00f", "#112", "dark"],
    "pink": ["#f08", "#221115", "pink"],
    "grey": ["#aaa", "#111", "grey"],
    "white": ["#fff", "#222", "white"],
    "purple": ["#80f", "#151122", "purple"],
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

var ls1 = [
    ".line",
    ".sect",
    ".collapser",
    ".collapser:hover",
    ".collopen",
    ".collopen:hover",
];

var ls2 = [
    ".lnk:hover",
    ".sel:hover",
    ".sel",
    ".lnk"
];

function swapColor(colorName) {
    var color; var bg; var name;
    [color, bg, name] = colors[colorName];
    for(var rule of document.styleSheets[2].cssRules) {
        if(rule.selectorText == "h1, h2, h3, h4, h5, h6")
            rule.style.color = color;
        if(rule.selectorText == "a")
            rule.style.color = color.replace(/0/gm, "a");
        if(ls1.includes(rule.selectorText)) {
            var tmp = color;
            if(rule.selectorText == ".collapser" || rule.selectorText == ".collopen") {
                tmp = colors["grey"][0];
                rule.style.backgroundColor = tmp + "0";
            } 
            if(rule.selectorText == ".collapser:hover" || rule.selectorText == ".collopen:hover") {
                tmp = colors["white"][0];
                rule.style.backgroundColor = tmp + "1";
            }
            if(ls1.slice(2).includes(rule.selectorText) || rule.selectorText == ".line") {
                rule.style.borderBottomColor = tmp;
                rule.style.color = tmp;
            }
            rule.style.borderTopColor = tmp;
            rule.style.borderLeftColor = tmp;
            rule.style.borderRightColor = tmp;
        }
        if(rule.selectorText == ".tab") {
            rule.style.borderTopColor = color;
        }
        if(ls2.includes(rule.selectorText)) {
            var tmp;
            if(rule.selectorText == ".lnk:hover")
                tmp = colors[swapped[colorName]][0];
            if(rule.selectorText == ".sel")
                tmp = color;
            if(rule.selectorText == ".sel:hover")
                tmp = colors[desel[colorName]][0];
            if(rule.selectorText == ".lnk")
                tmp = color + "8";
            rule.style.borderTopColor = tmp;
            rule.style.borderLeftColor = tmp;
            rule.style.borderRightColor = tmp;
            if(rule.selectorText != ".lnk")
                rule.style.backgroundColor = tmp + "4";
            rule.style.color = tmp.slice(0, 4);
        }
    }
    find("truelogo").src = `/prizm.dev/image/priz_${name}.png`;
}

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
