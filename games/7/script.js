function $(q, e = document) { return e.querySelector(q) }
function $$(q, e = document) { return e.querySelectorAll(q) }
var scr = $("#screen");
var music = $("audio");
var music_fmt = ".mp3";
var debug = false;
var files = [
    "Born", "Died", "Spike", "Spark", "Alive", "Struggle", "Survived", "Retro"
]
music.onerror = (evt) => {
    if(evt.target.src.endsWith(".ogg")) {
        music_fmt = ".mp3"
        for(var file of files)
            fetch("music/7 - " + file + ".ogg")
        evt.target.onerror = null
    }
}
music.onplay = (evt) => {
    evt.target.onerror = null
}
if(music.canPlayType("audio/ogg;codecs=vorbis")) {
    music_fmt = ".ogg"
    for(var file of files)
        fetch("music/7 - " + file + ".ogg")
}
music.src = "music/7 - Born" + music_fmt
music.onended = () => {
    var music = $("audio");
    switch(music.src.split("7%20-%20")[1]) {
        case "Died.mp3":
        case "Died.ogg":
            break;
        case "Born.mp3":
        case "Born.ogg":
        case "Spike.mp3":
        case "Spike.ogg":
            music.currentTime = 0;
            music.play();
            break;
        default:
            var ost = [
                "Spark" + music_fmt,
                "Alive" + music_fmt,
                "Struggle" + music_fmt,
                "Survived" + music_fmt,
                "Retro" + music_fmt
            ];
            music.src = "music/7 - " + ost[Math.floor(Math.random() * ost.length)]
            music.currentTime = 0;
            music.play();
            break;
    }
}

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
var start_time = new Date();
var transitioning = false;
var coins_collected = 0;
var last_direction = 0;
var game_paused = false;
var pause_grid = [];
var block_space = false;
var allowedX = [];
var allowedY = [];
var bird_blank = 0;

function reset_allowed() {
    for(var z = 0; z < 40; z += 1) {
        allowedX.push(z);
        allowedY.push(z);
    }
    allowedY = allowedY.slice(0, -10);
}
reset_allowed();

