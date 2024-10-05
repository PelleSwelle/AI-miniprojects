let grid = [];
let tiles = [];

const tileImages = [];
const tilesCanBeRotated = true;
let cellWidth, cellHeight;

const dimensions = 10;

function preload() {
    const tilesPath = 'tiles/circuit-coding-train';

    for (let i = 0; i < 13; i++)
        tileImages[i] = loadImage(`${tilesPath}/${i}.png`);
}

function removeDuplicatedTiles(tiles) {
    const uniqueTilesMap = {};

    for (const tile of tiles) {
        const key = tile.edges.join(','); // ex: "ABB,BCB,BBA,AAA"
        uniqueTilesMap[key] = tile;
    }
    return Object.values(uniqueTilesMap);
}


function setup() {
    createCanvas(400, 400);

    createTiles();
    cellWidth = width / dimensions;
    cellHeight = height / dimensions;

    const initialTileCount = tiles.length
    for (let i = 0; i < initialTileCount; i++) {
        let tempTiles = [];
        
        if (tilesCanBeRotated)
            addRotatedTiles(tempTiles, i);
        tempTiles = removeDuplicatedTiles(tempTiles);
        tiles = tiles.concat(tempTiles);
    }

    // Generate the adjacency rules based on edges
    generateAdjacencyRules();
    startOver();
}

function generateAdjacencyRules() {
    for (let i = 0; i < tiles.length; i++)
        tiles[i].analyze(tiles);
}

function addRotatedTiles(tempTiles, i) {
    for (let j = 0; j < 4; j++)
        tempTiles.push(tiles[i].rotate(j));
}

function startOver() {
    // Create cell for each spot on the grid
    for (let i = 0; i < dimensions * dimensions; i++)
        grid[i] = new Cell(tiles.length);
}


function draw() {
    background(0);

    
    for (let y = 0; y < dimensions; y++) {
        for (let x = 0; x < dimensions; x++) {

            let cell = grid[x + y * dimensions];
            if (cell.collapsed) {
                let index = cell.options[0];
                drawTile(index, x, y);
            } else {
                noFill();
                stroke(51);
                rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
            }
        }
    }

    // Pick cell with least entropy
    let emptyNeighbors = getAvailableNeighbor(grid)
    
    if (emptyNeighbors.length != 0) {
        sortForLowestEntropy(emptyNeighbors);

        let stopIndex = generateStopIndex(emptyNeighbors);

        if (stopIndex > 0) 
            emptyNeighbors.splice(stopIndex);
        
        const targetCell = random(emptyNeighbors);
        targetCell.collapsed = true;
        
        const pick = random(targetCell.options);
        if (pick === undefined) {
            startOver();
            return;
        }
        targetCell.options = [pick];
    
        const gridWithNewEntropyValues = [];
    
        for (let y = 0; y < dimensions; y++) {
            for (let x = 0; x < dimensions; x++) {
                let index = x + y * dimensions;
                if (grid[index].collapsed)
                    gridWithNewEntropyValues[index] = grid[index];
                else {
                    let options = new Array(tiles.length).fill(0).map((x, i) => i);
                    checkNeighbors(y, x, options);
                    gridWithNewEntropyValues[index] = new Cell(options);
                }
            }
        }
        grid = gridWithNewEntropyValues;
    } 
    else return;
}

function generateStopIndex(emptyNeighbors) {
    let stopIndex = 0
    for (let i = 1; i < emptyNeighbors.length; i++) {
        if (emptyNeighbors[i].options.length > emptyNeighbors[0].options.length) {
            stopIndex = i;
            break;
        }
    }
    return stopIndex;
}

function sortForLowestEntropy(emptyNeighbors) {
    emptyNeighbors.sort((a, b) => {
        return a.options.length - b.options.length;
    });
}

function checkNeighbors(y, x, options) {
    checkUp(y, x, options);
    checkRight(x, y, options);
    checkDown(y, x, options);
    checkLeft(x, y, options);
}



function checkUp(y, x, options) {
    if (y > 0) {
        let up = grid[x + (y - 1) * dimensions];
        let validOptions = [];
        for (let option of up.options) {
            let valid = tiles[option].down;
            validOptions = validOptions.concat(valid);
        }
        removeInvalidOptions(options, validOptions);
    }
}

function checkLeft(x, y, options) {
    if (x > 0) {
        let left = grid[x - 1 + y * dimensions];
        let validOptions = [];
        for (let option of left.options) {
            let valid = tiles[option].right;
            validOptions = validOptions.concat(valid);
        }
        removeInvalidOptions(options, validOptions);
    }
}

function checkDown(y, x, options) {
    if (y < dimensions - 1) {
        let down = grid[x + (y + 1) * dimensions];
        let validOptions = [];
        for (let option of down.options) {
            let valid = tiles[option].up;
            validOptions = validOptions.concat(valid);
        }
        removeInvalidOptions(options, validOptions);
    }
}

function checkRight(x, y, options) {
    if (x < dimensions - 1) {
        let right = grid[x + 1 + y * dimensions];
        let validOptions = [];
        for (let option of right.options) {
            let valid = tiles[option].left;
            validOptions = validOptions.concat(valid);
        }
        removeInvalidOptions(options, validOptions);
    }
}

function getAvailableNeighbor(grid) {
    let gridCopy = grid.slice();
    return gridCopy.filter((a) => !a.collapsed);
}

