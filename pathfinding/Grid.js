

class Grid {
    constructor(_noOfCells) {
        this.noOfCells = _noOfCells
        this.cells = []
    }
    
    build() {
        for (let y = 0; y < this.noOfCells; y++) {
            for (let x = 0; x < this.noOfCells; x++) {
                let cell = new Cell(1000 / this.noOfCells * x, 1000 / this.noOfCells * y, x, y);
                this.cells.push(cell)
            }
        }
    }
    display() {
        this.cells.forEach(field => {
            field.display()
        });
    }

    getAgentCell() {
        let cell = null
        this.cells.forEach(_cell => {
            if (_cell.hasAgent)
                return cell = _cell
        });
        if (cell == null)
            console.log("no agent cell")
        else 
            return cell
    }

    getCell(_xCoordinate, _yCoordinate) {
        let cell = null
        this.cells.forEach(_cell => {
            if (_cell.xCoordinate == _xCoordinate && _cell.yCoordinate == _yCoordinate)
                cell = _cell
        })
        if (cell != null)
            return cell
        else 
            console.log('getCell() failed')
    }

    getNeighborCells(_cell) {
        console.log('get neighbor cells for cell: ', _cell.xCoordinate, ', ', _cell.yCoordinate)
        let neighbors = []
        
        let hasLeft = true
        let hasTop = true
        let hasBottom = true
        let hasRight = true

        if (_cell.xCoordinate === 0) hasLeft = false;
        if (_cell.xCoordinate === 19) hasRight = false;
        if (_cell.yCoordinate === 0) hasTop = false;
        if (_cell.yCoordinate === 19) hasBottom = false;

        if (hasLeft) {
            let __cell = this.getCell(_cell.xCoordinate - 1, _cell.yCoordinate)
            neighbors.push(__cell)
        }
        if (hasRight) {
            let __cell = this.getCell(_cell.xCoordinate + 1, _cell.yCoordinate)
            neighbors.push(__cell)
        }
        if (hasTop) {
            let __cell = this.getCell(_cell.xCoordinate, _cell.yCoordinate - 1)
            neighbors.push(__cell)
        }
        if (hasBottom) {
            let __cell = this.getCell(_cell.xCoordinate, _cell.yCoordinate + 1)
            neighbors.push(__cell)
        }
        
        return neighbors
    }
}