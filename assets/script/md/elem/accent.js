function style_accent() {
    for(var acc of find(".accent")) {
        var char = acc.previousElementSibling;
        char.style.display = "inline-block";
        acc.style.position = "relative";
        var ok_accents = [
            "\u0300",
            "\u0301",
            "\u0302",
            "\u030c",
            "\u0303",
            "\u0322",
            "\u0321",
            "\u0327",
            "\u0309"
        ];
        if(!ok_accents.includes(acc.innerHTML)) {
            acc.style.left = (-char.clientWidth / 2) + "px";
        } else {
            acc.style.left = "";
        }
        if("ABCDEFGHIJKLMNOPQRSTUVWXYZbdfhklt".includes(char.innerHTML)) {
            acc.style.top = "-4px";
        }
    }
}