function bg_music(val) {
    music.play();
    music.volume = Number(val);
    localStorage.setItem("7_volume", val);
}

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
        if(s == ";" && in_html) {
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
    if(st.split("\n")[0]) {
        [x, y] = write(x, y, st.split("\n")[0] + "\n")
        draw_screen([y - 1])
    } else {
        y += 1
    }
    window.setTimeout((x, y, st) => wtime(x, y, st), st.split("\n")[0].trim() ? 25 : 0, x, y, st.split("\n").slice(1).join("\n"))
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
        coins_collected += 1;
        $("#coin_counter").innerHTML = coins_collected;
        if(coins_collected > max_sparks) {
            max_sparks = coins_collected;
            localStorage.setItem("7_max_sparks", max_sparks);
            $("#coin_counter").innerHTML += " [+]";
        }
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
                case "SX":
                    scr.rows[y].cells[x].innerHTML = "<span class='death'>X</span>";
                    break;
                case "\u221d":
                    scr.rows[y].cells[x].innerHTML = "<span class='troll' style='transform:scale(-1,1)'>C</span>";
                    break;
                case "\u221c":
                    scr.rows[y].cells[x].innerHTML = "<span class='troll'>C</span>";
                    break;
                case "\u221b":
                    scr.rows[y].cells[x].innerHTML = "<span class='troll'>U</span>";
                    break;
                case "\u221a":
                    scr.rows[y].cells[x].innerHTML = "<span class='troll' style='transform:scale(1,-1)'>U</span>";
                    break;
                case "CX":
                    scr.rows[y].cells[x].innerHTML = "<span class='troll'>O</span>";
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
                case "ǁ":
                case "|":
                case "+":
                case "—":
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
var max_sparks = Number(localStorage.getItem("7_max_sparks") || 0);
var max_time = Number(localStorage.getItem("7_max_time") || 0);
window.setInterval(() => {
    if(game_paused || died || !welcomed)
        return
    var s = Math.floor(Number(new Date() - start_time) / 1000);
    var m = Math.floor(s / 60);
    s = s % 60;
    $("#alive").innerHTML = `${m}:${(s + "").padStart(2, '0')}`;
    if(m * 60 + s > max_time) {
        max_time = m * 60 + s;
        localStorage.setItem("7_max_time", max_time);
        $("#alive").innerHTML += " [+]";
    }
}, 1000)

window.onkeydown = (evt, k = "") => {
    if(blocked || transitioning || died && died != 200)
        return;
    if(died == 200) {
        if(k == " " || k == "Enter" || evt.key == " " || evt.key == "Enter")
            welcome()
        else
            return
    } else {
        player_grid = [[Math.max(0, pY - 1), pY, Math.max(grid.length, pY + 1)], [Math.max(0, pX - 1), pX, Math.max(grid[0].length, pX + 1)]]
        switch(k || evt.key) {
            case "ArrowUp":
            case "w":
            case "W":
                if(allowedY.includes(pY - 1)) {
                    draw_screen(...player_grid)
                    pY -= 1;
                    $(".player").style.top = -$(".player").getBoundingClientRect().height + "px";
                    window.setTimeout(draw_screen, 100, [pY], [pX])
                }
                break;
            case "ArrowDown":
            case "s":
            case "S":
                if(allowedY.includes(pY + 1)) {
                    draw_screen(...player_grid)
                    pY += 1;
                    $(".player").style.top = $(".player").getBoundingClientRect().height + "px";
                    window.setTimeout(draw_screen, 100)
                }
                break;
            case "ArrowLeft":
            case "a":
            case "A":
                if(allowedX.includes(pX - 1)) {
                    draw_screen(...player_grid)
                    pX -= 1;
                    $(".player").style.left = -$(".player").getBoundingClientRect().width + "px";
                    window.setTimeout(draw_screen, 100)
                }
                break;
            case "ArrowRight":
            case "d":
            case "D":
                if(allowedX.includes(pX + 1)) {
                    draw_screen(...player_grid)
                    pX += 1;
                    $(".player").style.left = $(".player").getBoundingClientRect().width + "px";
                    window.setTimeout(draw_screen, 100)
                }
                break;
                break;
            case " ":
                if(!block_space) {
                    game_paused = !game_paused
                    pause_screen();
                    block_space = true
                }
                break;
            case "j":
                debug = Number(window.prompt("Which level do you want to test?\n1] Road\n2] Particles\n3] 1-D Lasers\n4] 2-D Lasers\n5] Mines\n6] Flappy Bird"));
                break;
            case "Enter":
                if(game_paused && !block_space) {
                    game_paused = !game_paused
                    pause_screen();
                    block_space = true
                    return
                }
                if(welcomed)
                    return
                pX = 16
                pY = 20
                break;
            default:
                return
        }
    }
    if(evt) {
        evt.preventDefault();
        $("#joystick").style.transform = "scale(0)"
    }
}

welcome_t_o = 0;
function welcome(x = 0) {
    transitioning = true;
    block_space = true;
    if(!welcomed) {
        died = 100
        if(x < 30) {
            for(var z = 0; z < 15; z += 1) {
                window.setTimeout((n) => {
                    write(0, n, "]]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[");
                    write(0, -n - 1, "]]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[");
                    draw_screen([n, grid.length - n - 1]);
                }, 25 * z, z)
                window.setTimeout((n) => {
                    write(0, n, "                                        ");
                    write(0, -n - 1, "                                        ");
                    draw_screen([n, grid.length - n - 1]);
                }, 25 * (z + 5), z)
            }
            window.setTimeout(welcome, (z + 6) * 25, 30)
            return
        }
    } if(dpX || dpY) {
//         console.log(pX, pY, dpX, dpY, diX, diY)
        if(x < 30) {
            died = 100
            pX = diX
            pY = diY
            diX = 0
            diY = 0
            for(var z = 0; z < 15; z += 1) {
                window.setTimeout((n) => {
                    write(0, n, "]]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[");
                    write(0, -n - 1, "]]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[");
                    draw_screen([n, grid.length - n - 1]);
                }, 25 * z, z)
                window.setTimeout((n) => {
                    write(0, n, "                                        ");
                    write(0, -n - 1, "                                        ");
                    draw_screen([n, grid.length - n - 1]);
                }, 25 * (z + 5), z)
            }
            window.setTimeout(welcome, (z + 6) * 25, 30)
            return
        }
        grid[pY + dpY][pX] = " "
        grid[pY][pX + dpX] = " "
        if(dpX >= -dpY) {
            dpX -= 1 * diX
            diX = 1
            grid[pY][pX + dpX] = "7/"
        }
        if(dpX <= -dpY) {
            dpY += 1 * diY
            diY = 1
            if(!diX) {
                diX = 1
                grid[pY][pX + dpX] = "7/"
            }
            grid[pY + dpY][pX] = "7_"
        }
        if(!dpX && !dpY) {
            grid[pY][pX] = " "
            died = 0
        }
        draw_screen();
        window.setTimeout(welcome, 100 - 7 * Math.max(dpX, -dpY), 31)
        return
    }
    dpX = 0;
    dpY = 0;
    blocked = false;
    changed_level = true;
    s2s_offset = 17;
    on_lvl = 100;
    sel_lvl = 0;
    died = 0;
    start_time = new Date();
    transitioning = false;
    coins_collected = 0;
    bird_blank = 0;
    if(welcomed) {
        music.src = "hi.mp3"
        music.onended();
        start_time = new Date();
        level_select();
        block_space = false;
        return
    }
    pX = 25
    pY = 0
    wtime(0, 0, `============] WELCOME TO   [============

A simple, yet endlessly addicting game


]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[[
          In an endless world,
          you are the only one
            WITH ENDLESS FUN
]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[[

——————————] EPILEPSY WARNING [——————————



Don't touch any spikes [<>&Lambda;V]

Move around with arrow keys, or WASD
Pause with [SPACE]

Collect sparks [~] they're cute



Adjust the slider for the epic BG music!

————————————] STILL IN DE&#x56; [————————————

===========] GO AND COLLECT [===========
==========] YOUR FIRST SPARK [==========
`)
    transitioning = false
    welcome_t_o = window.setInterval(() => {
        if(pX == 16 && pY == 20) {
            window.clearInterval(welcome_t_o);
            level_select();
            start_time = new Date();
            welcomed = true
            music.src = "hi.mp3"
            music.onended();
            music.currentTime = 0
            block_space = false;
        }
    }, 25);
}

function pause_screen(x = 0) {
    block_space = true
    if(!transitioning) {
        music.src = "music/7 - Spike" + music_fmt;
        music.currentTime = 0;
        transitioning = true
        died = 100
        if(game_paused) {
            diX = pX
            diY = pY
            start_time -= Number(new Date())
            pause_grid = []
            for(var row of grid)
                pause_grid.push(row.slice())
        } else {
            pX = diX
            pY = diY
        }
    }
    if(x < 30) {
        for(var z = 0; z < 15; z += 1) {
            window.setTimeout((n) => {
                write(0, n, "V".repeat(40));
                write(0, -n - 1, "\u039b".repeat(40));
                draw_screen([n, grid.length - n - 1]);
            }, 25 * z, z)
            window.setTimeout((n) => {
                write(0, n, "                                        ");
                write(0, -n - 1, "                                        ");
                draw_screen([n, grid.length - n - 1]);
            }, 25 * (z + 5), z)
        }
        window.setTimeout(pause_screen, (z + 6) * 25, 30)
        return
    }
    died = 0
    transitioning = false
    if(game_paused) {
        wtime(0, 0, `===============] PAUSED [===============




]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[[
          In the rift of space,
          you are the only one
            CONTROLLING TIME
]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[[



















========] HIT SPACE TO UNPAUSE [========
`)
        block_space = false;
    } else {
        for(var x = 0; x < grid.length / 2; x += 1) {
            window.setTimeout((n) => {
                m = grid.length - 1 - n
                grid[n] = pause_grid[n].slice()
                grid[m] = pause_grid[m].slice()
                draw_screen([m, n])
            }, 25 * x, grid.length / 2 - x - 1)
        }
        window.setTimeout(() => {
            start_time += Number(new Date())
            level_select();
            music.src = "hi.mp3";
            music.onended();
            block_space = false;
        }, 25 * (x + 5))
    }
}

function transition(dont = 0, tX = 20, tY = 15, scr = 1) {
    transitioning = true
    if(scr && grid.toString().replace(/ *, */g,'')) {
        wscroll("                                        ", last_direction);
        return window.setTimeout(transition, 25, dont, tX, tY, scr);
    }
    if((pX != tX || pY != tY) && !dont) {
        pX += Math.sign(tX - pX);
        pY += Math.sign(tY - pY);
        draw_screen();
        return window.setTimeout(transition, 25, dont, tX, tY, scr);
    }
    transitioning = false;
    level_select();
}

var num_levels = 6
function level_select() {
    if(transitioning || game_paused)
        return
    if(!died && on_lvl > Math.random() * 60 + 30) {
        reset_allowed();
        if(debug)
            sel_lvl = Math.floor(Math.random() * 4) + 4 * (debug - 1)
        else
            sel_lvl = Math.floor(Math.random() * 4 * num_levels)
//          sel_lvl = 19
        on_lvl = 0;
        changed_level = true;
        transition();
        return
    }
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
        case 8:
        case 9:
        case 10:
        case 11:
            level_lasers(0, 11 - sel_lvl);
            break;
        case 12:
        case 13:
        case 14:
        case 15:
            level_boxed_lasers(0);
            break;
        case 16:
        case 17:
        case 18:
        case 19:
            level_ball(0);
            break;
        case 20:
        case 21:
        case 22:
        case 23:
            level_flappy_bird(0, 23 - sel_lvl);
            break;
        default:
            pX = diX
            pY = diY
            death_screen();
            died += 1
    }
}

