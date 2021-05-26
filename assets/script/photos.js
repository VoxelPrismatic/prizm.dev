document.head.insertAdjacentHTML("beforeend", `<style type="text/css">
img[src*="-smol.webp"] {
    animation: cubic-bezier(0.5,0,0.25,1) img-load 2.5s alternate infinite;
    width: 100%;
}
@keyframes img-load {
    0% {
        opacity: 50%;
        filter: blur(0px) saturate(0);
    } 100% {
        opacity: 75%;
        filter: blur(5px) saturate(1);
    }
}
img.loaded.clicked {
    position: relative;
    box-shadow: 0px 0px 30px 20px #110008;
}
</style>`);

var pic_src = []
function next_pic() {
    var src = pic_src[0];
    if(!src)
        return
    console.log(src)
    pic_src = pic_src.slice(1);
    var img = $(`img[data-src="${src}"]`)
    img.onload = next_pic;
    img.src = src + "-med.webp";
    img.classList.add("loaded");
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

function img_zoom() {
    if(!this.className.includes("loaded"))
        return
    if(this.classList.toggle("clicked")) {
        for(var i of $all("img.clicked"))
            if(i != this)
                i.classList.remove("clicked")
        var n = 1, iW = innerWidth * 0.9, iH = innerHeight * 0.9
        while((this.width * n < iW) && (this.height * n < iH))
            n += 0.1
        this.style.transform = "scale(" + n + ")";
        if(this.src.includes("-med.webp"))
            this.src = this.src.slice(0, -9);
    } else {
        img.style.transform = "";
    }
}

function get_pic() {
    for(var img of $all("img[data-src]")) {
        pic_src.push(img.getAttribute("data-src"));
        img.onclick = img_zoom;
    }
}
get_pic();
smol_pic();
