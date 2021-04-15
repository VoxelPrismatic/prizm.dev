grid = [];
for(var line of grid_st.split(".\n"))
    grid.push(line.split(""))

grid[0][24] = "<span style='color:#ff0;font-weight:bold'>Q</span>"
grid[0][25] = "<span style='color:#ff0;font-weight:bold'>O</span>"
grid[0][26] = " "
grid[0][27] = "<span style='color:#48f;font-weight:bold'>H</span>"
grid[0][28] = " "
grid[0][29] = " "
grid[0][30] = "<span style='color:#48f;font-weight:bold'>J</span>"
grid[0][31] = "<span style='color:#48f;font-weight:bold'>B</span>"
grid[0][32] = " "
grid[0][33] = "<span style='color:#ff0;font-weight:bold'>1</span>"
grid[0][34] = " "
grid[0][35] = " "
grid[0][36] = " "
grid[0][37] = "<span style='color:#f44;font-weight:bold'>1</span>"




gen_grid(1)
