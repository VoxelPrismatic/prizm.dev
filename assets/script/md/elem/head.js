function linkMe(elem) {
    elem.scrollIntoView({behavior: "smooth"});
    var id = elem.id;
    if(id[0] != "#") {
        id = "#" + id;
    }
    if(elem.className.includes("h-dropper")) {
        elem.classList.toggle("h-dropper-closed");
        elem.parentElement.classList.toggle("dropper-closed");
        resizeDicts(false, elem.parentElement);
    }
    window.history.replaceState(window.history.state, document.title, id);
}
