function $(q, e = document) { return e.querySelector(q) }
function $$(q, e = document) { return e.querySelectorAll(q) }
var scr = $("#screen");

var grid = []
var st = ""
for(var x = 0; x < 30; x += 1) { // 30 lines
    grid.push([])
    st += "<tr>"
    for(var y = 0; y < 40; y += 1) {
         grid[x].push(" ") // 40 columns
         st += "<td></td>"
    }
    st += "</tr>"
}

scr.innerHTML = st;


var pX = 20;
var pY = 15;
var dpX = 0;
var dpY = 0;
var diX = 0;
var diY = 0;
var diP = "";
var blocked = false;
var changed_level = true;
var s2s_offset = 17;
var on_lvl = 100;
var sel_lvl = 0;
var died = 0;
var start_time = 0;
var transitioning = false;
var coins_collected = 0;
var last_direction = 0

function player_blink(thing = 0) {
    for(var player of $$(".player"))
        if(thing)
            player.classList.add("a1")
        else
            player.classList.remove("a1")
    window.setTimeout(player_blink, thing ? 300 : 700, !thing)
}
// player_blink();

function write(x, y, st) {
    if(y < 0)
        y += grid.length
    var in_html = false
    for(var s of st) {
        if(s == "\n" || x == 40) {
            x = 0
            y += 1
            if(s == "\n")
                continue
        }
        if(s == ";") {
            in_html = false
            grid[y][x] += s;
            x += 1
        } else if(s == "&") {
            in_html = true
            grid[y][x] = s;
        } else if(in_html) {
            grid[y][x] += s;
        } else {
            grid[y][x] = s;
            x += 1;
        }
    }
    return [x, y]
}

function wscroll(st, d = 0) {
    st = st.replace(/\&Lambda\;/g, "\u039b");
    last_direction = d
    switch(d) {
        case 0: // Scroll up
            scr.append(scr.rows[0]);
            grid = grid.slice(1).concat([st.split("")])
            draw_screen([29])
            break;
        case 1: // Scroll down
            scr.insertAdjacentElement("afterbegin", scr.rows[29]);
            grid = [st.split("")].concat(grid.slice(0, -1))
            draw_screen([0])
            break;
        case 2: // Scroll left
            for(var row of scr.rows) {
                row.append(row.cells[0])
                grid[row.rowIndex] = grid[row.rowIndex].slice(1).concat([st[row.rowIndex]]);
            }
            draw_screen([], [39])
            break;
        case 3: // Scroll right
            for(var row of scr.rows) {
                row.insertAdjacentElement("afterbegin", row.cells[39]);
                grid[row.rowIndex] = [st[row.rowIndex]].concat(grid[row.rowIndex].slice(0, -1));
            }
            draw_screen([], [0])
            break;
    }
}

function wtime(x, y, st) {
    if(!st)
        return
    [x, y] = write(x, y, st.split("\n")[0] + "\n")
    draw_screen()
    window.setTimeout((x, y, st) => wtime(x, y, st), st.split("\n")[0] ? 25 : 0, x, y, st.split("\n").slice(1).join("\n"))
}

function draw_screen(do_rows = [], do_cols = []) {
    var grid2 = []
    for(var y of grid) {
        grid2.push(y.slice())
    }
    pY = Math.min(29, Math.max(0, pY)); // 0 <= pY <= 29
    pX = Math.min(39, Math.max(0, pX))
    if(died != 100 && died != 200)
        grid2[pY][pX] = "7"
    if(grid[pY][pX] == "~") {
        coins_collected += 1
        grid[pY][pX] = " "
    }
//     console.log(grid2, pX, pY)
    if(!do_rows.length)
        for(var y = 0; y < grid2.length; y += 1)
            do_rows.push(y)
    do_rows.push(pY, pY - 1, pY + 1)
    if(!do_cols.length)
        for(var x = 0; x < grid2[0].length; x += 1)
            do_cols.push(x)
    do_cols.push(pX, pX + 1, pX - 1)

    for(var y of do_rows) {
        if(y == -1 || y == 30)
            continue
        for(var x of do_cols) {
            if(x == -1 || x == 40)
                continue
            try {
                var s = grid2[y][x]
            } catch(err) {
                console.log(y, x)
                console.error(err)
                continue
            }
            if(s == scr.rows[y].cells[x].textContent)
                continue
            switch(s) {
                case ">":
                case "<":
                case "^":
                case "\u039b":
                case "&Lambda;":
                case "V":
                    scr.rows[y].cells[x].innerHTML = "<span class='death'>" + s + "</span>";
                    break;
                case "7":
                case "7_":
                case "7/":
                    scr.rows[y].cells[x].innerHTML = `<span class='player'>${s.slice(-1)[0]}</span>`;
                    break;
                case "~":
                    scr.rows[y].cells[x].innerHTML = "<span class='coin'>~</span>";
                    break;
                case "]":
                case "[":
                case ":":
                case "-":
                case "=":
                    scr.rows[y].cells[x].innerHTML = "<span class='blank'>" + s + "</span>"
                    break;
                default:
                    scr.rows[y].cells[x].innerHTML = "<span class='white'>" + s + "</span>";
            }
        }
    }
    if(!transitioning && "<>^&Lambda;V\u039b".includes(grid[pY][pX]) && on_lvl != 100) {
        died = 1;
        diX = pX
        diY = pY
        diP = grid[pY][pX]
    }
}

