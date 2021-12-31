function $(q, o = document) { return o.querySelector(q) }
function $$(q, o = document) { return o.querySelectorAll(q) }
// Generic board set up
var grid_st = `\
╔═════════════════════════╕ ╒═════════════════════════╗.
║ - - - - - - - - - - - - │ │ - - - - - - - - - - - - ║.
║ - ┌─────┐ - ┌───────┐ - │ │ - ┌───────┐ - ┌─────┐ - ║.
║ O │     │ - │       │ - │ │ - │       │ - │     │ O ║.
║ - └─────┘ - └───────┘ - └─┘ - └───────┘ - └─────┘ - ║.
║ - - - - - - - - - - - - - - - - - - - - - - - - - - ║.
║ - ┌─────┐ - ┌─┐ - ┌─────────────┐ - ┌─┐ - ┌─────┐ - ║.
║ - └─────┘ - │ │ - └─────┐ ┌─────┘ - │ │ - └─────┘ - ║.
║ - - - - - - │ │ - - - - │ │ - - - - │ │ - - - - - - ║.
╚═════════╗ - │ └─────┐   │ │   ┌─────┘ │ - ╔═════════╝.
          ║ - │ ┌─────┘   └─┘   └─────┐ │ - ║          .
          ║ - │ │                     │ │ - ║          .
          ║ - │ │   ╔════─────════╗   │ │ - ║          .
══════════╝ - └─┘   ║             ║   └─┘ - ╚══════════.
            -       ║             ║       -            .
══════════╗ - ┌─┐   ║             ║   ┌─┐ - ╔══════════.
          ║ - │ │   ╚═════════════╝   │ │ - ║          .
          ║ - │ │                     │ │ - ║          .
          ║ - │ │   ┌─────────────┐   │ │ - ║          .
╔═════════╝ - └─┘   └─────┐ ┌─────┘   └─┘ - ╚═════════╗.
║ - - - - - - - - - - - - │ │ - - - - - - - - - - - - ║.
║ - ┌─────┐ - ┌───────┐ - │ │ - ┌───────┐ - ┌─────┐ - ║.
║ - └───┐ │ - └───────┘ - └─┘ - └───────┘ - │ ┌───┘ - ║.
║ O - - │ │ - - - - - - -     - - - - - - - │ │ - - O ║.
╙───┐ - │ │ - ┌─┐ - ┌─────────────┐ - ┌─┐ - │ │ - ┌───╜.
╓───┘ - └─┘ - │ │ - └─────┐ ┌─────┘ - │ │ - └─┘ - └───╖.
║ - - - - - - │ │ - - - - │ │ - - - - │ │ - - - - - - ║.
║ - ┌─────────┘ └─────┐ - │ │ - ┌─────┘ └─────────┐ - ║.
║ - └─────────────────┘ - └─┘ - └─────────────────┘ - ║.
║ - - - - - - - - - - - - - - - - - - - - - - - - - - ║.
╚═════════════════════════════════════════════════════╝`
var grid = []
var tables = [
    "#board",
    "#targets",
    "#sprites-pac",
    "#sprites-bli",
    "#sprites-pin",
    "#sprites-ink",
    "#sprites-cly",
    "#sprites-fruit"
];
var scatter_times = [];

var fruit_cherry = $("#cherry").outerHTML;
var fruit_strawberry = $("#strawberry").outerHTML;
var fruit_peach = $("#peach").outerHTML;
var fruit_apple = $("#apple").outerHTML;
var fruit_pear = $("#pear").outerHTML;
var fruit_galaxian = $("#galaxian").outerHTML;
var fruit_bell = $("#bell").outerHTML;
var fruit_key = $("#key").outerHTML;
var levels = [
    fruit_cherry,
    fruit_strawberry,
    fruit_peach,
    fruit_peach,
    fruit_apple,
    fruit_apple,
    fruit_pear,
    fruit_pear,
    fruit_galaxian,
    fruit_galaxian,
    fruit_bell,
    fruit_bell,
    fruit_key,
    fruit_key,
    fruit_key,
    fruit_key,
    fruit_key,
    fruit_key,
    fruit_key,
    fruit_key,
];
function fix_size() {
    $("#board").style.width = "";
    $("#board").style.height = "";
    font_h = $("#board td").getClientRects()[0].height;
    font_w = $("#board td").getClientRects()[0].width;
    var grid_w = grid[0].length * font_w + "px";
    var grid_h = grid.length * font_h + "px";
    for(var table of tables) {
        var e = $(table)
        e.style.width = grid_w;
        e.style.height = grid_h;
    }
    $("#status").style.width = grid_w;
    $("#status2").style.width = grid_w;
    $("#targets").style.width = grid_w;
    $("#cheats").style.width = grid_w;
    $("#lvl").style.height = font_h * 1.5 + "px";
}

function lets_scatter() {
    if(bonus_fruit == 10000) {
        $("#sprites-fruit").rows[17].cells[26].innerHTML = levels[Math.min(level, 14) - 1];
    } if(bonus_fruit >= 250) {
        bonus_fruit -= 250;
    } else if(bonus_fruit == 0) {
        bonus_fruit -= 250;
        $("#sprites-fruit").rows[17].cells[26].innerHTML = " ";
    }
    if(powered >= 250) {
        powered -= 250;
        return
    } else if(powered == 0) {
        blinky_spook = false;
        pinky_spook = false;
        inky_spook = false;
        clyde_spook = false;
        powered -= 250;
    }

    if(!scatter_times.length)
        return
    if(scatter_times[0] != 0) {
        scatter_times[0] -= 250;
        return
    }

    scatter = !scatter
    console.log("Scattering:", scatter)
    console.log("Times:", scatter_times)
    change_direction();
    scatter_times = scatter_times.slice(1);
}

