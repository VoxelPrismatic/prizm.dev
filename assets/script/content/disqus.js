function loadPage() {
    var thread = find("disqus_thread");
    var style = thread.style;
    thread.className = "sect";
    style.paddingTop = "0px";
    thread.onload = window.onresize
}