function death_screen() {
    block_space = true
    if(died == 1) {
        music.src = "music/7 - Died" + music_fmt;
        music.currentTime = 0;
        transitioning = true;
        dpY = 0;
        dpX = 0;
        for(var x = 0; x < 25; x += 1) {
            window.setTimeout((n) => {
                $(".player").innerHTML = n ? "*%X#;/"[Math.floor(Math.random() * 6)] : grid[pY][pX];
            }, 50 * x, x % 2)
        }
        window.setTimeout(() => { blocking = false; transition(1) }, x * 50, 1);
        return
    }
//     console.log(died, "died");
    if(pX > 35 || pY < 5) {
        transitioning = true;
        pX -= (pX > 35);
        pY += (pY < 5);
        draw_screen();
        window.setTimeout(death_screen, 25)
    } else if( (pX + dpX < 39) || (pY + dpY) ) {
        died = 100
        grid[pY + dpY][pX] = " "
        grid[pY][pX + dpX] = " "
        if(pX + dpX < 39) {
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
        music.src = "music/7 - Spike" + music_fmt;
        music.currentTime = 0;
        transitioning = true;
        grid[pY + dpY][pX] = " "
        grid[pY][pX + dpX] = " "
        diX = pX
        diY = pY
        died = 200
        wtime(0, 0, `==============] YOU DIED [==============

You survived for ${$("#alive").innerHTML}


]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[[
          All good things must
          come to an end, even
            YOUR ENDLESS FUN
]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[[[

      +======] CREDITS TO [======+
      ǁ Game: PRIZ ;]            ǁ
      ǁ Music: PRIZ ;] &amp; Björken ǁ
      +==========================+




You touched a spike [${diP}] ouch

You collected ${coins_collected} spark${coins_collected == 1 ? '' : 's'} [~]



DM me @&#x56;oxelPrismatic on Twitter for any
suggestions

${$('#joystick').style.transform != 'scale(1)' ? '===========] PRESS SPACE TO [===========' : '==========] TAP PLAYFIELD TO [=========='}
=============] PLAY AGAIN [=============`);
        window.setTimeout(() => transitioning = false, 1000)
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
                var st = "—————————————————————————————VV~   \u039b\u039b—————————————————————————————";
                break;
            case 1:
                var st = "—————————————————————————————VV ~  \u039b\u039b—————————————————————————————";
                break;
            case 2:
                var st = "—————————————————————————————VV  ~ \u039b\u039b—————————————————————————————";
                break;
            case 3:
                var st = "—————————————————————————————VV   ~\u039b\u039b—————————————————————————————";
                break;
            default:
                var st = "—————————————————————————————VV    \u039b\u039b—————————————————————————————";
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
            q = "\u039b\u221a";
            break;
        case 1:
            q = "V\u221b";
            break;
        case 2:
            q = "<\u221c";
            break;
        case 3:
            q = ">\u221d";
            break;
    }
    for(var z = 0; z < Math.floor(Math.random() * 12) + 8; z += 1) {
        var n = Math.floor(Math.random() * st.length)
        st = st.slice(0, n) + "-.,*'"[Math.floor(Math.random() * 5)] + st.slice(n + 1)
    }
    for(var z = 0; z < Math.floor(Math.random() * 3); z += 1) {
        var n = Math.floor(Math.random() * st.length)
        st = st.slice(0, n) + "~" + st.slice(n + 1)
    }
    var tm = Math.ceil((Number(new Date()) - start_time) / 60000) + 4;
    for(var z = 0; z < Math.floor(Math.random() * tm) + 3; z += 1) {
        var n = Math.floor(Math.random() * st.length)
        while(dont && ((n > 13 && n < 17 && direction > 1) || (n > 18 && n < 22 && direction < 2)))
            n = Math.floor(Math.random() * st.length)
        st = st.slice(0, n) + (Math.floor(Math.random() * 16) ? q[0] : q[1]) + st.slice(n + 1)
    }

    wscroll(st, direction)
    if(!dont) {
        window.setTimeout(level_select, 500);
        window.setTimeout(() => blocked = false, 500);
    }

}

function level_lasers(dont, direction) {
    if(changed_level) {
        changed_level = false;
        for(var x = 0; x < (direction < 2 ? 17 : 12); x += 1) {
            window.setTimeout((x, direction) => {
                if(direction < 2) {
                    if(x == 16)
                        var st = "]["
                    else
                        var st = "=="
                    var k = grid[0].length - x - 1
                    for(var z = 0; z < grid.length; z += 1) {
                        grid[z][k] = st[1];
                        grid[z][x] = st[0];
                    }
                    draw_screen([], [x, k]);
                } else {
                    if(x == 11)
                        var st = "]]]]]]]]]]]]]]]]]]]][[[[[[[[[[[[[[[[[[[["
                    else
                        var st = "========================================"
                    grid[x] = st.split("")
                    grid[grid.length - x - 1] = st.split("")
                    draw_screen([x, grid.length - x - 1]);
                }
                blocked = true
            }, 25 * x, x, direction);
        }
        window.setTimeout((direction) => {
            switch(direction) {
                case 0:
                    allowedX = [17, 18, 19, 20, 21, 22];
                    allowedY = [29];
                    last_direction = 1;
                    return transition(0, 20, 29, 0);
                case 1:
                    allowedX = [17, 18, 19, 20, 21, 22];
                    allowedY = [0];
                    last_direction = 0;
                    return transition(0, 20, 0, 0);
                case 2:
                    allowedY = [12, 13, 14, 15, 16, 17];
                    allowedX = [29];
                    last_direction = 3;
                    return transition(0, 39, 15, 0);
                case 3:
                    allowedY = [12, 13, 14, 15, 16, 17];
                    allowedX = [0];
                    last_direction = 2;
                    return transition(0, 0, 15, 0);
            }
        }, 25 * x, direction);
        return
    }
    switch(direction) {
        case 0:
            for(var aX of [17, 18, 19, 20, 21, 22])
                grid[0][aX] = " "
            break;
        case 1:
            for(var aX of [17, 18, 19, 20, 21, 22])
                grid[29][aX] = " "
            break;
        case 2:
            for(var aY of [12, 13, 14, 15, 16, 17])
                grid[aY][0] = " "
            break;
        case 3:
            for(var aY of [12, 13, 14, 15, 16, 17])
                grid[aY][29] = " "
            break;
    }
    var tm = Math.ceil((Number(new Date()) - start_time) / 300000);
    var sel_places = []
    for(var tx = 0; tx < tm; tx += 1) {
        var k = Math.floor(Math.random() * 6)
        var t = !Math.floor(Math.random() * 4)
        if(sel_places.includes(k))
            continue
        sel_places.push(k)
        for(var z = 0; z < 10; z += 1) {
            window.setTimeout((k, d, z, t) => {
                if(game_paused)
                    return
                var s = z % 2 ? (t ? "\u221b\u221a\u221d\u221c"[d] : "V\u039b><"[d]) : " "
                switch(d) {
                    case 0:
                        grid[0][17 + k] = s;
                        draw_screen([0], [17 + k]);
                        break;
                    case 1:
                        grid[grid.length - 1][17 + k] = s;
                        draw_screen([grid.length - 1], [17 + k]);
                        break;
                    case 2:
                        grid[12 + k][0] = s;
                        draw_screen([12 + k], [0]);
                        break;
                    case 3:
                        grid[12 + k][grid[0].length - 1] = s;
                        draw_screen([12 + k], [grid[0].length - 1]);
                        break;
                }
            }, 75 * z, k, direction, z, t);
        }
        var q = Math.floor(Math.random() * 12)
        if(q < 6) {
            switch(direction) {
                case 1:
                    grid[0][17 + q] = "~"
                    draw_screen([0], [17 + q]);
                    break;
                case 0:
                    grid[grid.length - 1][17 + q] = "~"
                    draw_screen([grid.length - 1], [17 + q]);
                    break;
                case 3:
                    grid[12 + q][0] = "~"
                    draw_screen([12 + q], [0]);
                    break;
                case 2:
                    grid[12 + q][grid[0].length - 1] = "~"
                    draw_screen([12 + q], [grid[0].length - 1]);
                    break;
            }
        }
        window.setTimeout((k, d, t) => {
            if(game_paused)
                return
            var s = t ? "\u221b\u221a\u221d\u221c" : "V\u039b><"
            switch(d) {
                case 0:
                    for(var w = 0; w < 30; w += 1) {
                        window.setTimeout((w, k, s) => {
                            grid[w][17 + k] = s
                            draw_screen([w], [17 + k])
                        }, w * 7, w, k, s[d])
                        window.setTimeout((w, k, t) => {
                            if(!(pX != 17 + k || w < 24 || t))
                                return
                            grid[w][17 + k] = " "
                            draw_screen([w], [17 + k])
                        }, (w + 5)* 7, w, k, t)
                    }
                    break;
                case 1:
                    for(var w = 0; w < 30; w += 1) {
                        window.setTimeout((w, k, s) => {
                            grid[w][17 + k] = s
                            draw_screen([w], [17 + k])
                        }, w * 7, grid.length - w - 1, k, s[d])
                        window.setTimeout((w, k, t) => {
                            if(!(pX != 17 + k || w > 5 || t))
                                return
                            grid[w][17 + k] = " "
                            draw_screen([w], [17 + k])
                        }, (w + 5) * 7, grid.length - w - 1, k, t)
                    }
                    break;
                case 2:
                    for(var w = 0; w < 40; w += 1) {
                        window.setTimeout((w, k, s) => {
                            grid[12 + k][w] = s
                            draw_screen([12 + k], [w])
                        }, w * 5, w, k, s[d])
                        window.setTimeout((w, k, t) => {
                            if(!(pY != 12 + k || w < 34 || t))
                                return
                            grid[12 + k][w] = " "
                            draw_screen([12 + k], [w])
                        }, (w + 5) * 5, w, k, t)
                    }
                    break;
                case 3:
                    for(var w = 0; w < 40; w += 1) {
                        window.setTimeout((w, k, s) => {
                            grid[12 + k][w] = s
                            draw_screen([12 + k], [w])
                        }, w * 5, grid[0].length - w - 1, k, s[d])
                        window.setTimeout((w, k, t) => {
                            if(pY != 12 + k || w > 5 || t)
                                grid[12 + k][w] = " "
                            draw_screen([12 + k], [w])
                        }, (w + 5) * 5, grid[0].length - w - 1, k, t)
                    }
                    break;
            }
        }, 75 * (z + 1), k, direction, t);
    }
    on_lvl += 1
    if(!dont) {
        window.setTimeout(level_select, 1075);
        window.setTimeout(() => blocked = false, 250);
    }
}

function level_boxed_lasers(dont) {
    if(changed_level) {
        changed_level = false;
        for(var x = 0; x < 20; x += 1) {
            window.setTimeout((x) => {
                if(x == 0) {
                    grid[22][30] = "+";
                    grid[8][10] = "+";
                } else if(x == 19) {
                    grid[8][30] = "+";
                    grid[8][29] = "—";
                    grid[22][10] = "+";
                    grid[22][11] = "—";
                } else {
                    grid[22 - Math.ceil(x * 14 / 20)][30] = "|";
                    grid[22][30 - x] = "—";
                    grid[8 + Math.ceil(x * 14 / 20)][10] = "|";
                    grid[8][10 + x] = "—";
                }
                draw_screen()
                blocked = true
            }, 25 * x, x);
        }
        allowedX = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
        allowedY = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
        return window.setTimeout(level_select, 25 * (x + 1))
    }
    for(var aX of allowedX.concat(9, 31)) {
        for(var aY of allowedY.concat(7, 23)) {
            grid[aY][aX] = grid[aY][aX] == "~" ? "~" : " "
        }
    }
    draw_screen()
    var sel_places = {}
    var tm = Math.ceil((Number(new Date()) - start_time) / 300000);
    for(var tx = 0; tx < Math.random() * 5 + tm; tx += 1) {
        var d = Math.floor(Math.random() * 4)
//         alert(d)
        var k = Math.floor(Math.random() * (d > 1 ? 11 : 18))
        var t = !Math.floor(Math.random() * 2)
        if(!sel_places[d])
            sel_places[d] = [k]
        else if(sel_places[d].includes(k))
            continue
        sel_places[d].push(k)
        for(var z = 0; z < 20; z += 1) {
            window.setTimeout((d, k, z, t) => {
                if(game_paused)
                    return
                var s = z % 2 ? (t ? "\u221b\u221a\u221d\u221c"[d] : "V\u039b><"[d]) : " "
                switch(d) {
                    case 0:
                        grid[7][11 + k] = s;
                        draw_screen([7], [11 + k]);
                        break;
                    case 1:
                        grid[grid.length - 7][11 + k] = s;
                        draw_screen([grid.length - 7], [11 + k]);
                        break;
                    case 2:
                        grid[11 + k][9] = s;
                        draw_screen([11 + k], [9]);
                        break;
                    case 3:
                        grid[11 + k][grid[0].length - 9] = s;
                        draw_screen([11 + k], [grid[0].length - 9]);
                        break;
                }
            }, 75 * z, d, k, z, t);
        }
        var q = Math.floor(Math.random() * 12)
        if(q < 4) {
            grid[Math.floor(Math.random() * 12) + 9][Math.floor(Math.random() * 18) + 11] = "~"
        }
        draw_screen()
        window.setTimeout((k, d, t) => {
            if(game_paused)
                return
            var s = t ? "\u221b\u221a\u221d\u221c" : "V\u039b><"
            switch(d) {
                case 0:
                    for(var w = 0; w < 13; w += 1) {
                        window.setTimeout((w, k, s) => {
                            grid[w][11 + k] = s;
                            draw_screen([w], [11 + k])
                        }, w * 15, w + 9, k, s[d])
                        window.setTimeout((w, k, t) => {
                            if(!(pX != 11 + k || pY > w + 2 || t))
                                return died = 1
                            grid[w][11 + k] = " "
                            draw_screen([w], [11 + k])
                        }, (w + 5) * 15, w + 9, k, t)
                    }
                    window.setTimeout((k) => {
                        grid[7][11 + k] = " "
                    }, (w + 5) * 15, k)
                    break;
                case 1:
                    for(var w = 0; w < 13; w += 1) {
                        window.setTimeout((w, k, s) => {
                            grid[w][11 + k] = s;
                            draw_screen([w], [11 + k])
                        }, w * 15, grid.length - w - 9, k, s[d])
                        window.setTimeout((w, k, t) => {
                            if(!(pX != 11 + k || pY < w - 2 || t))
                                return died = 1
                            grid[w][11 + k] = " "
                            draw_screen([w], [11 + k])
                        }, (w + 5) * 15, grid.length - w - 9, k, t)
                    }
                    window.setTimeout((k) => {
                        grid[grid.length - 7][11 + k] = " "
                    }, (w + 5) * 15, k)
                    break;
                case 2:
                    for(var w = 0; w < 19; w += 1) {
                        window.setTimeout((w, k, s) => {
                            grid[11 + k][w] = s
                            draw_screen([11 + k], [w])
                        }, w * 12, w + 11, k, s[d])
                        window.setTimeout((w, k, t) => {
                            if(!(pY != 11 + k || pX > w + 2 || t))
                                return died = 1
                            grid[11 + k][w] = " "
                            draw_screen([11 + k], [w])
                        }, (w + 5) * 12, w + 11, k, t)
                    }
                    window.setTimeout((k) => {
                        grid[11 + k][9] = " "
                    }, (w + 5) * 12, k)
                    break;
                case 3:
                    for(var w = 0; w < 19; w += 1) {
                        window.setTimeout((w, k, s) => {
                            grid[11 + k][w] = s
                            draw_screen([11 + k], [w])
                        }, w * 12, grid[0].length - w - 11, k, s[d])
                        window.setTimeout((w, k, t) => {
                            if(!(pY != 11 + k || pX < w - 2 || t))
                                return
                            grid[11 + k][w] = " "
                            draw_screen([11 + k], [w])
                        }, (w + 5) * 12, grid[0].length - w - 11, k, t)
                    }
                    window.setTimeout((k) => {
                        grid[11 + k][grid[0].length - 9] = " "
                    }, (w + 5) * 12, k)
                    break;
            }
        }, 75 * (z + 1), k, d, t);
    }
    on_lvl += 1
    if(!dont) {
        window.setTimeout(level_select, 2150);
        window.setTimeout(() => blocked = false, 250);
    }
}

function level_ball(dont) {
    if(changed_level) {
        changed_level = false;
        for(var x = 0; x < 20; x += 1) {
            window.setTimeout((x) => {
                if(x == 0) {
                    grid[22][30] = "+";
                    grid[8][10] = "+";
                } else if(x == 19) {
                    grid[8][30] = "+";
                    grid[8][29] = "—";
                    grid[22][10] = "+";
                    grid[22][11] = "—";
                } else {
                    grid[22 - Math.ceil(x * 14 / 20)][30] = "|";
                    grid[22][30 - x] = "—";
                    grid[8 + Math.ceil(x * 14 / 20)][10] = "|";
                    grid[8][10 + x] = "—";
                }
                draw_screen()
                blocked = true
            }, 25 * x, x);
        }
        allowedX = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
        allowedY = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
        return window.setTimeout(level_select, 25 * (x + 1))
    }
    for(var aX of allowedX) {
        for(var aY of allowedY) {
            grid[aY][aX] = grid[aY][aX] == "~" ? "~" : " "
        }
    }
    draw_screen()
    var sel_places = {}
    var tm = Math.ceil((Number(new Date()) - start_time) / 300000);
    for(var tx = 0; tx < Math.random() * 2 + tm; tx += 1) {
        var kx = Math.floor(Math.random() * 18) + 11;
        var ky = Math.floor(Math.random() * 12) + 9;
        while(kx == pX && ky == pY) {
            kx = Math.floor(Math.random() * 18) + 11;
            ky = Math.floor(Math.random() * 12) + 9;
        }
        var t = !Math.floor(Math.random() * 2)
        if(!sel_places[kx])
            sel_places[kx] = [ky]
        else if(sel_places[kx].includes(ky))
            continue
        sel_places[kx].push(ky)
        for(var z = 0; z < 20; z += 1) {
            window.setTimeout((kx, ky, z, t) => {
                if(game_paused)
                    return
                grid[ky][kx] = z % 2 ? (t ? "CX" : "SX") : " ";
                draw_screen([ky], [kx])
            }, 75 * z, kx, ky, z, t);
        }
        var q = Math.floor(Math.random() * 18)
        if(q < 4) {
            grid[Math.floor(Math.random() * 12) + 9][Math.floor(Math.random() * 18) + 11] = "~"
        }
        draw_screen()
        window.setTimeout((kx, ky, t) => {
            if(game_paused)
                return
            var s = t ? "\u221b\u221a\u221d\u221c" : "V\u039b><"
            for(var z = 0; z < 30 - kx; z += 1) {
                window.setTimeout((z, kx, ky, s) => {
                    grid[ky][kx + z] = s;
//                     console.warn(ky, kx + z)
                    draw_screen([ky], [kx + z]);
                }, z * 100 / (30 - kx), z, kx, ky, s[2]);
                window.setTimeout((z, kx, ky, t) => {
                    if(!(pY != ky || pX > kx + z + 2 || t))
                        return died = 1
                    grid[ky][kx + z] = " ";
                    draw_screen([ky], [kx + z]);
                }, (z + 5) * 100 / (30 - kx), z, kx, ky, t);
            }
            for(var z = 0; z < kx - 10; z += 1) {
                window.setTimeout((z, kx, ky, s) => {
                    grid[ky][kx - z] = s;
//                     console.log(ky, kx - z)
                    draw_screen([ky], [kx - z]);
                }, z * 100 / (kx - 10), z, kx, ky, s[3]);
                window.setTimeout((z, kx, ky, t) => {
                    if(!(pY != ky || pX < kx - z - 2 || t))
                        return died = 1
                    grid[ky][kx - z] = " ";
                    draw_screen([ky], [kx - z]);
                }, (z + 5) * 100 / (kx - 10), z, kx, ky, t);
            }
            for(var z = 0; z < ky - 8; z += 1) {
                window.setTimeout((z, kx, ky, s) => {
                    grid[ky - z][kx] = s;
                    draw_screen([ky - z], [kx]);
                }, z * 100 / (ky - 8), z, kx, ky, s[1]);
                window.setTimeout((z, kx, ky, t) => {
                    if(!(pX != kx || pY > ky - z + 2|| t))
                        return died = 1
                    grid[ky - z][kx] = " ";
                    draw_screen([ky - z], [kx]);
                }, (z + 5) * 100 / (ky - 8), z, kx, ky, t);
            }
            for(var z = 0; z < 22 - ky; z += 1) {
                window.setTimeout((z, kx, ky, s) => {
                    grid[ky + z][kx] = s;
                    draw_screen([ky + z], [kx]);
                }, z * 100 / (22 - ky), z, kx, ky, s[0]);
                window.setTimeout((z, kx, ky, t) => {
                    if(!(pX != kx || pY < ky + z - 2 || t))
                        return died = 1
                    grid[ky + z][kx] = " ";
                    draw_screen([ky + z], [kx]);
                }, (z + 5) * 100 / (22 - ky), z, kx, ky, t);
            }
        }, 75 * (z + 1), kx, ky, t);
    }
    on_lvl += 1
    if(!dont) {
        window.setTimeout(level_select, 2150);
        window.setTimeout(() => blocked = false, 250);
    }
}

function level_flappy_bird(dont, direction) {
    if(changed_level) {
        changed_level = false;
        for(var x = 0; x < (direction < 2 ? 30 : 40); x += 1) {
            window.setTimeout(() => {
                level_flappy_bird(1, direction);
                blocked = true
            }, 25 * x);
        }
        window.setTimeout(level_select, 25 * x);
        return
    }
    if(dont) {
        s2s_offset = Math.floor(Math.random() * 2) + 17
    } else {
        switch(bird_blank) {
            case 0:
            case 1:
                s2s_offset += 2 - Math.floor(Math.random() * 5);
                break;
            case 2:
            case 3:
            case 4:
                s2s_offset += 4 - Math.floor(Math.random() * 9);
                break;
            default:
                s2s_offset = Math.floor(Math.random() * (direction < 2 ? 35 : 25)) + 5;
        }
        s2s_offset = Math.min(direction < 2 ? 35 : 25 , Math.max(5, s2s_offset))
    }
    if(direction >= 2) {
        switch(Math.floor(Math.random() * 20)) {
            case 0:
                var st = "VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV~   " + "\u039b".repeat(31);
                break;
            case 1:
                var st = "VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV ~  " + "\u039b".repeat(31);
                break;
            case 2:
                var st = "VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV  ~ " + "\u039b".repeat(31);
                break;
            case 3:
                var st = "VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV   ~" + "\u039b".repeat(31);
                break;
            case 4:
            case 5:
            case 6:
                var st = "VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV    " + "\u039b".repeat(31);
                break;
            default:
                var st = " ".repeat(68);
        }
    } else {
        switch(Math.floor(Math.random() * 20)) {
            case 0:
                var st = ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>~   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
                break;
            case 1:
                var st = ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ~  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
                break;
            case 2:
                var st = ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  ~ <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
                break;
            case 3:
                var st = ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   ~<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
                break;
            case 4:
            case 5:
            case 6:
                var st = ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
                break;
            default:
                var st = " ".repeat(76);
        }
    }
    if(st.trim())
        bird_blank = 0;
    else
        bird_blank += 1;
    wscroll(st.slice(s2s_offset, s2s_offset + (direction < 2 ? 40 : 30)), direction)
    if(!dont) {
        window.setTimeout(level_select, 500);
        window.setTimeout(() => blocked = false, 500);
    }

}

welcomed = false
welcome()
$("#bg").value = localStorage.getItem("7_volume") || "0.2";
$("audio").volume = Number(localStorage.getItem("7_volume") || 0.2);
var joystick_invterval = 0
var joystick_timeout = 0
var joystick_id = {};
var joy_id = 0
function joystick_handler(j_id) {
    if(j_id != joy_id)
        return window.clearInterval(joystick_id[j_id])
    for(var s of joystick_direction)
        window.onkeydown(null, s)
}
function handle_joystick(evt) {
    var stick = $("#stick");
    if(evt.type == "touchend") {
        stick.innerHTML = "O";
        stick.style.transform = "";
        joystick_direction = "";
        window.clearTimeout(joystick_timeout);
        window.clearInterval(joystick_invterval);
        return
    }
    console.log(evt)
    var rect = $("#joystick").getBoundingClientRect();
    var touchY = evt.touches[0].clientY
    var touchX = evt.touches[0].clientX
    if(touchX - rect.left < 0 || rect.right - touchX < 0 || touchY - rect.top < 0 || rect.bottom - touchY < 0) {
        rect = $("#screen").getBoundingClientRect();
        if(touchX - rect.left < 0 || rect.right - touchX < 0 || touchY - rect.top < 0 || rect.bottom - touchY < 0) {
            //alert(`${touchX}:[${rect.left},${rect.right}]X\n${touchY}:[${rect.top},${rect.bottom}]Y`);
            return
        }
        window.onkeydown(null, " ");
        return
    }
    joystick_direction = "";
    var w = Math.round(rect.width / 3.25);
    if(touchX - rect.left >= 0 && touchX - rect.left <= w)
        joystick_direction += "a"
    else if(rect.right - touchX >= 0 && rect.right - touchX <= w)
        joystick_direction += "d"
    if(touchY - rect.top >= 0 && touchY - rect.top <= w)
        joystick_direction += "w"
    else if(rect.bottom - touchY >= 0 && rect.bottom - touchY <= w)
        joystick_direction += "s"
    switch(joystick_direction) {
        case "a":
            stick.style.transform = `translate(-${w}px, 0px)`;
            stick.innerHTML = "<";
            break;
        case "aw":
            stick.style.transform = `translate(-${w}px, -${w}px) rotate(45deg)`;
            stick.innerHTML = "<";
            break;
        case "w":
            stick.style.transform = `translate(0px, -${w}px) rotate(90deg)`;
            stick.innerHTML = "<";
            break;
        case "dw":
            stick.style.transform = `translate(${w}px, -${w}px) rotate(-45deg)`;
            stick.innerHTML = ">";
            break;
        case "d":
            stick.style.transform = `translate(${w}px, 0px)`;
            stick.innerHTML = ">";
            break;
        case "ds":
            stick.style.transform = `translate(${w}px, ${w}px) rotate(45deg)`;
            stick.innerHTML = ">";
            break;
        case "s":
            stick.style.transform = `translate(0px, ${w}px) rotate(90deg)`;
            stick.innerHTML = ">";
            break;
        case "as":
            stick.style.transform = `translate(-${w}px, ${w}px) rotate(-45deg)`;
            stick.innerHTML = "<";
            break;
        default:
            stick.style.transform = "";
            stick.innerHTML = "~";
    }
    evt.passive = false
    evt.preventDefault();
    if(evt.type == "touchstart") {
        joystick_handler();
        window.clearTimeout(joystick_timeout);
        window.clearInterval(joystick_invterval);
        joystick_timeout = window.setTimeout(() => {
            if(joystick_direction) {
                joy_id = Math.floor(Math.random() * 65535)
                joystick_interval = window.setInterval(joystick_handler, 100, joy_id)
                joystick_id[joy_id] = joystick_interval;
            }
        }, 350);

    }
}
window.ontouchstart = (evt) => { handle_joystick(evt); $("#joystick").style.transform = "scale(1)" }
window.ontouchmove = handle_joystick
window.ontouchend = handle_joystick
window.onclick = (evt) => { $("audio").play(); window.onclick = null; }
$("#joystick").onclick = (evt) => evt.preventDefault();
$("#joystick").ondblclick = (evt) => evt.preventDefault();
window.onblur = (evt) => { if(!game_paused) window.onkeydown(null, " ") }
