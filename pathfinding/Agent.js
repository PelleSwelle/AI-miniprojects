class Agent {
    constructor(startCell) {
        this.cell = startCell;
    }

    display() {
        color(255, 0, 0);
        rect(this.position[0], this.position[1], 20, 20);
    }
}