class Spot {
    constructor(xpos, ypos) {
        this.x = xpos;
        this.y = ypos;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbors = [];
        this.previous = undefined;
        this.wall = false;        
        
        if (random(1) < .3) {
            this.wall = true;
        }
    }


    show = function(color) {
        if (this.wall) {
            fill(0)
            rect(this.x * cellWidth, this.y * cellHeight, cellWidth - 1, cellHeight - 1)
        } else {
            noStroke()
            fill(color);
            
            circle(
                this.x * cellWidth + cellWidth / 2, 
                this.y * cellWidth + cellHeight / 2, 
                cellWidth - 3)
        }
    }

    addNeighbors = function(grid, allowDiagonals) {
        let hasLeft = this.x > 0
        let hasRight = this.x < cols - 1
        let hasAbove = this.y > 0
        let hasBelow = this.y < rows - 1
        
        if (hasRight) {
            this.neighbors.push(grid[this.x + 1][this.y]) // right
        }
        if (hasLeft) {
            this.neighbors.push(grid[this.x - 1][this.y]) // // left
        }
        if (hasBelow) {
            this.neighbors.push(grid[this.x][this.y + 1]) // down
        }
        if (hasAbove) {
            this.neighbors.push(grid[this.x][this.y - 1]) // up
        }
        if (allowDiagonals) {
            if (hasLeft && hasAbove) {
                this.neighbors.push(grid[this.x - 1][this.y - 1])
            }
            if (hasLeft && hasBelow) {
                this.neighbors.push(grid[this.x - 1][this.y + 1])
            }
            if (hasRight && hasAbove) {
                this.neighbors.push(grid[this.x + 1][this.y - 1])
            }
            if (hasRight && hasBelow) {
                this.neighbors.push(grid[this.x + 1][this.y + 1])
            }
        }
    }
}
