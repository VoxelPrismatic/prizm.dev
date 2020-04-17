function delayFunction(func, start, end, interval, ...args) {
    for(var x = start; x < end; x += interval) {
        window.setTimeout(func, x, ...args);
    }
}

function delaySwapColor(theme, ...args) {
    delayFunction(swapColor, 0, 3000, 100, theme, ...args);
}

function delaySetTransitions() {
    delayFunction(setTransitions, 1000, 4000, 100);
}

function delayUpdateSpacer() {
    delayFunction(updateSpacer, 0, 100, 25);
}


function delayResizeDicts() {
    delayFunction(resizeDicts, 0, 100, 25);
}