draw_screen()

window.onkeydown = (evt) => {
    if(blocked || transitioning || died && died != 200)
        return;
    if(died == 200)
        welcome()
    switch(evt.key) {
        case "ArrowUp":
        case "w":
        case "W":
            if(pY > 0)
                pY -= 1;
            draw_screen();
            break;
        case "ArrowDown":
        case "s":
        case "S":
            if(pY < grid.length - 1)
                pY += 1;
            draw_screen();
            break;
        case "ArrowLeft":
        case "a":
        case "A":
            if(pX > 0)
                pX -= 1;
            draw_screen();
            break;
        case "ArrowRight":
        case "d":
        case "D":
            if(pX < grid[0].length - 1)
                pX += 1;
            draw_screen();
            break;
    }
}

welcome_t_o = 0;
function welcome(x = 0) {
    if(x < 15) {
        died = 100
        window.setTimeout((x) => {
            write(0, x, "]]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[");
            write(0, -x - 1, "]]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[");
            draw_screen();
            welcome(x + 1);
        }, 25, x);
        return
    }
    if(x < 30) {
        died = 100
        window.setTimeout((x) => {
            x -= 15
            write(0, x, "                                        ");
            write(0, -x - 1, "                                        ");
            draw_screen();
            welcome(x + 16);
        }, 25, x);
        return
    }
    pX = 20;
    pY = 15;
    dpX = 0;
    dpY = 0;
    blocked = false;
    changed_level = true;
    s2s_offset = 17;
    on_lvl = 100;
    sel_lvl = 0;
    died = 0;
    start_time = 0;
    transitioning = false;
    coins_collected = 0;
    if(welcomed) {
        died = 0
        level_select();
        start_time = new Date();
        return
    }
    pX = 25
    pY = 0
    wtime(0, 0, `============] WELCOME TO   [============
A game based on Undertale's fight system



]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[[
          In an endless world,
          you are the only one
            WITH ENDLESS FUN
]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[[





Don't touch any sharp things [<^>&Lambda;V]

Move around with arrow keys, or WASD
Pause with [SPACE]

Collect sparks [~] they're cute

Also, epilepsy warning, lots of blinking

*game still in dev



===========] GO AND COLLECT [===========
==========] YOUR FIRST SPARK [==========
`)
    draw_screen();
    welcome_t_o = window.setInterval(() => {
        if(pX == 16 && pY == 20) {
            window.clearInterval(welcome_t_o);
            level_select();
            start_time = new Date();
            welcomed = true
        }
    }, 50);
}

function transition(dont = 0) {
    transitioning = true
    if(grid.toString().replace(/ *, */g,'')) {
        wscroll("                                        ", last_direction);
        return window.setTimeout(transition, 25, dont);
    }
    if((pX != 20 || pY != 15) && !dont) {
        pX += Math.sign(20 - pX);
        pY += Math.sign(15 - pY);
        draw_screen();
        return window.setTimeout(transition, 25, dont);
    }
    transitioning = false;
    level_select();
}


function level_select() {
    if(!died && on_lvl > Math.random() * 60 + 30) {
        sel_lvl = Math.floor(Math.random() * 7)
        on_lvl = 0;
        changed_level = true;
        transition();
        return
    }
    if(transitioning)
        return
    on_lvl += 1
    switch(sel_lvl + died * 100) {
        case 0:
        case 1:
        case 2:
        case 3:
            level_side_to_side(0, 3 - sel_lvl);
            break;
        case 4:
        case 5:
        case 6:
        case 7:
            level_particles(0, 7 - sel_lvl);
            break;
        default:
            pX = diX
            pY = diY
            death_screen();
            died += 1
    }
}

