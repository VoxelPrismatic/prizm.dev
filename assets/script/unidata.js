var uni = {};

function load_unicode_index() {
    console.log("Loading unicode index... this may take a while");
    var lines = load("/prizm.dev/assets/text/unicode_index.txt").split("\n");
    for(var line of lines) {
        if(line.trim() == "")
            continue;
        uni[line.split("\t")[1].trim().toUpperCase()] = line.split("\t")[0].trim().toUpperCase();
    }
    console.log("Finished loading unicode index");
}

function unimap(st) {
    return uni[st.toUpperCase()];
}
