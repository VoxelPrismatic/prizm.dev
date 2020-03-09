function and(...n) {
    for(var x = 0; x < n.length - 1; x += 1) {
        if(!(n[x] && n[x + 1])) {
            return false;
        }
    }
    return true;
}

function abs(n) {
    return doOp(n, _abs);
}
