async function loadPage() {
    var thread = find("disqus_thread");
    thread.onload = delayUpdateSpacer;
    thread.onresize = delayUpdateSpacer;
}
