document.head.insertAdjacentHTML("beforeend", `<style type="text/css">
img[src*="-smol.webp"], img.blur {
    animation: cubic-bezier(0.5,0,0.25,1) img-load 2.5s alternate infinite;
}
img[data-src] {
    z-index: 1;
    position: relative;
}
@keyframes img-load {
    0% {
        filter: blur(0px) saturate(0);
    } 100% {
        filter: blur(2.5px) saturate(1);
    }
}
img.loaded.clicked {
    box-shadow: 0px 0px 768px 240px #110008;
    z-index: 20 !important;
    top: var(--top);
}
img.loaded:hover, img.loaded:active, img.loaded:focus {
    cursor: pointer;
    z-index: 10;
}
</style>`);

var pic_src = []
var last_src = ""
function next_pic() {
    var src = pic_src[0];
    $(`img[src="${last_src}"]`).classList.remove("blur");
    $(`img[src="${last_src}"]`).classList.add("loaded");
    if(!src)
        return
    console.log(src)
    pic_src = pic_src.slice(1);
    var img = $(`img[data-src="${src}"]`)
    img.onload = next_pic;
    img.src = src + "-med.webp";
    last_src = img.src
    img.classList.add("blur");
}
function smol_pic() {
    var src = pic_src[0];
    if(last_src) {
        $(`img[src="${last_src}"]`).classList.remove("blur");
        $(`img[src="${last_src}"]`).classList.add("loaded");
    }
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
    last_src = img.src
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
        img.classList.add("blur");
        img.onload = (evt) => evt.target.classList.remove("blur");
        img.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        })
        img.style.setProperty("--top", $("nav").clientHeight + innerWidth / 100);
        n = img.getAttribute("data-scale")
        if(!n) {
            var n = 1, iW = innerWidth * 0.9, iH = innerHeight * 0.9
            var w = img.width, h = img.height
            if(h > iH)
                n = 0
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
        img.src += "-med.webp" // Save ram
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