function semigen_grid() {
    blinky_y = 11; blinky_x = 26;
    blinky_tX = 0; blinky_tY = 0;
    blinky_face = [0, 1]; blinky_alive = true;
    blinky_spook = false;

    pinky_y = 14; pinky_x = 26;
    pinky_tX = 0; pinky_tY = 0;
    pinky_face = [0, 1]; pinky_alive = true;
    pinky_dots = 0; pinky_spook = false;

    inky_y = 14; inky_x = 22;
    inky_tX = 0; inky_tY = 0;
    inky_face = [0, 1]; inky_alive = true;
    inky_dots = 0; inky_spook = false;

    clyde_y = 14; clyde_x = 30;
    clyde_tX = 0; clyde_tY = 0;
    clyde_face = [0, 1]; clyde_alive = true;
    clyde_scatter = false; clyde_dots = 0;
    clyde_spook = false;

    pac_x = 26; pac_y = 23; pac_face = [2, 0];

    $("#lives").innerHTML = "C ".repeat(Math.max(lives - 1, 0));
    $("#lvl").innerHTML = levels.slice(Math.max(0, Math.min(level, 21) - 8), Math.min(level, 21)).reverse().join(" ");
}

function gen_grid(still_playing = 0) {
    if(!still_playing) {
        window.clearInterval(move_interval)
        grid = [];
        console.info("Generating Grid")
        level += 1
        $("#lvlin").value = level
        localStorage.setItem("pac_level", level)
        localStorage.setItem("pac_score", score)
        // Set up the grid
        for(var s of grid_st.split(".\n")) {
            grid.push(s.split(''))
        }
        var html = ("<tr>" + "<td> </td>".repeat(grid[0].length) + "</tr>").repeat(grid.length)

        for(var table of tables)
            $(table).innerHTML = html;
        $("#sprites-pac td").innerHTML = `<span class="pac">C</span>`
        $("#sprites-bli td").innerHTML = `<span class="blinky">M</span>`
        $("#sprites-ink td").innerHTML = `<span class="inky">M</span>`
        $("#sprites-pin td").innerHTML = `<span class="pinky">M</span>`
        $("#sprites-cly td").innerHTML = `<span class="clyde">M</span>`
        fix_size();
        if(level == 256) {
            var killscreen = document.createElement("SCRIPT");
            killscreen.type = "text/javascript";
            killscreen.src = "killscreen.js";
            document.body.appendChild(killscreen);
            return;
        }
    }

    // Set up variables. I could use a class but I'm too lazy

    semigen_grid();
    char = 0; ghosts_eaten = [0, 0, 0, 0];
    powers_eaten = -1; powered = -250;
    running_out = false; scatter = false;
    dots = 0; global_counter = true;

    // Set scatter times, from https://pacman.holenet.info/#CH2_Scatter_Chase_Repeat
    if(level == 1) {
        scatter_times = [
            0,
            7000,  // 7s scatter
            20000, // 20s chase
            7000,  // 7s scatter
            20000, // 20s chase
            5000,  // 5s scatter
            20000, // 20s chase
            5000,  // 5s scatter
        ];
    } else if(level < 5) {
        scatter_times = [
            0,
            7000,    // 7s scatter
            20000,   // 20s chase
            7000,    // 7s scatter
            20000,   // 20s chase
            5000,    // 5s scatter
            1033000, // 1033s chase
            250,      // 1/4s scatter
        ];
    } else {
        scatter_times = [
            0,
            5000,    // 5s scatter
            20000,   // 20s chase
            5000,    // 5s scatter
            20000,   // 20s chase
            5000,    // 5s scatter
            1037000, // 1037s chase
            250,      // 1/4s scatter
        ];
    }

    // Set speeds, from https://pacman.holenet.info/#CH2_Speed
    if(level == 1) {
        pac_speed = [0.8, 0.71, 0.9, 0.79];
        ghost_speed = [0.75, 0.5, 0.4];
    } else if(level < 5) {
        pac_speed = [0.9, 0.79, 0.95, 0.83];
        ghost_speed = [0.85, 0.55, 0.45];
    } else if(level < 21) {
        pac_speed = [1, 0.87, 1, 0.87];
        ghost_speed = [0.95, 0.6, 0.5];
    } else {
        pac_speed = [0.9, 0.79, 0.9, 0.79];
        ghost_speed = [0.95, 0.6, 0.5];
    }

    // Elroy [faster blinky] https://pacman.holenet.info/#LvlSpecs
    if(level >= 5)
        elroy_speed = [1, 1.05];
    switch(level) {
        case 1:
            elroy_speed = [0.8, 0.85];
            elroy_dots = [20, 10];
            break;
        case 2:
            elroy_speed = [0.9, 0.95];
            elroy_dots = [30, 15];
            break;
        case 3:
        case 4:
            elroy_speed = [0.9, 0.95];
            elroy_dots = [40, 20];
            break;
        case 5:
            elroy_dots = [40, 20];
        case 6:
        case 7:
        case 8:
            elroy_dots = [50, 25];
            break;
        case 9:
        case 10:
        case 11:
            elroy_dots = [60, 30];
            break;
        case 12:
        case 13:
        case 14:
            elroy_dots = [80, 40];
            break;
        case 15:
        case 16:
        case 17:
        case 18:
            elroy_dots = [100, 50];
            break;
        default:
            elroy_dots = [120, 60];
            break;
    }

    // Spook variables
    switch(level) {
        case 1:
            spook_time = 6000;
            break;
        case 2:
        case 6:
        case 10:
            spook_time = 5000;
            break;
        case 3:
            spook_time = 4000;
            break;
        case 4:
        case 14:
            spook_time = 3000;
            break;
        case 5:
        case 7:
        case 8:
        case 11:
            spook_time = 2000;
            break;
        case 9:
        case 12:
        case 13:
        case 15:
        case 16:
        case 18:
            spook_time = 1000;
            break;
        default:
            spook_time = 0;
    }

    // Dot counter limits, from https://pacman.holenet.info/#CH2_Home_Sweet_Home

    if(level == 1) {
        dot_counter = [30, 90];
    } else if(level == 2) {
        dot_counter = [0, 50];
    } else {
        dot_counter = [0, 0];
    }
    lets_scatter();
    draw_grid(1);
}

