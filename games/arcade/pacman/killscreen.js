var z = 0;
var k = 23;
var w = k;
grid[z][w] = "<span style='color:#ff0;font-weight:bold'>Q</span>"; w += 2;
grid[z][w] = "<span style='color:#ff0;font-weight:bold'>O</span>"; w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>H</span>"; w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>J</span>"; w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>N</span>"; w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = "<span style='color:#ff0;font-weight:bold'>1</span>"; w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = "<span style='color:#f44;font-weight:bold'>1</span>"; w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";

z += 1; w = k;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = "<span style='color:#ff0;font-weight:bold'>⁰</span>"; w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>G</span>"; w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>F</span>"; w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>L</span>"; w += 2;
grid[z][w] = "<span style='color:#ccc;font-weight:bold'>.</span>"; w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>P</span>"; w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = "<span style='color:#ccc;font-weight:bold'>F</span>"; w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";

z += 1; w = k;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = "<span style='color:#ff0;font-weight:bold'>_</span>"; w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>H</span>"; w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>G</span>"; w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>M</span>"; w += 2;
grid[z][w] = "<span style='color:#ccc;font-weight:bold'>.</span>"; w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>Q</span>"; w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = "<span style='color:#fff;font-weight:bold'>.</span>"; w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";

z += 1; w = k;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = "<span style='color:#ff0;font-weight:bold'>G</span>"; w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>O</span>"; w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>K</span>"; w += 2;
grid[z][w] = "<span style='color:#ccc;font-weight:bold'>.</span>"; w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>H</span>"; w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>5</span>"; w += 2;
grid[z][w] = "<span style='color:#48f;font-weight:bold'>(</span>"; w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";                                                  w += 2;
grid[z][w] = " ";

for(var y = 0; y <= z; y += 1)
    for(var x = k; x <= w; x += 2)
        grid[y][x + 1] = grid[y][x];

gen_grid(1)
last_grid = ""
draw_grid(1)
