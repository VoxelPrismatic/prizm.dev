var z = 0;
var k = 23;
var w = k;
var s = ` style="top: ${-font_h/3}px; left: ${-font_w/3}px"`

grid[z][w] = `<span class="kill y"${s}>Q</span>`; w += 2;
grid[z][w] = `<span class='kill y'${s}>O</span>`; w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = `<span class='kill b'${s}>H</span>`; w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = `<span class='kill b'${s}>J</span>`; w += 2;
grid[z][w] = `<span class='kill b'${s}>N</span>`; w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = `<span class='kill y'${s}>1</span>`; w += 2;
grid[z][w] = `<span class='kill w'${s}>'</span>`; w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = `<span class='kill r'${s}>1</span>`; w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;

z += 1; w = k;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = `<span class='kill y'${s}>'</span>`; w += 2;
grid[z][w] = `<span class='kill b'${s}>G</span>`; w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = `<span class='kill b'${s}>F</span>`; w += 2;
grid[z][w] = `<span class='kill b'${s}>L</span>`; w += 2;
grid[z][w] = `<span class='kill s'${s}>.</span>`; w += 2;
grid[z][w] = `<span class='kill b'${s}>P</span>`; w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = `<span class='kill s'${s}>P</span>`; w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;

z += 1; w = k;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = `<span class='kill y'${s}>_</span>`; w += 2;
grid[z][w] = `<span class='kill b'${s}>H</span>`; w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = `<span class='kill b'${s}>G</span>`; w += 2;
grid[z][w] = `<span class='kill b'${s}>M</span>`; w += 2;
grid[z][w] = `<span class='kill s'${s}>.</span>`; w += 2;
grid[z][w] = `<span class='kill b'${s}>Q</span>`; w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = `<span class='kill w'${s}>.</span>`; w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;

z += 1; w = k;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = `<span class='kill y'${s}>F</span>`; w += 2;
grid[z][w] = `<span class='kill y'${s}>N</span>`; w += 2;
grid[z][w] = `<span class='kill b'${s}>J</span>`; w += 2;
grid[z][w] = `<span class='kill s'${s}>.</span>`; w += 2;
grid[z][w] = `<span class='kill b'${s}>G</span>`; w += 2;
grid[z][w] = `<span class='kill b'${s}>3</span>`; w += 2;
grid[z][w] = `<span class='kill b'${s}>)</span>`; w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;

z += 1; w = k;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = `<span class='kill y'${s}>G</span>`; w += 2;
grid[z][w] = `<span class='kill y'${s}>O</span>`; w += 2;
grid[z][w] = `<span class='kill b'${s}>K</span>`; w += 2;
grid[z][w] = `<span class='kill s'${s}>.</span>`; w += 2;
grid[z][w] = `<span class='kill b'${s}>H</span>`; w += 2;
grid[z][w] = `<span class='kill b'${s}>5</span>`; w += 2;
grid[z][w] = `<span class='kill b'${s}>(</span>`; w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;                                 w += 2;
grid[z][w] = ` `;


for(var y = 0; y <= z; y += 1)
    for(var x = k; x <= w; x += 2)
        grid[y][x + 1] = "<span style='opacity:0'>.</span>";
gen_grid(1)
last_grid = ""
draw_grid(1)
