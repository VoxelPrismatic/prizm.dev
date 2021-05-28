document.head.insertAdjacentHTML("beforeend", `<style type="text/css">
img.blur {
    animation: cubic-bezier(0.5,0,0.25,1) img-load 2.5s alternate infinite;
}
img[src*="-smol.webp"] {
    filter: blur(0px) saturate(0);
}
img[data-src] {
    z-index: 1;
    position: relative;
    width: 100%;
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

function next_pic() {
    src = pic_src[0];
    if(!src)
        return
    console.log(src + "-med.webp")
    pic_src = pic_src.slice(1);
    var img = $(`img[data-src="${src}"]`)
    img.onload = (evt) => {
        next_pic();
        evt.target.classList.remove("blur");
        evt.target.classList.add("loaded");
    };
    img.classList.add("blur");
    img.src = src + "-med.webp";
    last_src = src + "-med.webp";
}

function smol_pic() {
    src = pic_src[0];
    if(!src) {
        get_pic()
        next_pic()
        return
    }
    console.log(src + "-smol.webp")
    pic_src = pic_src.slice(1);
    var img = $(`img[data-src="${src}"]`)
    img.onload = () => { smol_pic() };
    img.src = src + "-smol.webp";
    last_src = src + "-smol.webp";
}

function no_zoom(img) {
    for(var i of $$("img.clicked")) {
        if(i != img) {
            i.classList.remove("clicked")
            i.style.transform = ""
            if(!img.src.includes("-med.webp"))
                img.src += "-med.webp"
            i.classList.remove("blur")
        }
    }
}

function img_zoom(img) {
    if(!img.className.includes("loaded"))
        return
    if(img.classList.toggle("clicked")) {
        if(!img.style.getPropertyValue("--top")) {
            img.onload = (evt) => evt.target.classList.remove("blur");
            img.classList.add("blur");
        }
        if(img.src.includes("-med.webp"))
            img.src = img.src.slice(0, -9);
        no_zoom(img)
        img.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        })
        img.style.setProperty("--top", - ($("nav").clientHeight + innerWidth / 100) + "px");
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
    } else {
        img.style.transform = "";
        if(!img.src.includes("-med.webp"))
            img.src += "-med.webp" // Save ram
        img.classList.remove("blur");
    }
}

function get_pic() {
    for(var img of $$("img[data-src]")) {
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
    for(var i of $$("img[data-src]"))
        i.setAttribute("data-scale", "");
})
window.addEventListener("scroll", med_pic);
