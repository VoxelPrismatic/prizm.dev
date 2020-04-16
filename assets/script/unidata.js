function unidata() {
    console.log("Loading unicode index... this may take a while");
    var lines = read("/prizmatic.docs/script/uni.txt").split("\n");
    var uni = {}
    for(var line of lines) {
        if(line.trim() == "")
            continue;
        uni[line.split("\t")[1].trim().toUpperCase()] = line.split("\t")[0].trim().toUpperCase();
    }
    console.log("Finished loading unicode index");
}
