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
    "pink": "purple",
    "purple": "red",
    "blurple": "orange",
    "white": "white",
    "grey": "grey",
    "blue": "yellow"
}

function swapColor(colorName) {
    var color; var bg; var name;
    [color, bg, name] = colors[colorName];
    for(var rule of document.styleSheets[2].cssRules) {
        if(rule.selectorText == "h1, h2, h3, h4, h5, h6")
            rule.style.color = color;
        if(rule.selectorText == "a")
            rule.style.color = color.replace(/0/gm, "a");
        if(rule.selectorText == ".line" || rule.selectorText == ".sect") {
            rule.style.borderTopColor = color;
            rule.style.borderLeftColor = color;
            rule.style.borderRightColor = color;
            if(rule.selectorText == ".line")
                rule.style.borderBottomColor = color;
        }
        if(rule.selectorText == ".lnk")
            rule.style.borderTopColor = color;
        if(rule.selectorText == ".lnk:hover") {
            var tmp = colors[swapped[colorName]][0];
            rule.style.borderTopColor = tmp;
            rule.style.borderLeftColor = tmp;
            rule.style.borderRightColor = tmp;
            rule.style.backgroundColor = tmp + "4";
        }
        if(rule.selectorText == ".sel") {
            rule.style.borderTopColor = color;
            rule.style.borderLeftColor = color;
            rule.style.borderRightColor = color;
            rule.style.backgroundColor = color + "4";
        }
        if(rule.selectorText == ".sel:hover") {
            var tmp = colors[desel[colorName]][0];
            rule.style.borderTopColor = tmp;
            rule.style.borderLeftColor = tmp;
            rule.style.borderRightColor = tmp;
            rule.style.backgroundColor = tmp + "4";
        }
    }
    find("truelogo").src = `image/priz_${name}.png`;
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