// Static
var PACMAN = 0,
    BLINKY = 1,
    INKY = 2,
    PINKY = 3,
    CLYDE = 4,
    home_x = 26, home_y = 14,
    exit_x = 26, exit_y = 11,
    font_h = $("#board td").getClientRects()[0].height,
    font_w = $("#board td").getClientRects()[0].width,
    last_dot_timeout = 0, move_interval = 0;

// Position variables

var blinky_y, blinky_x, blinky_tY, blinky_tX, blinky_face, blinky_alive,
    pinky_y,  pinky_x,  pinky_tY,  pinky_tX,  pinky_face,  pinky_alive,
    inky_y,   inky_x,   inky_tY,   inky_tX,   inky_face,   inky_alive,
    clyde_y,  clyde_x,  clyde_tY,  clyde_tX,  clyde_face,  clyde_alive,
    pac_y,    pac_x,                          pac_face,

    score = 0, char, ghosts_eaten, powers_eaten, powered, running_out,
    scatter, clyde_scatter, level, pac_speed, ghost_speed, dots = 0,
    dot_counter, inky_dots, pinky_dots, clyde_dots, global_counter,

    pac_rot = 0, lives = 6, elroy_speed, elroy_dots, bonus_fruit, pac_inv,
    inky_spook, blinky_spook, pinky_spook, clyde_spook, spook_time;

if(Number(new Date()) - (localStorage.getItem("pac_time") || 0) > 3600000) {
    level = 0;
} else {
    level = (localStorage.getItem("pac_level") || 1) - 1;
    score = Number(localStorage.getItem("pac_score") || 0)
}
$("#lvlin").value = level + 1

var last_grid = grid.toString();
var on_pinky = false;
var on_inky = false;
var on_clyde = false;
var on_blinky = false;


function draw_grid(complete = 0) {
    var tab = $("#board")
    if(last_grid != grid.toString()) {
        if(complete) {
            var mx_y = grid.length;
            var mx_x = grid[0].length;
            var mn_y = 0;
            var mn_x = 0;
        } else { // Only refresh by pacman to save cpu time
            var mx_y = pac_y + 2;
            var mx_x = Math.min(53, pac_x + 2)
            var mn_y = pac_y - 1;
            var mn_x = Math.max(0, pac_x - 1)
        }
        for(var y = mn_y; y < mx_y; y += 1) {
            var r = tab.rows[y];
            var grid_y = grid[y];
            for(var x = mn_x; x < mx_x; x += 1) {
                var c = grid_y[x];
                var s = r.cells[x];
                if(c == s.textContent)
                    continue
                switch(c) {
                    case "-":
                    case " ":
                        s.innerHTML = `<span style="color: #fff">${c}</span>`;
                        break;
                    case "O":
                        s.innerHTML = `<span class="power">${c}</span>`;
                        break;
                    default:
                        if(c.length == 1)
                            s.innerHTML = `<span class="grid">${c}</span>`;
                        else
                            s.innerHTML = c
                }
            }
        }
    }
    for(var thing of $$(".darker"))
        thing.classList.remove("darker")
    tab.rows[blinky_y].cells[blinky_x].classList.add("darker")
    tab.rows[inky_y].cells[inky_x].classList.add("darker")
    tab.rows[pinky_y].cells[pinky_x].classList.add("darker")
    tab.rows[clyde_y].cells[clyde_x].classList.add("darker")
    var r = powered <= 1500 ? ' running-out' : ''
    var sprite = $("#sprites-bli td")
    sprite.className = `blinky${blinky_alive ? blinky_spook ? ' spooked' + r : '' + r : ' ded'}`;
    sprite.innerHTML = blinky_alive ? "M" : "~"

    sprite = $("#sprites-pin td")
    sprite.className = `pinky${pinky_alive ? pinky_spook ? ' spooked' + r : '' : ' ded'}`;
    sprite.innerHTML = pinky_alive ? "M" : "~"

    sprite = $("#sprites-ink td")
    sprite.className = `inky${inky_alive ? inky_spook ? ' spooked' + r : '' + r : ' ded'}`;
    sprite.innerHTML = inky_alive ? "M" : "~"

    sprite = $("#sprites-cly td")
    sprite.className = `clyde${clyde_alive ? clyde_spook ? ' spooked' + r : '' + r : ' ded'}`;
    sprite.innerHTML = clyde_alive ? "M" : "~"

    sprite = $("#sprites-pac span")
    sprite.className = `pac${powered >= 0 ? ' spooked' + r : ''}`
    sprite.innerHTML = (pac_y + pac_x/2) % 2 ? 'c' : 'C'
    if(pac_inv != pac_rot) {
        pac_inv = pac_rot;
        sprite.style.transform = `rotate(${pac_rot}deg)`
    }

    tab = $("#targets")
    if(tab.style.display != "none") {
        tab.innerHTML = `<span class="target" style="color: #f80; top: ${font_h * clyde_tY}px; left: ${font_w * clyde_tX}px;">X</span>`
        tab.innerHTML += `<span class="target" style="color: #f00; top: ${font_h * blinky_tY}px; left: ${font_w * blinky_tX}px;">X</span>`
        tab.innerHTML += `<span class="target" style="color: #f08; top: ${font_h * pinky_tY}px; left: ${font_w * pinky_tX}px;">X</span>`
        tab.innerHTML += `<span class="target" style="color: #0ff; top: ${font_h * inky_tY}px; left: ${font_w * inky_tX}px;">X</span>`
    }
    $("#score").innerHTML = score;
    //$("#dots").innerHTML = dots;
    $("#modes").innerHTML = scatter ? "SCATTER" : powered ? "SPOOK" : "CHASE";
    reposition();
    localStorage.setItem("pac_time", Number(new Date()))
}
gen_grid();

