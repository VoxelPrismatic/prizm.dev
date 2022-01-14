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
    switch(d) {
        case 0: // Scroll up
            scr.append(scr.rows[0]);
            grid = grid.slice(1).concat([st.split("")])
            break;
        case 1: // Scroll down
            scr.insertAdjacentElement("afterbegin", scr.rows[29]);
            grid = [st.split("")].concat(grid.slice(1))
            break;
        case 2: // Scroll left
            for(var row of scr.rows) {
                row.append(row.cells[0])
                grid[row.rowIndex] = grid[row.rowIndex].slice(1).concat([st[row.rowIndex]]);
            }
            break;
        case 3: // Scroll right
            for(var row of scr.rows) {
                row.insertAdjacentElement("afterbegin", row.cells[39]);
                grid[row.rowIndex] = [st[row.rowIndex]].concat(grid[row.rowIndex].slice(1));
            }
            break;
    }
    last_direction = d
    draw_screen();
}

function wtime(x, y, st) {
    if(!st)
        return
    [x, y] = write(x, y, st.split("\n")[0] + "\n")
    draw_screen()
    window.setTimeout((x, y, st) => wtime(x, y, st), 25, x, y, st.split("\n").slice(1).join("\n"))
}

function draw_screen() {
    var grid2 = []
    for(var y of grid) {
        grid2.push(y.slice())
    }
    if(died != 100 && died != 200)
        grid2[pY][pX] = "7"
    if(grid[pY][pX] == "O") {
        coins_collected += 1
        grid[pY][pX] = " "
    }
//     console.log(grid2, pX, pY)
    for(var y = 0; y < grid2.length; y += 1) {
        for(var x = 0; x < grid2[y].length; x += 1) {
            var s = grid2[y][x]
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
                case "O":
                    scr.rows[y].cells[x].innerHTML = "<span class='coin'>O</span>";
                    break;
                case "]":
                case "[":
                case ":":
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
        case "d":
        case "D":
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
    if(x < 15) {
        window.setTimeout((x) => {
            write(0, x, "]]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[");
            write(0, -x - 1, "]]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[");
            draw_screen();
            welcome(x + 1);
        }, 25, x);
        return
    }
    if(x < 30) {
        window.setTimeout((x) => {
            x -= 15
            write(0, x, "                                        ");
            write(0, -x - 1, "                                        ");
            draw_screen();
            welcome(x + 16);
        }, 25, x);
        return
    }
    wtime(0, 0, `============] Welcome to 7 [============
A game based on Undertale's fight system

Don't touch any sharp things [<^>&Lambda;V]

Move around with arrow keys, or WASD

Pause with [SPACE]

Collect coins [O]
Start by collecting that one!`)
    draw_screen();
    welcome_t_o = window.setInterval(() => {
        if(pX == 15 && pY == 9) {
            window.clearInterval(welcome_t_o);
            level_select();
            start_time = new Date();
        }
    }, 100);
}

function transition(dont = 0) {
    transitioning = true
    if(grid.toString().replace(/ *, */g,'')) {
        wscroll("                                        ", last_direction);
        return window.setTimeout(transition, 25, dont);
    }
    if(pX != 20 && pY != 15 && !dont) {
        pX += Math.sign(20 - pX);
        pY += Math.sign(15 - pY);
        draw_screen();
        return window.setTimeout(transition, 25, dont);
    }
    transitioning = false;
    level_select();
}


function level_select() {
    if(on_lvl > Math.random() * 60 + 30) {
        transition();
        sel_lvl = Math.floor(Math.random() * 3)
        on_lvl = 0;
        changed_level = true;
        return
    }
    if(transitioning)
        return
    on_lvl += 1
    switch(sel_lvl + died * 100) {
        case 0:
            level_side_to_side(0, 0);
            break;
        case 1:
            level_side_to_side(0, 1);
            break;
        case 2:
            level_side_to_side(0, 2);
            break;
        case 3:
            level_side_to_side(0, 3);
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
        window.setTimeout(() => { blocking = false; transition() }, x * 50, 1);
        return
    }
    console.log(died, "died");
    if(pX > 35 || pY < 5) {
        pX -= (pX > 35);
        pY -= (pY < 5);
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
        wtime(0, 0, `==============] You died [==============
You survived for ${m}:${(s + "").padStart(2, '0')}

You collected ${coins_collected} coin${coins_collected == 1 ? '' : 's'}

Press any key to play again`);
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
        s2s_offset = Math.min(35, Math.max(5, s2s_offset))
    }
    if(direction >= 2) {
        switch(Math.floor(Math.random() * 30)) {
            case 0:
                var st = "-----------------------------VVO   \u039b\u039b-----------------------------";
                break;
            case 1:
                var st = "-----------------------------VV O  \u039b\u039b-----------------------------";
                break;
            case 2:
                var st = "-----------------------------VV  O \u039b\u039b-----------------------------";
                break;
            case 3:
                var st = "-----------------------------VV   O\u039b\u039b-----------------------------";
                break;
            default:
                var st = "-----------------------------VV    \u039b\u039b-----------------------------";
        }
    } else {
        switch(Math.floor(Math.random() * 30)) {
            case 0:
                var st = "]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]>>O   <<[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[";
                break;
            case 1:
                var st = "]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]>> O  <<[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[";
                break;
            case 2:
                var st = "]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]>>  O <<[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[";
                break;
            case 3:
                var st = "]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]>>   O<<[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[";
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

welcome()
