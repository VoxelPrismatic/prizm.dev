var pic_src = []
function next_pic() {
    var src = pic_src[0];
    pic_src = pic_src.slice(1);
    $(`img[data-src="${src}"]`).src = src;
}
for(var img of $("img[data-src]")) {
    img.onload = next_pic;
    pic_src.push(img.getAttribute("data-src"));
}
next_pic();
