let flock;

function setup() {
    createCanvas(640, 360);
    createP("Drag the mouse to generate new boids.");

    flock = new Flock();

    for (let i = 0; i < 100; i++) {
        let b = new Boid(width / 2, height / 2);
        flock.addBoid(b);
    }
}

function draw() {
    background(51);
    flock.run();
}

function mouseDragged() {
    flock.addBoid(new Boid(mouseX, mouseY));
}