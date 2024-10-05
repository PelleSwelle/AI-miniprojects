function reverseString(s) {
    let arr = s.split('');
    arr = arr.reverse();
    return arr.join('');
}

function edgesFit(edge1, edge2) {
    return edge1 == reverseString(edge2);
}

class Tile {
    constructor(image, edges, i) {
        this.img = image;
        this.edges = edges;
        this.index = i;
        this.up = [];
        this.right = [];
        this.down = [];
        this.left = [];

        if (i !== undefined)
            this.index = i;
    }

    analyze(tiles) {
        for (let i = 0; i < tiles.length; i++) {
            let tile = tiles[i];

            let bothIsTile5 = tile.index == 5 && this.index == 5
            if (bothIsTile5) 
                continue;

            // UP
            if (edgesFit(tile.edges[2], this.edges[0]))
                this.up.push(i);
            // RIGHT
            if (edgesFit(tile.edges[3], this.edges[1]))
                this.right.push(i);
            // DOWN
            if (edgesFit(tile.edges[0], this.edges[2]))
                this.down.push(i);
            // LEFT
            if (edgesFit(tile.edges[1], this.edges[3]))
                this.left.push(i);
        }
    }

    rotate(num) {
        const _width = this.img.width;
        const _height = this.img.height;
        const newImg = createGraphics(_width, _height);
        
        newImg.imageMode(CENTER);
        newImg.translate(_width / 2, _height / 2);
        newImg.rotate(HALF_PI * num);
        newImg.image(this.img, 0, 0);

        const newEdges = [];
        const noOfEdges = this.edges.length;

        for (let i = 0; i < noOfEdges; i++)
            newEdges[i] = this.edges[(i - num + noOfEdges) % noOfEdges];

            return new Tile(newImg, newEdges, this.index);
    }
}

function drawTile(index, x, y) {
    image(
        tiles[index].img,
        x * cellWidth,
        y * cellHeight,
        cellWidth,
        cellHeight
    );
}

function removeInvalidOptions(_options, _validOptions) {
    for (let i = _options.length - 1; i >= 0; i--) {
        if (!_validOptions.includes(_options[i]))
            _options.splice(i, 1);
    }
}

function createTiles() {
    tiles[0]  = new Tile(tileImages[0] , ['AAA', 'AAA', 'AAA', 'AAA'], 0);
    tiles[1]  = new Tile(tileImages[1] , ['BBB', 'BBB', 'BBB', 'BBB'], 1);
    tiles[2]  = new Tile(tileImages[2] , ['BBB', 'BCB', 'BBB', 'BBB'], 2);
    tiles[3]  = new Tile(tileImages[3] , ['BBB', 'BDB', 'BBB', 'BDB'], 3);
    tiles[4]  = new Tile(tileImages[4] , ['ABB', 'BCB', 'BBA', 'AAA'], 4);
    tiles[5]  = new Tile(tileImages[5] , ['ABB', 'BBB', 'BBB', 'BBA'], 5);
    tiles[6]  = new Tile(tileImages[6] , ['BBB', 'BCB', 'BBB', 'BCB'], 6);
    tiles[7]  = new Tile(tileImages[7] , ['BDB', 'BCB', 'BDB', 'BCB'], 7);
    tiles[8]  = new Tile(tileImages[8] , ['BDB', 'BBB', 'BCB', 'BBB'], 8);
    tiles[9]  = new Tile(tileImages[9] , ['BCB', 'BCB', 'BBB', 'BCB'], 9);
    tiles[10] = new Tile(tileImages[10], ['BCB', 'BCB', 'BCB', 'BCB'], 10);
    tiles[11] = new Tile(tileImages[11], ['BCB', 'BCB', 'BBB', 'BBB'], 11);
    tiles[12] = new Tile(tileImages[12], ['BBB', 'BCB', 'BBB', 'BCB'], 12);
}
