/**
 * NOTICE --------
 * TI Does not endorse this content, and this isn't an emulator.
 * This file only creates pixel elements and prints them to the page.
 * All "emulators" are made by hand in TI-BASIC, then converted to JS
 * accordingly.
 */

var screen = [];

var pref = {
    "bg": WHITE;
    "frame": OFFBLUE;
}

var inGraph = false;

//Make Screen

for(var y of range(240)) {
    screen.push([]);
    for(var x of range(320)) {
        if(y <= 32) {
            screen[y].push(DARKGRAY);
        } else {
            screen[y].push(WHITE);
    }
}

function drawScreen() {
    for(var y of screen) {
        screen += "<div>";
        for(var x of y) {
            screen += `<span class="ti${x}"></span>`;
        }
        screen += "</div>";
    }
    
    setHtml("ti84ce", screen);
}

run();
