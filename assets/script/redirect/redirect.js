function didntRedirect() {
  var st = `<h1>#] REDIRECT ;]</h1><div>Hey mate, I'm redirecting you to <a href="${url}">`
  try {
    st += text;
  } catch(err) {
    st += url;
  } 
  st += "</a>, try allowing redirects... especially if you are using Firefox ;]</div>";
  document.body.innerHTML = st;
}
var url = "https://voxelprismatic.github.io/prizm.dev";
var text = "home";
if(document.URL.includes("?url=")) {
  url = decodeUriCompontent(document.URL.split("?url=")[1]);
  text = url;
} else if(document.URL.includes("?page=")) {
  var tmp = document.URL.split("?page=")[1];
  if(urls[tmp]) {
    url = urls[tmp];
    text = tmp;
  } else {
    url += "/418";
    text = "http/418";
  }
} else if(document.URL.includes("?link=")) {
  if(shorts[tmp]) {
    url = shorts[tmp];
    text = tmp;
  } else {
    url += "/418";
    text = "http/418";
  }
}
window.location = url;
