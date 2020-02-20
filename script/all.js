var colors = {
    "red": ["#f00", "#211", "red"],
    "orange": ["#f80", "#221511", "orange"],
    "yellow": ["#ff0", "#221", "yellow"],
    "green": ["#0f0", "#121", "green"],
    "cyan": ["#0ff", "#122", "blue"],
    "blue": ["#00f", "#112", "dark"],
    "pink": ["#f08", "#221115", "pink"],
    "grey": ["#aaa", "111", "grey"],
    "white": ["#fff", "222", "white"],
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
    }
    find("truelogo").src = `image/priz_${name}.png`;
}

function load(filename, aio = false) {
    var f = new XMLHttpRequest()
    f.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resp = f.responseText;
            resp = resp.trim() + "\n"
            setHtml("file", resp)
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
