/**
 * NOTICE --------
 * TI Does not endorse this content, and this isn't an emulator.
 * This file only creates pixel elements and prints them to the page.
 * All "emulators" are made by hand in TI-BASIC, then converted to JS
 * accordingly.
 */

var graphScreen = [];
var fullScreen = [];

var inGraph = false;

function randInt(mn, mx) {
    return Math.floor(Math.random() * Math.abs(mx - mn)) + Math.min(mn, mx);
}

function range(mn = 0, mx = null, step = 1) {
    var ls = [];
    if(mx == null) {
        mx = mn;
        mn = 0;
    }
    for(var x = mn; x < mx; x += step)
        ls.push(x);
    return ls;
}

//Colors

let BLUE =     10;
let RED =      11; 
let BLACK =    12;
let MAGENTA =  13;
let GREEN =    14;
let ORANGE =   15;
let BROWN =    16;
let NAVY =     17;
let LTBLUE =   18;
let YELLOW =   19;
let WHITE =    20;
let LTGRAY =   21;
let MEDGRAY =  22;
let GRAY =     23;
let DARKGRAY = 24;

let OFFGRAY =   1;
let MINT =      2;
let OFFBLUE =   3;
let OFFWHITE =  4;

//Make Screen

for(var y of range(165)) {
    graphScreen.push([]);
    for(var x of range(265)) {
        graphScreen[graphScreen.length - 1].push(BLACK);
    }
}

 //emulate();

function drawScreen() {
    var borderColor = randInt(OFFGRAY, OFFWHITE);
    for(var y of range(240)) {
        fullScreen.push([]);
        for(var x of range(320)) {
            if(y <= 30)
                fullScreen[fullScreen.length - 1].push(DARKGRAY);
            else if(inGraph)
                fullScreen[fullScreen.length - 1].push(borderColor);
            else
                fullScreen[fullScreen.length - 1].push(WHITE);
        }
    }
    
    if(inGraph) {
        for(var y of range(165))
            for(var x of range(265))
                fullScreen[y + 32][x + 63] = graphScreen[y][x];
    }

    var screen = "";

    for(var y of fullScreen) {
        screen += "<div>";
        for(var x of y) {
            screen += `<div class="ti${x}"></div>`;
        }
        screen += "</div>";
    }
    
    setHtml("ti84ce", screen);
}
