
let agent;
let grid;
let obstacles = [];
let numberOfClicks = 0

function setup() {
    createCanvas(1000, 1000);
    grid = new Grid(20);
    grid.build()
    agent = new Agent([0, 0]);
}

function draw() {
    background(0, 0, 0);
    grid.display()
    agent.display()
}

function mousePressed() {
    grid.cells.forEach(cell => {
        if (cell.isMouseOver()) {
            if (numberOfClicks == 0)
                cell.hasAgent = true
            else
                cell.isObstacle = true;
        }
    });
    numberOfClicks++

    breadthFirst()
}

function breadthFirst() {
    let frontier = [] // queue fifo
    
    let agentCell = grid.getAgentCell()
    
    frontier.push(agentCell)
    
    let reached = new Set() // set 
    reached.add(grid.getAgentCell())

    if (frontier.length != 0)
    {
        let current = frontier.shift()
        console.log('current cell: ', current.xCoordinate, current.yCoordinate)
        let neighbors = grid.getNeighborCells(current)
        
        neighbors.forEach(neighbor => {
            frontier.shift(neighbor) // this thing
            reached.add(neighbor)
        });
    }
}
function dijkstra() {

}

function aStar() {

}