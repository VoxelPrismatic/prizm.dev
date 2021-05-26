document.head.insertAdjacentHTML("beforeend", `<style type="text/css">
img[src*="-smol.webp"] {
    animation: linear img-load 5s infinite;
}
@keyframes img-load {
    0% {
        opacity: 50%;
        filter: blur(0px);
    } 25% {
        opacity: 100%;
        filter: blur(2.5px);
    } 50% {
        opacity: 50%;
        filter: blur(5px);
    } 75% {
        opacity: 100%;
        filter: blur(2.5px);
    } 100% {
        opacity: 50%;
        filter: blur(0px);
    }
}`);

var pic_src = []
function next_pic() {
    var src = pic_src[0];
    if(!src)
        return
    console.log(src)
    pic_src = pic_src.slice(1);
    var img = $(`img[data-src="${src}"]`)
    img.onload = next_pic;
    img.src = src;
}
function smol_pic() {
    var src = pic_src[0];
    if(!src) {
        get_pic();
        next_pic();
        return
    }
    console.log(src + "-smol.webp")
    pic_src = pic_src.slice(1);
    var img = $(`img[data-src="${src}"]`)
    img.onload = smol_pic;
    img.src = src + "-smol.webp";
}
function get_pic() {
    for(var img of $all("img[data-src]"))
        pic_src.push(img.getAttribute("data-src"));
}
get_pic();
smol_pic();