function death_screen() {
    if(died == 1) {
        transitioning = true;
        dpY = 0
        dpX = 0
        for(var x = 0; x < 25; x += 1) {
            window.setTimeout((n) => {
                $(".player").innerHTML = n ? "*%X#;/"[Math.floor(Math.random() * 6)] : grid[pY][pX];
            }, 50 * x, x % 2)
        }
        window.setTimeout(() => { blocking = false; transition(1) }, x * 50, 1);
        return
    }
    console.log(died, "died");
    if(pX > 35 || pY < 5) {
        pX -= (pX > 35);
        pY += (pY < 5);
        draw_screen();
        window.setTimeout(death_screen, 25)
    } else if( (pX + dpX != 39) || (pY + dpY) ) {
        died = 100
        grid[pY + dpY][pX] = " "
        grid[pY][pX + dpX] = " "
        if(pX + dpX != 39) {
            dpX += 1
            grid[pY][pX + dpX] = "7/"
        }
        if(pY + dpY) {
            dpY -= 1
            grid[pY + dpY][pX] = "7_"
        }
        draw_screen();
        window.setTimeout(death_screen, 150 - 7 * Math.max(40 - pX - dpX, pY + dpY))
    } else {
        grid[pY + dpY][pX] = " "
        grid[pY][pX + dpX] = " "
        var s = Math.floor(Number(new Date() - start_time) / 1000);
        var m = Math.floor(s / 60);
        s = s % 60;
        died = 200
        wtime(0, 0, `==============] YOU DIED [==============
You survived for ${m}:${(s + "").padStart(2, '0')}




]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[[
          All good things must
          come to an end, even
            YOUR ENDLESS FUN
]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[[







You touched a sharp thing [${diP}] ouch

You collected ${coins_collected} spark${coins_collected == 1 ? '' : 's'} [~]







==========] PRESS ANY KEY TO [==========
=============] PLAY AGAIN [=============`);
    }

}

function level_side_to_side(dont, direction) {
    if(changed_level) {
        changed_level = false;
        for(var x = 0; x < (direction < 2 ? 30 : 40); x += 1) {
            window.setTimeout(() => {
                level_side_to_side(1, direction);
                blocked = true
            }, 25 * x);
        }
        window.setTimeout(level_select, 25 * x);
        return
    }
    if(dont) {
        s2s_offset = Math.floor(Math.random() * 2) + 17
    } else {
        s2s_offset += 2 - Math.floor(Math.random() * 5)
        s2s_offset = Math.min(direction < 2 ? 35 : 25 , Math.max(5, s2s_offset))
    }
    if(direction >= 2) {
        switch(Math.floor(Math.random() * 20)) {
            case 0:
                var st = "-----------------------------VV~   \u039b\u039b-----------------------------";
                break;
            case 1:
                var st = "-----------------------------VV ~  \u039b\u039b-----------------------------";
                break;
            case 2:
                var st = "-----------------------------VV  ~ \u039b\u039b-----------------------------";
                break;
            case 3:
                var st = "-----------------------------VV   ~\u039b\u039b-----------------------------";
                break;
            default:
                var st = "-----------------------------VV    \u039b\u039b-----------------------------";
        }
    } else {
        switch(Math.floor(Math.random() * 20)) {
            case 0:
                var st = "]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]>>~   <<[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[";
                break;
            case 1:
                var st = "]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]>> ~  <<[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[";
                break;
            case 2:
                var st = "]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]>>  ~ <<[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[";
                break;
            case 3:
                var st = "]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]>>   ~<<[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[";
                break;
            default:
                var st = "]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]>>    <<[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[";
        }
    }
    wscroll(st.slice(s2s_offset, s2s_offset + (direction < 2 ? 40 : 30)), direction)
    if(!dont) {
        window.setTimeout(level_select, 500);
        window.setTimeout(() => blocked = false, 500);
    }

}

function level_particles(dont, direction) {
    if(changed_level) {
        changed_level = false;
        for(var x = 0; x < (direction < 2 ? 30 : 40); x += 1) {
            window.setTimeout(() => {
                level_particles(1, direction);
                blocked = true
            }, 25 * x);
        }
        window.setTimeout(level_select, 25 * x);
        return
    }
    var st = " ".repeat(direction < 2 ? 40 : 30)
    var q = ""
    switch(direction) {
        case 0:
            q = "\u039b";
            break;
        case 1:
            q = "V";
            break;
        case 2:
            q = "<";
            break;
        case 3:
            q = ">";
            break;
    }
    for(var z = 0; z < Math.floor(Math.random() * 12) + 8; z += 1) {
        var n = Math.floor(Math.random() * st.length)
        st = st.slice(0, n) + "-.,*+"[Math.floor(Math.random() * 5)] + st.slice(n + 1)
    }
    for(var z = 0; z < Math.floor(Math.random() * 3); z += 1) {
        var n = Math.floor(Math.random() * st.length)
        st = st.slice(0, n) + "~" + st.slice(n + 1)
    }
    for(var z = 0; z < Math.floor(Math.random() * 4) + 3; z += 1) {
        var n = Math.floor(Math.random() * st.length)
        while(dont && ((n > 13 && n < 17 && direction > 1) || (n > 18 && n < 22 && direction < 2)))
            n = Math.floor(Math.random() * st.length)
        st = st.slice(0, n) + q + st.slice(n + 1)
    }

    wscroll(st, direction)
    if(!dont) {
        window.setTimeout(level_select, 500);
        window.setTimeout(() => blocked = false, 500);
    }

}

welcomed = false
welcome()
