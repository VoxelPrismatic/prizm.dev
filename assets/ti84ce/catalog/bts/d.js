function doOp(obj, fn, ...args) {
    var mat = [];
    var ls = [];
    try {
        for(var y of obj) {
            mat.push([]);
            for(var x of y) {
                mat[mat.length - 1].push(fn(x, ...args));
            }
        }
    } catch(err) {
        //Not 2D
        try {
            for(var x of obj) {
                ls.push(fn(x, ...args));
            }
        } catch(err) {
            //Not 1D
            return fn(obj, ...args);
        }
    }
    return obj;
}
