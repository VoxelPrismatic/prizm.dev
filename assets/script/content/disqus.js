function loadPage() {
    var thread = find("disqus_thread");
    var style = thread.style;
    thread.className = "sect";
    style.paddingTop = "0px";
    thread.onload = delayUpdateSpacer;
    thread.onresize = delayUpdateSpacer;
    style.overflow = "";
    style.height = "";
}
