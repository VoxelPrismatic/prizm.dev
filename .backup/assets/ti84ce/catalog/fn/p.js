function PxlOn(x, y, c) {
    screen[int(y)][int(x)] = c;
    drawScreen();
}
