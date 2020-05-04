var uni = {};

async function load_unicode_index() {
    if(uni.constructor.keys(uni).length)
        return
    console.log("Loading unicode index... this may take a while");
    var lines = await load("/prizm.dev/assets/text/unicode_index.txt", {list: true});
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
