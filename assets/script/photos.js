var pic_src = []
function next_pic() {
    var src = pic_src[0];
    if(!src)
        return
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
snol_pic();
