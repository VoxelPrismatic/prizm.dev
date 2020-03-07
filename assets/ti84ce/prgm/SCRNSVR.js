inGraph = true;

let xres = 264;
let yres = 164;

var R = randInt(0, 2);
var C = randInt(5, 8);

if(R == 1)
    C = randInt(9, 64);
if(R == 2)
    C = randInt(1, 4);

for(var D = 0; D <= C - 1; D += 1) {
    for(var Y = -D; Y <= yres; Y += C) {
        for(var X = 0; X <= xres; X += C) {
            var THETA = randInt(BLUE, DARKGRAY);
            while(THETA == BLACK) {
                THETA = randInt(BLUE, DARKGRAY);
            }
            for(var E = 0; E <= C - 1; E += 1) {
                screen[max(0, min(Y, yres))][max(0, min(X, xres))] = THETA;
            }
        }
    }
}
