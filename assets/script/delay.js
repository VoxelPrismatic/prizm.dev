function delayFunction(func, start, end, interval, ...args) {
    var timeouts = [];
    for(var x = start; x < end; x += interval)
        timeouts.push(window.setTimeout(func, x, ...args));
    return timeouts
}

function delaySwapColor(theme, ...args) {
    try {
        return delayFunction(swapColor, 0, 3000, 100, theme, ...args);
    } catch(err) {
        return [];
    }
}

function delaySetTransitions() {
    try {
        return delayFunction(setTransitions, 1000, 4000, 100);
    } catch(err) {
        return [];
    }
}

function delayUpdateSpacer() {
    try {
        return delayFunction(updateSpacer, 0, 100, 25);
    } catch(err) {
        return [];
    }
}

function delayResizeDicts() {
    try {
        return delayFunction(resizeDicts, 0, 100, 25, false);
    } catch(err) {
        return [];
    }
}

function stopDelay(timeouts) {
    if(timeouts == undefined)
        return;
    for(var timeout of timeouts)
        window.clearTimeout(timeout);
}

function logFunc(func, ...args) {
    if(func == undefined)
        return
    try {
        func(...args);
    } catch(err) {
        console.error(err);
    }
}