function reposition() {
    var offy = font_h / 2;
    var offx = font_w / 2;
    $(".pac").style.top = font_h * pac_y - offy + "px";
    $(".pac").style.left = font_w * pac_x + offx + "px";

    $(".blinky").style.top = font_h * blinky_y + 2 - offy  + "px";
    $(".blinky").style.left = font_w * blinky_x + 2 + offx + "px";

    $(".pinky").style.top = font_h * pinky_y + 2 - offy + "px";
    $(".pinky").style.left = font_w * pinky_x - 2 + offx + "px";

    $(".inky").style.top = font_h * inky_y - 2 - offy + "px";
    $(".inky").style.left = font_w * inky_x + 2 + offx + "px";

    $(".clyde").style.top = font_h * clyde_y - 2 - offy + "px";
    $(".clyde").style.left = font_w * clyde_x - 2 + offx + "px";

}

function change_direction() {
    blinky_face = [-blinky_face[0], -blinky_face[1]];
    pinky_face = [-pinky_face[0], -pinky_face[1]];
    inky_face = [-inky_face[0], -inky_face[1]];
    clyde_face = [-clyde_face[0], -clyde_face[1]];
}

function move_pac(dX, dY, evt) {
    // Get X/Y of a sprite
    var vX, vY;
    var base_allowed = false;
    var tE = null;
    switch(char) {
        case PACMAN:
            [vX, vY] = [pac_x, pac_y];
            break;
        case BLINKY:
            [vX, vY] = [blinky_x, blinky_y];
            base_allowed = !blinky_alive;
            break;
        case INKY:
            [vX, vY] = [inky_x, inky_y];
            base_allowed = !inky_alive;
            break;
        case PINKY:
            [vX, vY] = [pinky_x, pinky_y];
            base_allowed = !pinky_alive;
            break;
        case CLYDE:
            [vX, vY] = [clyde_x, clyde_y];
            base_allowed = !clyde_alive;
            break;
    }
//                     console.log(vX, vY, '[', dX, dY, ']')
    if(vX == 54 && dX == 2)
        vX = -2
    else if(vX == 0 && dX == -2)
        vX = 56
    try {
        var c = grid[vY + dY][vX + dX]
    } catch(err) {
        if(dY == 1)
            vY = 0
        else
            vY = grid.length
        var c = grid[vY + dY][vX + dX]
    }
    base_allowed |= in_base()
    base_allowed &= (((vY == 11 && dY == 1) || (vY == 13 && dY == -1)) && vX <= 29 && vX >= 25)
//                     console.log(base_allowed)

    if(" -O<".includes(c[0]) || base_allowed) {
        vX += dX;
        vY += dY;
        if(char == 0) { // Is the selected sprite pacman?
            switch(c) {
                case "-":
                    preferred_dot();
                    score += 10;
                    window.clearTimeout(last_dot_timeout);
                    last_dot_timeout = window.setTimeout(next_ghost, level >= 5 ? 3000 : 4000)
                    grid[vY][vX] = " "; // Clear the current space
                    $("#board").rows[vY].cells[vX].innerHTML = ""
                    last_grid = grid.toString()
                    break;
                case "O":
                    window.clearTimeout(last_dot_timeout);
                    last_dot_timeout = window.setTimeout(next_ghost, level >= 5 ? 3000 : 4000)
                    score += 50;
                    preferred_dot()
                    grid[vY][vX] = " "; // Clear the current space
                    $("#board").rows[vY].cells[vX].innerHTML = ""
                    last_grid = grid.toString()
                    if(spook_time) {
                        powered = spook_time;
                        blinky_spook = true;
                        pinky_spook = true;
                        inky_spook = true;
                        clyde_spook = true;
                        powers_eaten += 1;
                        change_direction();
                   }
                   break;
            }
        }
    }

    switch(char) { // Set X/Y vars
        case PACMAN:
            [pac_x, pac_y] = [vX, vY];
            pac_face = [dX, dY];
            break;
        case BLINKY:
            [blinky_x, blinky_y] = [vX, vY];
            blinky_face = [dX, dY];
            break;
        case INKY:
            [inky_x, inky_y] = [vX, vY];
            inky_face = [dX, dY];
            break;
        case PINKY:
            [pinky_x, pinky_y] = [vX, vY];
            pinky_face = [dX, dY];
            break;
        case CLYDE:
            [clyde_x, clyde_y] = [vX, vY];
            clyde_face = [dX, dY];
            break;
    }
    if(evt)
        evt.preventDefault();
    reposition();
}

