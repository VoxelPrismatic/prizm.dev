function border_colors(style, color, borders) {
    borders = borders.toLowerCase();
    if(borders.includes("l")) {
        style.borderLeftColor = color;
    } if(borders.includes("r")) {
        style.borderRightColor = color;
    } if(borders.includes("t")) {
        style.borderTopColor = color;
    } if(borders.includes("b")) {
        style.borderBottomColor = color;
    }
}

function link_color(color) {
    return color.replace(/[a]/gm, "c").replace(/[8]/gm, "a").replace(/[04]/gm, "8");
}

function hover_color(color) {
    return color.replace(/[a]/gm, "e").replace(/[8]/gm, "c").replace(/[04]/gm, "a");
}

function tag_h1_h2_h3_h4_h5_h6(style, color) {
    style.color = color;
}

function id_logo_hover(style, color) {
    style.filter = "drop-shadow(0px 0px 5px " + color + ")";
}

function tag_a(style, color) {
    style.color = link_color(color);
}

function tag_a_hover(style, color) {
    style.color = hover_color(color);
}

function cls_tab(style, color) {
    style.borderTopColor = color;
}

function tag_th(style, color) {
    style.backgroundColor = color + "4";
    border_colors(style, color, "tlr");
    style.color = color;
}

function tag_tr_nthchild_even(style, color) {
    style.backgroundColor = color + "1";
}

function tag_tr_nthchild_odd(style, color) {
    style.backgroundColor = color + "1";
}

function tag_td_tr(style, color) {
    border_colors(style, color, "lr");
}

function group_ls1(style, color) {
    border_colors(style, color, "tlr");
}

function cls_sect(style, color) {
    group_ls1(style, color);
}

function cls_collapser(style, color) {
    color = colors["grey"][0];
    style.backgroundColor = color + "1";
    group_ls1(style, color);
}

function cls_collapser_hover(style, color) {
    color = colors["white"][0];
    style.backgroundColor = color + "2";
    group_ls1(style, color);
}

function cls_collopen(style, color) {
    color = colors["grey"][0];
    style.color = color;
    group_ls1(style, color);
}

function cls_collopen_hover(style, color) {
    color = colors["white"][0];
    style.color = color;
    group_ls1(style, color);
}

function cls_line(style, color) {
    style.borderColor = color;
    var linetmp = "0px 0px 5px " + color;
    style.boxShadow = linetmp + ", inset " + linetmp;
}

function cls_line_hover(style, color) {
    style.borderColor = color;
    var linetmp = "0px 0px 10px " + color;
    style.boxShadow = linetmp + ", inset " + linetmp;
}

function group_ls2(style, color) {
    border_colors(style, color, "tlr");
    style.color = color.slice(0, 4);
    style.backgroundColor = color + "2";
}

function cls_lnk(style, color) {
    group_ls2(style, color + "8");
    style.backgroundColor = "";
}

function cls_lnk_hover(style, color) {
    color = link_color(color) + "8";
    group_ls2(style, color);
}

function cls_sel(style, color) {
    color = hover_color(color);
    group_ls2(style, color);
}

function cls_sel_hover(style, color) {
    group_ls2(style, color);
}

function cls_btn(style, color) {
    border_colors(style, color, "tlr");
    style.color = color;
    style.backgroundColor = color + "4";
}

function cls_btn_hover(style, color) {
    color = hover_color(color);
    cls_btn(style, color);
}

function id_jumper(style, color) {
    border_colors(style, color, "tl");
    style.color = color;
    style.boxShadow = "0px 0px 4px " + color;
}

var selectors = {
    "h1, h2, h3, h4, h5, h6": tag_h1_h2_h3_h4_h5_h6,
    "#logo:hover, #logo:focus": id_logo_hover,
    "a": tag_a,
    "a:hover, a:focus": tag_a_hover,
    ".tab": cls_tab,
    "th": tag_th,
    "tr:nthchild(2n)": tag_tr_nthchild_even,
    "tr:nthchild(2n+1)": tag_tr_nthchild_odd,
    "td, tr": tag_td_tr,
    ".sect": cls_sect,
    ".collapser": cls_collapser,
    ".collapser:hover, .collapser:focus": cls_collapser_hover,
    ".collopen": cls_collopen,
    ".collopen:hover, .collopen:focus": cls_collopen_hover,
    ".line": cls_line,
    ".line:hover, .line:focus": cls_line_hover,
    ".lnk:hover, .lnk:focus": cls_lnk_hover,
    ".sel": cls_sel,
    ".sel:hover, .sel:focus": cls_sel_hover,
    ".lnk": cls_lnk,
    ".btn": cls_btn,
    ".btn:hover, .btn:focus": cls_btn_hover,
    "#jumper": id_jumper
}
