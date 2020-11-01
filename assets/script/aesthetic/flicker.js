function flickery_element(h) {
    if (h == $("h1#head") && h.clientHeight > 54) {
        console.log(h.clientHeight);
        console.log(h);
        h.style.setProperty("top", (-h.clientHeight/2 - 54) + "px", "important");
    }
    delayFunction(function(h){h.style.transition = "none";}, 1000, 1001, 1000, h);
    var shown = true;
    var halfOpacity = compSty(h).color;
    halfOpacity = "rgba(" + halfOpacity.split("(")[1].slice(0, -1) + ", 0.7)";
    for(var x = 1500; x <= 3000; x += Math.floor(Math.random() * 200) + 25) {
        shown = !shown;
        if(!shown)
            delayFunction(function(h){h.style.color = halfOpacity;}, x, x + 1, x, h);
        else
            delayFunction(function(h){h.style.color = "";}, x, x + 1, x, h);
    }
    delayFunction(function(h){h.style.transition = "";}, x - 25, x, 5, h);
    delayFunction(function(h){h.style.color = halfOpacity;}, x - 50, x - 49, x, h);
    delayFunction(function(h){h.style.color = "";}, x, x + 1, x, h);
}

function flickery() {
    flickery_element(this);
}

//window.setInterval(function(){flickery_element(find("head"));}, 15000);