function die() {
    if(lives - 1 == 0) {
        localStorage.setItem("pac_level", 1);
        localStorage.setItem("pac_score", 0);
    }
    window.clearInterval(move_interval);
    draw_grid(1);
    var style = document.createElement("STYLE");
    style.innerHTML = ".blinky, .clyde, .inky, .pinky { display: none; }";
    style.id = "custom-css";
    document.head.appendChild(style);
    window.setTimeout(() => {
        $(".pac").innerHTML = "<";
    }, 1000);
    window.setTimeout(() => {
        $(".pac").innerHTML = "=";
    }, 1250);
    window.setTimeout(() => {
        $(".pac").innerHTML = "¦";
    }, 1500);
    window.setTimeout(() => {
        $(".pac").innerHTML = ":";
    }, 1750);
    window.setTimeout(() => {
        $(".pac").innerHTML = ".";
    }, 2000);
    window.setTimeout(() => {
        $(".pac").innerHTML = " ";
    }, 2250);
    window.setTimeout(() => {
        $("#custom-css").remove();
        last_move = "ArrowRight"
        lives -= 1;
        last_last_move = "ArrowRight";
        pac_rot = 0;
        semigen_grid();
        draw_grid(1);
        global_counter = true;
        if(lives == 0) {
            grid_color("#f00");
            $("#lives").innerHTML = "Consider supporting on <a href='/prizm.dev/re/patreon' style='color: #48f;' target='_blank'>Patreon</a>!"
            message("GAME OVER", "#f00");
            window.setTimeout(() => { message("NEW GAME?", "#f00"); game_over = true; }, 5000);
            return;
        }
        for(var x = 0; x < 4250; x += 250)
            window.setTimeout(message, x, x % 500 ? "READY!" : "", "#ff0");
          window.clearInterval(move_interval);
        window.setTimeout(() => move_interval = window.setInterval(lets_move, 250), 4250);
    }, 2500);
}

function grid_color(c) {
    window.setTimeout((c) => {
        var style = document.createElement("STYLE");
        style.innerHTML = `.grid { color: ${c} }`;
        style.id = "custom-css";
        document.head.appendChild(style);
    }, 1000, c);
    window.setTimeout(() => {
        $("#custom-css").remove();
    }, 1250);
    window.setTimeout(() => {
        var style = document.createElement("STYLE");
        style.innerHTML = `.grid { color: ${c} }`;
        style.id = "custom-css";
        document.head.appendChild(style);
    }, 1500, c);
    window.setTimeout(() => {
        $("#custom-css").remove();
    }, 1750);
    window.setTimeout(() => {
        var style = document.createElement("STYLE");
        style.innerHTML = `.grid { color: ${c} }`;
        style.id = "custom-css";
        document.head.appendChild(style);
    }, 2000, c);
    window.setTimeout(() => {
        $("#custom-css").remove();
    }, 2250);
    window.setTimeout(() => {
        var style = document.createElement("STYLE");
        style.innerHTML = `.grid { color: ${c} }`;
        style.id = "custom-css";
        document.head.appendChild(style);
    }, 2500, c);
    window.setTimeout(() => {
        $("#custom-css").remove();
    }, 2750);
    window.setTimeout(() => {
        var style = document.createElement("STYLE");
        style.innerHTML = `.grid { color: ${c} }`;
        style.id = "custom-css";
        document.head.appendChild(style);
    }, 3000, c);
}

function win() {
    window.clearInterval(move_interval);
    draw_grid(1);
    grid_color("#0f0");
    window.setTimeout(() => {
        $("#custom-css").remove();
        last_move = "ArrowRight"
        last_last_move = "ArrowRight";
        pac_rot = 0;
        gen_grid();
        for(var x = 0; x < 4250; x += 250) {
            window.setTimeout(message, x, x % 500 ? "READY!" : "", "#ff0");
        }
        window.clearInterval(move_interval);
        window.setTimeout(() => move_interval = window.setInterval(lets_move, 250), 4250);
    }, 3250);
}

function next_ghost() {
    if(!pinky_dots)
        pinky_dots = 1;
    else if(!inky_dots)
        inky_dots = 1;
    else if(!clyde_dots)
        clyde_dots = 1;
}

function in_base(c = null) {
    var cX, cY;
    switch(c || char) {
        case PACMAN:
            [cX, cY] = [pac_x, pac_y];
            break;
        case BLINKY:
            [cX, cY] = [blinky_x, blinky_y];
            break;
        case INKY:
            [cX, cY] = [inky_x, inky_y];
            break;
        case PINKY:
            [cX, cY] = [pinky_x, pinky_y];
            break;
        case CLYDE:
            [cX, cY] = [clyde_x, clyde_y];
            break;
    }
    return cX <= 32 && cY >= 13 && cX >= 22 && cY <= 15;
}

function preferred_dot() {
    dots += 1;
    if(dots == 7)
        pinky_dots = 1;
    else if(dots == 17)
        inky_dots = 1;
    if(dots == 32 && in_base(CLYDE))
        global_counter = false;
    if(dots == 70 || dots == 170)
        bonus_fruit = 10000;
}

function can_release(c = null) {
    switch(c || char) {
        case PACMAN:
            return true;
        case BLINKY:
            return true;
        case INKY:
            return global_counter ? inky_dots : dots >= dot_counter[0];
        case PINKY:
            return global_counter ? pinky_dots : true;
        case CLYDE:
            return dots >= dot_counter[1];
    }
}

function get_distance(cX, cY, tX, tY, face, base_allowed, dX, dY) {
    if(face[1] == -1 && dY == 1)
        return 20000;
    else if(face[1] == 1 && dY == -1)
        return 20000;
    else if(face[0] == 2 && dX == -2)
        return 20000;
    else if(face[0] == -2 && dX == 2)
        return 20000;
    else if(!base_allowed && dY == -1 && (cY == 23 || cY == 11) && (cX == 24 || cX == 30))
        return 30000;
    if(cX == 54 && dX == 2)
        cX = -2;
    else if(cX == 0 && dX == -2)
        cX = 56;
    if(cY == 0 && dY == -1)
        cY = 31;
    else if(cY == 30 && dY == 1)
        cY = -1;
    base_allowed &= (((cY == 11 && dY == 1) || (cY == 13 && dY == -1)) && cX <= 29 && cX >= 25)
//                     console.log(base_allowed)
    console.log(cY, cX, dY, dX);
    if(" -O<".includes(grid[cY + dY][cX + dX][0]) || base_allowed)
        return Math.round(
            Math.sqrt(Math.abs(cX - tX + dX)/2) ** 2 +
            Math.sqrt(Math.abs(cY - tY + dY)) ** 2
        )
    return 10000;
}

