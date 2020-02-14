function swapColor(color) {
}

function load(filename, aio = false) {
    var f = new XMLHttpRequest()
    f.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resp = f.responseText;
            resp = resp.trim() + "\n"
            setHtml("file", resp)
        }
    }
    f.open("GET", filename, aio);
    f.send();
    if(aio)
        return new Promise(resolve => {
            setTimeout(() => {resolve(findHtml("file"));}, 100)
        });
    return findHtml("file");
}

function loadPage() {
    aboutTxt = load("/prizm.dev/text/about.txt");
    setHtml("info", mark_page(aboutTxt));
    linksTxt = load("/prizm.dev/text/links.txt");
    setHtml("links", mark_page(linksTxt));
}

window.setTimeout(loadPage, 500);


