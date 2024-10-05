class Cell {
    constructor(posx, posy, indexX, indexY) {
        this.posX = posx;
        this.posY = posy;
        this.xCoordinate = indexX;
        this.yCoordinate = indexY;
        this.isVisited = false;
        this.isEmpty = true;
        this.hasAgent = false;
        this.isObstacle = false;
        this.size = 1000 / 20
        this.mouseIsOver = false;
        this.color = color(255, 255, 255)
        this.neighbours = []
    }

    display = () => {
        stroke(255, 255, 255)
        let emptyColor = color(0, 0, 0)
        let agentColor = color(0, 255, 0)
        let obstacleColor = color(255, 255, 255)
        let visitedColor = color(0, 0, 255)
        
        if (this.isObstacle)
            fill (obstacleColor)
        else if (this.hasAgent)
            fill(agentColor)
        else if (this.isEmpty)
            fill(emptyColor)
        else if (this.isVisited)
            fill(visitedColor)
        rect(this.posX, this.posY, this.size, this.size);
        this.displayText()
    }

    displayText = () => {
        fill(255, 255, 255)
        textAlign(CENTER, CENTER)
        text(`${this.xCoordinate}, ${this.yCoordinate}`, this.posX + this.size/2, this.posY + this.size /2)
    }

    isMouseOver = () => {
        let isOverX = mouseX > this.posX && mouseX < this.posX + this.size
        let isOverY = mouseY > this.posY && mouseY < this.posY + this.size
        return isOverX && isOverY
    }

    setIsEmpty = () => {
        this.hasAgent = false;
        this.isObstacle = false;
        this.isEmpty = true;
    }

    setHasAgent = () => {
        this.hasAgent = true;
    }

    setIsObstacle = () => {
        if (this.hasAgent)
            return
        else 
            this.isObstacle = true;
    }
}