/*function fix_target(tX, tY) {
    if(tY > 30)
        tY -= 30;
    else if(tY < 0)
        tY += 30;
    if(tX > 54)
        tX -= 54;
    else if(tX < 0)
        tX += 54;
    return [tX, tY];
}*/

function do_move() {
    var cX, cY;
    var tX, tY;
    var face = [0, 0];
    var alive = true;
    switch(char) {
        case PACMAN:
            [cX, cY] = [pac_x, pac_y];
            [tX, tY] = [pac_x, pac_y];
            face = pac_face;
            break;
        case BLINKY:
            [cX, cY] = [blinky_x, blinky_y];
            [tX, tY] = [blinky_tX, blinky_tY];
            face = blinky_face;
            alive = blinky_alive;
            break;
        case INKY:
            [cX, cY] = [inky_x, inky_y];
            [tX, tY] = [inky_tX, inky_tY];
            face = inky_face;
            alive = inky_alive;
            break;
        case PINKY:
            [cX, cY] = [pinky_x, pinky_y];
            [tX, tY] = [pinky_tX, pinky_tY];
            face = pinky_face;
            alive = pinky_alive;
            break;
        case CLYDE:
            [cX, cY] = [clyde_x, clyde_y];
            [tX, tY] = [clyde_tX, clyde_tY];
            face = clyde_face;
            alive = clyde_alive;
            break;
    }
    var really_move = true
    if(char && !(char == BLINKY && dots <= elroy_dots[0])) {
        if(powered && Math.random() > ghost_speed[1])
            really_move = false
        else if(cY == 14 && (cX <= 10 || cX >= 44) && Math.random() > ghost_speed[2])
            really_move = false
        else if(!alive)
            really_move = true
        else if(Math.random() > ghost_speed[0])
            really_move = false
    }
    if(really_move) {
        var args = [cX, cY, tX, tY, face, !alive || in_base()]
        var right_dist = get_distance(...args, 2, 0);
        var left_dist = get_distance(...args, -2, 0);
        var down_dist = get_distance(...args, 0, 1);
        var up_dist = get_distance(...args, 0, -1);
        console.log("Up:", up_dist);
        console.log("Left:", left_dist);
        console.log("Down:", down_dist);
        console.log("Right:", right_dist);
        var min_dist = Math.min(right_dist, left_dist, up_dist, down_dist)
        if(powered >= 0 && alive) {
            var ls = [right_dist, left_dist, up_dist, down_dist];
            min_dist = ls[Math.floor(Math.random() * 4)]
            var attempts = 0;
            while(min_dist >= 10000 && attempts < 6) {
                min_dist = ls[Math.floor(Math.random() * 4)]
                attempts += 1;
            }
            if(attempts == 6)
                min_dist = 0;
        }
        switch(min_dist) {
            case up_dist:
                move_pac(0, -1);
                break;
            case left_dist:
                move_pac(-2, 0);
                break;
            case down_dist:
                move_pac(0, 1);
                break;
            case right_dist:
                move_pac(2, 0);
                break;
        }
    } else {
        var dX, dY;
        [dX, dY] = face;
        move_pac(0, 0);
        switch(char) {
            case PACMAN:
                pac_face = [dX, dY];
                break;
            case BLINKY:
                blinky_face = [dX, dY];
                break;
            case INKY:
                inky_face = [dX, dY];
                break;
            case PINKY:
                pinky_face = [dX, dY];
                break;
            case CLYDE:
                clyde_face = [dX, dY];
                break;
        }
    }
}

function blinky_target() {
    char = BLINKY;
    console.group("Blinky");
    if(blinky_x == home_x && blinky_y == home_y) {
        blinky_alive = true;
        blinky_spook = false;
    }
    if(!blinky_alive) {
        blinky_tX = home_x;
        blinky_tY = home_y;
    } else if(in_base()) {
        blinky_tX = exit_x;
        blinky_tY = exit_y;
    } else if(scatter) {
        blinky_tX = 49;
        blinky_tY = -4;
    } else {
        blinky_tX = pac_x;
        blinky_tY = pac_y;
    }
    console.groupEnd("Blinky");
    do_move();
}

function pinky_target() {
    char = PINKY;
    console.group("Pinky");
    if(pinky_x == home_x && pinky_y == home_y) {
        pinky_dots = 0;
        pinky_alive = true;
        pinky_spook = false;
    }
    if(!pinky_alive || !can_release()) {
        pinky_tX = home_x;
        pinky_tY = home_y;
    } else if(in_base()) {
        pinky_tX = exit_x;
        pinky_tY = exit_y;
    } else if(scatter) {
        pinky_tX = 4;
        pinky_tY = -4;
    } else {
        switch(pac_face[1] || pac_face[0]) {
            case 1:
                pinky_tX = pac_x;
                pinky_tY = pac_y + 4;
                break;
            case -1:
                pinky_tX = pac_x - 8;
                pinky_tY = pac_y - 4;
                break;
            case 2:
                pinky_tY = pac_y;
                pinky_tX = pac_x + 8;
                break;
            case -2:
                pinky_tY = pac_y;
                pinky_tX = pac_x - 8;
                break;
        }
//        [pinky_tX, pinky_tY] = fix_target(pinky_tX, pinky_tY)
    }
    console.groupEnd("Pinky");
    do_move();
}

