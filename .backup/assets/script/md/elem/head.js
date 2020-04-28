function linkMe(elem) {
    elem.scrollIntoView({behavior: "smooth"});
    var id = elem.id;
    if(id[0] != "#") {
        id = "#" + id;
    }
    window.history.replaceState(window.history.state, document.title, id);
}

function toggleDrop(elem) {
    if(elem.classList.toggle("h-dropper-closed")) {
        elem.innerHTML = "[V]";
    } else {
        elem.innerHTML = "[\u039b]";
    }
    elem.parentElement.parentElement.classList.toggle("dropper-closed");
    resizeDicts(false, elem.parentElement.parentElement);
    elem.scrollIntoView({behavior: "smooth"});
}
