function Circle(x, y, r, c) {
    for(var theta = 0; theta <= 2 * pi; theta += 0.01) {
        PxlOn(x + r * cos(theta), y + r * sin(theta), c);
    }
}
