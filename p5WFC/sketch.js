const tiles = [];

const grid = [];

const dimensions = 2;

const BLANK = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;
const LEFT = 4;

function preload() {
    tiles[0] = loadImage('shapes/blank.png')
    tiles[1] = loadImage('shapes/up.png')
    tiles[2] = loadImage('shapes/right.png')
    tiles[3] = loadImage('shapes/down.png')
    tiles[4] = loadImage('shapes/left.png')
}

function setup() {
    createCanvas(400, 400);

    for (let i = 0; i < dimensions * dimensions; i++) {
        grid[i] = {
            collapsed: false,
            options: [BLANK, LEFT, UP, RIGHT]
        }
    }

    grid[0].collapsed = true;
    grid[0].options = [UP];
}

function draw() {
    background(220);


    const gridCopy = grid.slice();

    // sort after how many options the cell has.
    gridCopy.sort((a, b) => {
        return a.options.length - b.options.length
    })

    const _width = width / dimensions;
    const _height = height / dimensions;

    for (let y = 0; y < dimensions; y++) {
        for (let x = 0; x < dimensions; x++) {
            let cell = grid[x, y * dimensions]
            if (cell.collapsed) {
                let index = cell.options[0];
                image(tiles[index], x * _width, y * _height);
            } else {
                fill(0);
                stroke(255);
                rect(x * _width, y * _height, _width, _height)
            }
        }
    }
}
