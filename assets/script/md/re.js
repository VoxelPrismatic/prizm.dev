var line_regex = [];

function set_regex() {
    line_regex = [
        [/\\([^uUNx])/gm, function(m, p) {return "\\u{" + p.charCodeAt(0).toString(16) + "}";}],

        //Pre-Escape
        [/^ /gm, "\u200b \u200b"],
        [/\&gt;/gm, ">"],
        [/\&lt;/gm, "<"],
        [/\&amp;/gm, "&"],

        //Links
        [
            /e\[(.+?)\]<(.+?)>/gm,
            function(m, p1, p2) {
                return `<a href="mailto:${esc(p2)}">${esc(mark(p1))}</a>`;
            }
        ], [
            /p\[(.+?)\]<(.+?)>/gm,
            function(m, p1, p2) {
                return `<a href="tel:${esc(p2)}">${esc(mark(p1))}</a>`;
            }
        ], [
            /\%\[(.+?)\]<(.+?)>/gm,
            function(m, p2, p1) {
                p1 = p1.toLowerCase();
                var st = "<span class='";
                if(p1.includes("h")) {
                    st += "flip-h ";
                }
                if(p1.includes("v")) {
                    st += "flip-v ";
                }
                var st = st.slice(0, -1) + "'>" + p2 + "</span>";
                return st;
            }
        ], [
            /\?\[(.+?)\]<(.+?)>/gm,
            function(m, p1, p2) {
                return `<span title="${esc(p2)}" class="def">${esc(mark(p1))}</span>`;
            }
        ], [
            /\@\[(.+?)\]<(.+?)>\((.*)\)/gm,
            function(m, p1, p2, p3) {
                return `<img alt="${esc(mark(p1).replace(/"/gm, "'"))}" width="${p3}" src="${esc(p2)}">`;
            }
        ], [
            /\@\[(.+?)\]<(.+?)>/gm,
            function(m, p1, p2) {
                return `<img alt="${esc(mark(p1).replace(/"/gm, "'"))}" src="${esc(p2)}">`;
            }
        ], [
            /\+\[\[(.+?)\]\]\<(.+?)\>/gm,
            function(m, p1, p2) {
                return `<a href="${esc(p2)}" target='\\x5fblank'><span class='btn'>${esc(mark(p1))}</span></a>`;
            }
        ], [
            /\+\[(.+?)\]\<(.+?)\>/gm,
            function(m, p1, p2) {
                return `<a href="${esc(p2)}" target='\\x5fblank'>${esc(mark(p1))}</a>`;
            }
        ], [
            /\[\[(.+?)\]\]\<(.+?)\>/gm,
            function(m, p1, p2) {
                return `<a href="${esc(p2)}"><span class='btn'>${esc(mark(p1))}</span></a>`;
            }
        ], [
            /\[(.+?)\]\<(.+?)\>/gm,
            function(m, p1, p2) {
                return `<a href="${esc(p2)}">${esc(mark(p1))}</a>`;
            }
        ], [
            /e<<(.+?)>>/gm,
            function(m, p1) {
                return `<a href="mailto:${esc(p1)}>${esc(p1)}</a>`;
            }
        ], [
            /p<<(.+?)>>/gm,
            function(m, p1) {
                return `<a href="tel:${esc(p1)}>${esc(p1)}</a>`;
            }
        ], [
            /<<(.+?)>>/gm,
            function(m, p1) {
                return `<a href="${esc(p1)}>${esc(p1)}</a>`;
            }
        ],

        //Unicode Escape
        [/^\\x([A-Fa-f0-9]{2})/gm, "\\u{$1}"],
        [/^\\U([A-Fa-f0-9]{8})/gm, "\\u{$1}"],
        [/^\\u([A-Fa-f0-9]{4})/gm, "\\u{$1}"],
        [/^\\N\{(.+?)\}/gm, function(m, p) {return "\\u{"+unimap(p.toUpperCase())+"}";}],
        [/([^\\])\\x([A-Fa-f0-9]{2})/gm, "$1\\u{$2}"],
        [/([^\\])\\U([A-Fa-f0-9]{8})/gm, "$1\\u{$2}"],
        [/([^\\])\\u([A-Fa-f0-9]{4})/gm, "$1\\u{$2}"],
        [/([^\\])\\N\{(.+?)\}/gm, function(m, a, p) {return a+"\\u{"+unimap(p.toUpperCase())+"}";}],
        [/\\([^u])/gm, function(m, p1) {return `\\u{${p1.charCodeAt(0).toString(16)}}`;}],

        //Headers
        [/^\#{1,6}\] +(.+)$/gm, mk_head],

        //Main MD
        [/^\#(.+?)\#/gm, "<b>$1</b>"],
        [/^\*(.+?)\*/gm, "<i>$1</i>"],
        [/^\_(.+?)\_/gm, "<u>$1</u>"],
        [/^\~(.+?)\~/gm, "<s>$1</s>"],
        [/^\`(.+?)\`/gm, function(m, p1) {return `<span class="code">${esc(p1)}</span>`}],
        [/^\>\^(.+?)\^\</gm, "<sup>$1</sup>"],
        [/^\>v(.+?)v\</gm, "<sub>$1</sub>"],
        [/^\>\!(.+?)\!\</gm, `<span class="hide" onclick="this.classList.toggle('unhide');">$1</span>`],
        [/([^\\])\#(.+?)\#/gm, "$1<b>$2</b>"],
        [/([^\\])\*(.+?)\*/gm, "$1<i>$2</i>"],
        [/([^\\])\_(.+?)\_/gm, "$1<u>$2</u>"],
        [/([^\\])\~(.+?)\~/gm, "$1<s>$2</s>"],
        [/([^\\])\`(.+?)\`/gm, function(m, p1, p2) {return `${p1}<span class="code">${esc(p2)}</span>`}],
        [/([^\\])\>\^(.+?)\^\</gm, "$1<sup>$2</sup>"],
        [/([^\\])\>v(.+?)v\</gm, "$1<sub>$2</sub>"],
        [/([^\\])\>\!(.+?)\!\</gm, `$1<span class="hide" onclick="this.classList.toggle('unhide');">$2</span>`],

        //Alignment
        [
            /(.*)\:\^\:(.*)/gm,
            "<div style='height: 24px;'>" +
            "<div style='float: left;'>$1</div>" +
            "<div class='dict'></div>" +
            "<div style='float: right;'>$2</div>" +
            "</div></br>"
        ],
        [/^\:\<\:(.+)/gm, "<div style='text-align: left;'>$1</div>"],
        [/^\:\>\:(.+)/gm, "<div style='text-align: right;'>$1</div>"],
        [/^\:v\:(.+)/gm, "<div style='text-align: center;'>$1</div>"],
        [/^\:=\:(.+)/gm, "<div style='text-align: justified;'>$1</div>"],

        //Others
        [/\{\{(\w+?)\}\}(.+?) /gm, "<span class='$1'>$2 </span>"],
        [/^--([\w\d_.-]+)--$/gm, "<div id='$1'></div></br>"],
        [/\\ *$/gm, "</br>"], //New line escape
        [/^-~-$/gm, "<div class='line'></div></br>"],
        [/(<u>_<\/u>|___)/gm, "<div>"],
        [/===/gm, "</div>"],
        [
            /(.)\$(.+?)\;/gm,
            function(m, p2, p1) {
                var accent = accents[p1] || "";
                if(p2 == "i")
                    p2 = "ı";
                if(p2 == "j")
                    p2 = "ȷ";
                return `<span>${p2}</span><span class="accent">${p1}</span>`;
            }
        ],
            
        [
            /\\u\{([a-fA-F0-9]+)\}/gm, 
            function(m, p1) {
                var st = String.fromCharCode("0x" + p1);
                if(st == "<")
                    return "&lt;"
                if(st == ">")
                    return "&gt;"
                return st;
            }
        ],
    ];
}
