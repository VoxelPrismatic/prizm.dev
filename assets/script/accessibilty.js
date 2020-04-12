function a11y() {
    for(var header of ["1", "2", "3", "4", "5", "6"]) {
        for(var elem of find(">h" + header)) {
            elem.tabIndex = "0";
            elem.onkeydown = elem.onclick;
        }
    }

    for(var elem of find(">span")) {
        if(elem.className.includes("hide")) {
            elem.tabIndex = "0";
            elem.onkeydown = elem.onclick;
        } else {
            elem.tabIndex = "-1";
        }
    }
}
