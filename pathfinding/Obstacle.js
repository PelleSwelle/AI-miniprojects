class Obstacle {
    constructor(posx, posy) {
        this.position = [posx, posy];
        this.color = color(50, 50, 50);
    }

    display() {
        rect(this.position[0], this.position[1]);
    }
}