var pic_src = []
function next_pic() {
    var src = pic_src[0];
    if(!src)
        return
    console.log(src)
    pic_src = pic_src.slice(1);
    $(`img[data-src="${src}"]`).src = src;
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
    $(`img[data-src="${src}"]`).src = src + "-smol.webp";
}
function get_pic() {
    for(var img of $all("img[data-src]")) {
        img.onload = next_pic;
        pic_src.push(img.getAttribute("data-src"));
    }
}
get_pic();
smol_pic();
