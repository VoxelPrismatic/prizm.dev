var z = 0
grid[z][22] = "<span style='color:#ff0;font-weight:bold'>Q</span>"
grid[z][24] = "<span style='color:#ff0;font-weight:bold'>O</span>"
grid[z][26] = " "
grid[z][28] = "<span style='color:#48f;font-weight:bold'>H</span>"
grid[z][30] = " "
grid[z][32] = " "
grid[z][34] = "<span style='color:#48f;font-weight:bold'>J</span>"
grid[z][36] = "<span style='color:#48f;font-weight:bold'>N</span>"
grid[z][38] = " "
grid[z][40] = "<span style='color:#ff0;font-weight:bold'>1</span>"
grid[z][42] = " "
grid[z][44] = " "
grid[z][46] = " "
grid[z][48] = "<span style='color:#f44;font-weight:bold'>1</span>"
grid[z][50] = " "
grid[z][52] = " "
z += 1
grid[z][22] = " "
grid[z][24] = " "
grid[z][26] = " "
grid[z][28] = "<span style='color:#ff0;font-weight:bold'>⁰</span>"
grid[z][30] = "<span style='color:#48f;font-weight:bold'>G</span>"
grid[z][32] = " "
grid[z][34] = "<span style='color:#48f;font-weight:bold'>F</span>"
grid[z][36] = "<span style='color:#48f;font-weight:bold'>L</span>"
grid[z][38] = "<span style='color:#ccc;font-weight:bold'>.</span>"
grid[z][40] = "<span style='color:#48f;font-weight:bold'>P</span>"
grid[z][42] = " "
grid[z][44] = " "
grid[z][46] = "<span style='color:#ccc;font-weight:bold'>F</span>"
grid[z][48] = " "
grid[z][50] = " "
grid[z][52] = " "
z += 1
grid[z][22] = " "
grid[z][24] = " "
grid[z][26] = " "
grid[z][28] = "<span style='color:#ff0;font-weight:bold'>_</span>"
grid[z][30] = "<span style='color:#48f;font-weight:bold'>H</span>"
grid[z][32] = " "
grid[z][34] = "<span style='color:#48f;font-weight:bold'>G</span>"
grid[z][36] = "<span style='color:#48f;font-weight:bold'>M</span>"
grid[z][38] = "<span style='color:#ccc;font-weight:bold'>.</span>"
grid[z][40] = "<span style='color:#48f;font-weight:bold'>Q</span>"
grid[z][42] = " "
grid[z][44] = " "
grid[z][46] = "<span style='color:#fff;font-weight:bold'>.</span>"
grid[z][48] = " "
grid[z][50] = " "
grid[z][52] = " "
z += 1
grid[z][22] = " "
grid[z][24] = " "
grid[z][26] = " "
grid[z][28] = " "
grid[z][30] = " "
grid[z][32] = "<span style='color:#ff0;font-weight:bold'>G</span>"
grid[z][34] = "<span style='color:#48f;font-weight:bold'>O</span>"
grid[z][36] = "<span style='color:#48f;font-weight:bold'>K</span>"
grid[z][38] = "<span style='color:#ccc;font-weight:bold'>.</span>"
grid[z][40] = "<span style='color:#48f;font-weight:bold'>H</span>"
grid[z][42] = "<span style='color:#48f;font-weight:bold'>5</span>"
grid[z][44] = "<span style='color:#48f;font-weight:bold'>(</span>"
grid[z][46] = " "
grid[z][48] = " "
grid[z][50] = " "
grid[z][52] = " "

var kill_rows = $("#board").rows
for(var y = 0; y < z; y += 1) {
    var kill_cells = kill_rows[y]
    for(var x = 22; x < grid[y].length; x += 2) {
        grid[y][x + 1] = grid[y][x];
        kill_cells[x] = grid[y][x];
        kill_cells[x + 1] = grid[y][x];
    }
}

//gen_grid(1)
//last_grid = ""
//draw_grid(1)