function inky_target() {
    char = INKY;
    console.group("Inky");
    if(inky_x == home_x && inky_y == home_y) {
        inky_alive = true
        inky_dots = 0;
        inky_spook = false;
    }
    if(!inky_alive || !can_release()) {
        inky_tX = home_x;
        inky_tY = home_y;
    } else if(in_base()) {
        inky_tX = exit_x;
        inky_tY = exit_y;
    } else if(scatter) {
        inky_tX = 53;
        inky_tY = 31;
    } else {
        switch(pac_face[1] || pac_face[0]) {
            case 1:
                inky_tX = pac_x + (pac_x - blinky_x);
                inky_tY = pac_y + 2 + (pac_y + 2 - blinky_y);
                break;
            case -1:
                inky_tX = pac_x - 4 + (pac_x - 4 - blinky_x);
                inky_tY = pac_y - 2 + (pac_y - 2 - blinky_y);
                break;
            case 2:
                inky_tX = pac_x + 4 + (pac_x + 4 - blinky_x);
                inky_tY = pac_y + (pac_y - blinky_y);
                break;
            case -2:
                inky_tX = pac_x - 4 + (pac_x - 4 - blinky_x);
                inky_tY = pac_y + (pac_y - blinky_y);
                break;
        }
//        [inky_tX, inky_tY] = fix_target(inky_tX, inky_tY)
    }
    console.groupEnd("Inky");
    do_move();
}

function clyde_target() {
    char = CLYDE;
    console.group("Clyde");
    if(clyde_x == home_x && clyde_y == home_y) {
        clyde_alive = true
        clyde_dots = 0;
        clyde_spook = false;
    }
    if(clyde_x == 2 && clyde_y == 29)
        clyde_scatter = false
    if(!clyde_alive || !can_release()) {
        clyde_tX = home_x;
        clyde_tY = home_y;
    } else if(in_base()) {
        clyde_tX = exit_x;
        clyde_tY = exit_y;
    } else if(scatter || clyde_scatter) {
        clyde_tX = 0;
        clyde_tY = 31;
    } else {
        clyde_tX = pac_x;
        clyde_tY = pac_y;
        if(Math.round(Math.sqrt(Math.abs(clyde_x - pac_x)/2) ** 2 +
            Math.sqrt(Math.abs(clyde_y - pac_y)) ** 2) <= 8)
            clyde_scatter = true
    }
    console.groupEnd("Clyde");
    do_move();
}

