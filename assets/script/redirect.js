window.setTimeout(
  function() {
    var st = `<h1>#] REDIRECT ;]</h1><div>Hey mate, I'm redirecting you to <a href="${url}">`
    try {
      st += text;
    } catch(err) {
      st += url;
    } 
    st += "</a>, try allowing redirects... especially if you are using Firefox ;]</div>";

    document.body.innerHTML = st;
  }, 100
);
var head = document.getElementsByTagName("head")[0];
var meta = document.createElement("meta");
meta.httpEquiv = "refresh";
meta.content = "0.5";
meta.url = url;
head.appendChild(meta);
