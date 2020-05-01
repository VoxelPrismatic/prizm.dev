function delayFunction(func, start, end, interval, ...args) {
    var timeouts = [];
    for(var x = start; x < end; x += interval)
        timeouts.push(window.setTimeout(func, x, ...args));
    return timeouts
}

function delaySwapColor(theme, ...args) {
    return delayFunction(swapColor, 0, 3000, 100, theme, ...args);
}

function delaySetTransitions() {
    return delayFunction(setTransitions, 1000, 4000, 100);
}

function delayUpdateSpacer() {
    return delayFunction(updateSpacer, 0, 100, 25);
}

function delayResizeDicts() {
    return delayFunction(resizeDicts, 0, 100, 25, false);
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
