let cols = 50;
let rows = 50;
let grid = new Array(cols)

let openSet = [];
let closedSet = [];
let start;
let end;
let path = [];
let unvisitedColor;

let cellWidth, cellHeight;

function heuristic(a, b) {
    let distance = abs(a.x-b.x) + abs(a.y-b.y)
    return distance
}


function removeFromArray(arr, elmnt) {
    for (let i = arr.length- 1; i >= 0; i--) {
        if (arr[i] == elmnt) {
            arr.splice(i, 1);
        }
    }
}

function setup() {
    createCanvas(1000, 1000);
    unvisitedColor = color(100, 100, 100)
    cellWidth = width / cols;
    cellHeight = height / rows
    
    // making a 2d array
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }
    console.log(grid)

    // a grid of spots
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < cols; y++) {
            grid[x][y] = new Spot(x, y); 
        }
    }


    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < cols; y++) {
            grid[x][y].addNeighbors(grid, true) 
        }
    }

    start = grid[0][0]
    end = grid[cols - 1][rows - 1]
    start.wall = false;
    end.wall = false;
    openSet.push(start)
}

function draw() {

    aStar();
}

function aStar() {
    if (openSet.length > 0) {
        let winner = 0;

        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        var current = openSet[winner];

        if (current === end) {
            noLoop()
            console.log('done!');
        }

        removeFromArray(openSet, current);
        closedSet.push(current)

        for (let i = 0; i < current.neighbors.length; i++) {
            let neighbor = current.neighbors[i]

            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                let tempG = current.g + 1

                let newPath = false
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }
                if (newPath) {
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
    
                    neighbor.previous = current;
                }
            }
        }
    } else {
        console.log("no solution")
        noLoop();
        return;
    }
    background(0);

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            grid[x][y].show(unvisitedColor);
        }
    }

    for (let i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0))
    }
    for (let i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0))
    }
    // find the path
    path = [];
    let temp = current;
    path.push(temp);

    while(temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }
    
    for (let i = 0; i < path.length; i++) {
        path[i].show(color(0, 0, 255));
    }
}