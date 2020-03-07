function randInt(mn, mx) {
    return Math.floor(Math.random() * Math.abs(mx - mn)) + Math.min(mn, mx);
}

function rand() {
    return Math.random();
}

function max(...args) {
    return Math.max(...args);
}

function min(...args) {
    return Math.min(...args);
}

function round(num, dig = null) {
    if(dig == null)
        return num;
    return Math.round(num * (10 ** dig)) / (10 ** dig);
}

function fPart(n) {
    return n - round(n, 0);
}

function iPart(n) {
    return round(n, 0);
}

function abs(n) {
    return Math.abs(n);
}

function remainder(n, d) {
    return n % d;
}
