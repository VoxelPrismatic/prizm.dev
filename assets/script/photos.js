document.head.insertAdjacentHTML("beforeend", `<style type="text/css">
img[src*="-smol.webp"] {
    animation: cubic-bezier(0.5,0,0.25,1) img-load 2.5s alternate infinite;
}
img[data-src] {
    width: 100%;
    z-index: 1;
    position: relative;
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
    box-shadow: 0px 0px 100vw 20vw #110008;
    z-index: 2;
}
img.loaded:hover {
    cursor: pointer;
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

function no_zoom(img) {
    for(var i of $all("img.clicked")) {
        if(i != img) {
            i.classList.remove("clicked")
            i.style.transform = ""
        }
    }
}

function img_zoom(img) {
    if(!img.className.includes("loaded"))
        return
    if(img.classList.toggle("clicked")) {
        no_zoom(img)
        n = img.getAttribute("data-scale")
        if(!n) {
            var n = 1, iW = innerWidth * 0.9, iH = innerHeight * 0.9
            var w = img.width, h = img.height
            if(h > iH)
                n = 0
            while((w * n < iW) && (h * n < iH))
                n += 1
            n -= 1
            while((w * n < iW) && (h * n < iH))
                n += 0.5
            n -= 0.5
            while((w * n < iW) && (h * n < iH))
                n += 0.1
            img.setAttribute("data-scale", n);
        }
        img.style.transform = "scale(" + n + ")";
        if(img.src.includes("-med.webp"))
            img.src = img.src.slice(0, -9);
    } else {
        img.style.transform = "";
    }
}

function get_pic() {
    for(var img of $all("img[data-src]")) {
        pic_src.push(img.getAttribute("data-src"));
        img.onclick = (evt) => img_zoom(evt.target);
    }
}
get_pic();
smol_pic();
window.addEventListener("click", (evt) => {
    if(evt.target.nodeName != "IMG")
        no_zoom()
})
window.addEventListener("resize", () => {
    for(var i of $all("img[data-src]"))
        i.setAttribute("data-scale", "");
})