function target() {
    console.groupCollapsed("Move");
    var temp_char = Number(char);
    var pf = pac_face.toString();
    on_blinky = blinky_alive && blinky_x == pac_x && blinky_y == pac_y && blinky_face.toString() != pf;
    on_inky = inky_alive && inky_x == pac_x && inky_y == pac_y && inky_face.toString() != pf;
    on_pinky = pinky_alive && pinky_x == pac_x && pinky_y == pac_y && pinky_face.toString() != pf;
    on_clyde = clyde_alive && clyde_x == pac_x && clyde_y == pac_y && clyde_face.toString() != pf;
    if(dots <= elroy_dots[0]) {
        var p = dots <= elroy_dots[1] ? elroy_speed[1] : elroy_speed[0];
        if(p > 1 && Math.random() < p - 1) {
            blinky_target();
            blinky_target();
        } else if(p >= 1 || Math.random() > p) {
            blinky_target();
        }
    } else {
        blinky_target();
    }
    pinky_target();
    inky_target();
    clyde_target();
    window.setTimeout(draw_grid, 100)
    char = temp_char;
    console.groupEnd("Move");
    on_blinky |= pac_x == blinky_x && pac_y == blinky_y && blinky_alive;
    on_pinky |= pac_x == pinky_x && pac_y == pinky_y && pinky_alive;
    on_inky |= pac_x == inky_x && pac_y == inky_y && inky_alive;
    on_clyde |= pac_x == clyde_x && pac_y == clyde_y && clyde_alive;
    if(bonus_fruit >= 0 && pac_y == 17 && pac_x == 26) {
        $("#sprites-fruit").rows[17].cells[26].innerHTML = " ";
        bonus_fruit = -250;
        switch(level) {
            case 1:
                score += 100;
                break;
            case 2:
                score += 300;
                break;
            case 3:
            case 4:
                score += 500;
                break;
            case 5:
            case 6:
                score += 700;
                break;
            case 7:
            case 8:
                score += 1000;
                break;
            case 9:
            case 10:
                score += 2000;
                break;
            case 11:
            case 12:
                score += 3000;
                break;
            default:
                score += 5000;
        }
    } if(dots == 244) {
        win();
    } if(powered < 0 || dots == 244) {
        if(dots != 244 && (on_blinky || on_inky || on_pinky || on_clyde))
            die();
    } else if(on_pinky) {
        pinky_alive = false;
        ghosts_eaten[powers_eaten] += 1;
        score += 200 * Math.pow(2, ghosts_eaten[powers_eaten] - 1);
    } else if(on_inky) {
        inky_alive = false;
        ghosts_eaten[powers_eaten] += 1;
        score += 200 * Math.pow(2, ghosts_eaten[powers_eaten] - 1);
    } else if(on_clyde) {
        clyde_alive = false;
        ghosts_eaten[powers_eaten] += 1;
        score += 200 * Math.pow(2, ghosts_eaten[powers_eaten] - 1);
    } else if(on_blinky) {
        blinky_alive = false;
        ghosts_eaten[powers_eaten] += 1;
        score += 200 * Math.pow(2, ghosts_eaten[powers_eaten] - 1);
    } if(powers_eaten == 3 && eval(ghosts_eaten.join("+")) == 16 ) {
        score += 12000;
        powers_eaten = -1;
    }
}
var last_last_move = "ArrowRight"
var last_move = "ArrowRight"
var debug = false;
function lets_move() {
    if(!$("#" + last_move).className.includes("toggle")) {
        $(".toggle").classList.remove("toggle")
        $("#" + last_move).classList.add("toggle")
    }
    if(!debug)
        char = PACMAN
    switch(last_move) {
        case "ArrowDown":
            switch(last_last_move) {
                case "ArrowLeft":
                    pac_rot -= 90;
                    break;
                case "ArrowRight":
                    pac_rot += 90;
                    break;
                case "ArrowUp":
                    pac_rot -= 180;
                    break;
            }
            move_pac(0, 1);
            target();
            break;
        case "ArrowLeft":
            switch(last_last_move) {
                case "ArrowDown":
                    pac_rot += 90;
                    break;
                case "ArrowRight":
                    pac_rot += 180;
                    break;
                case "ArrowUp":
                    pac_rot -= 90;
                    break;
            }
            move_pac(-2, 0);
            target();
            break;
        case "ArrowRight":
            switch(last_last_move) {
                case "ArrowLeft":
                    pac_rot -= 180;
                    break;
                case "ArrowDown":
                    pac_rot -= 90;
                    break;
                case "ArrowUp":
                    pac_rot += 90;
                    break;
            }
            move_pac(2, 0);
            target();
            break;
        case "ArrowUp":
            switch(last_last_move) {
                case "ArrowLeft":
                    pac_rot += 90;
                    break;
                case "ArrowRight":
                    pac_rot -= 90;
                    break;
                case "ArrowDown":
                    pac_rot += 180;
                    break;
            }
            move_pac(0, -1);
            target();
            break;
    }
    last_last_move = last_move;
    lets_scatter();
}
var easteregg = 0;
var next_move = "";
var game_over = false;
window.setInterval(() => {
    if(next_move && !game_over)
        window.onkeydown(0, next_move, 1);
}, 250);
window.onkeydown = (evt, tg, again = 0) => {
//    window.clearTimeout(key_t_o)
    if(game_over && ["Y", "y", "Enter", "Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(evt.key)) {
        level = 0;
        score = 0;
        gen_grid();
        font_loaded();
        $("#custom-css").remove();
        return;
    }
    try {
        $(".waiting").classList.remove("waiting");
    } catch(err) {
    }
    next_move = ""
    try {
        $("#" + (evt.key || tg || evt.target.id)).classList.add("waiting");
    } catch(err) {
    }
    pac_x = Math.abs(pac_x)
    switch(evt.key || tg || evt.target.id) {
        case "ArrowDown":
            if(!again) {
                if(easteregg == 15)
                    $("#easteregg").style.display = ""
                else if(easteregg < 16 && easteregg >= 12)
                    easteregg += 1
                else
                    easteregg = 0;
            }
            if(" -O<".includes(grid[pac_y + 1][pac_x][0]))
                last_move = "ArrowDown"
            else
                next_move = "ArrowDown"
            if(evt) { evt.preventDefault(); }
            break;
        case "ArrowLeft":
            if(!again) {
                if(easteregg < 8 && easteregg >= 4)
                    easteregg += 1
                else
                    easteregg = 0;
            }

            if(pac_x <= 0 || " -O<".includes(grid[pac_y][pac_x - 2][0]))
                last_move = "ArrowLeft"
            else
                next_move = "ArrowLeft"
            if(evt) { evt.preventDefault(); }
            break;
        case "ArrowRight":
            if(!again) {
                if(easteregg < 12 && easteregg >= 8)
                    easteregg += 1
                else
                    easteregg = 0;
            }

            if(pac_x >= 53 || " -O<".includes(grid[pac_y][pac_x + 2][0]))
                last_move = "ArrowRight"
            else
                next_move = "ArrowRight"
            if(evt) { evt.preventDefault(); }
            break;
        case "ArrowUp":
            if(!again) {
                if(easteregg < 4)
                    easteregg += 1
                else
                    easteregg = 1;
            }

            if(" -O<".includes(grid[pac_y - 1][pac_x][0]))
                last_move = "ArrowUp"
            else
                next_move = "ArrowUp"
            if(evt) { evt.preventDefault(); }
            break;
        case "Alt":
            char = char + 1 == 5 ? 0 : char + 1;
            if(evt) { evt.preventDefault(); }
            break;
        case "Space":
            pause();
            if(evt) { evt.preventDefault(); }
            break;
        case "Shift":
            if(evt.ctrl && evt.alt)
                show_targets();
            break;
    }
}

function message(msg, color) {
    var r = $("#board").rows[17].cells;
    var i = Math.floor((r.length - msg.length * 2) / 2);
    for(var e of $$(".msg"))
        e.parentElement.innerHTML = "";
    for(var x of msg) {
        r[i].innerHTML = `<span class="grid msg kill" style="color: ${color}; top: -${font_w/3}px; left: ${font_h/3}px;">${x}</span>`;
        i += 2;
    }
}

function pause() {
    alert("PACMAN ;] is paused. Click 'Ok' to continue.")
}
function font_loaded() {
    console.log("Fixing size");
    fix_size();
    draw_grid(1);
    for(var x = 0; x < 4250; x += 250) {
        window.setTimeout(message, x, x % 500 ? "READY!" : "", "#ff0");
        window.setTimeout(fix_size, x);
    }
    window.setTimeout(() => move_interval = window.setInterval(lets_move, 250), 4250)
}

function set_level(n) {
    localStorage.setItem("pac_level", n);
    localStorage.setItem("pac_score", 0);
    window.location.reload();
}
