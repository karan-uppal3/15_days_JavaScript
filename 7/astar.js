var ROW = 100;
var COL = 50;

function cell() {
    this.parent = createVector(-1,-1);
    this.f = Infinity;
    this.g = Infinity;
    this.h = Infinity;
}

class A_star
{
    constructor(start_x,start_y,end_x,end_y) {
        this.maze = [[]];

        for ( var i = 0 ; i < ROW ; i++ )
        {
            this.maze[i] = [];
            for ( var j = 0 ; j < COL ; j++ )
            {
                this.maze[i][j] = 0;
            }
        }

        this.start = createVector(start_x,start_y);
        this.end = createVector(end_x,end_y);
        this.foundDest = false;
    }

    isValid(row,col) {
        return row >= 0 && row < ROW && col >= 0 && col < COL;
    }

    isUnblocked(grid,row,col) {
        if (grid[row][col] == 0 )
            return true;
        else
            return false;
    }

    isDestination(row,col,dest) {
        if (dest.x == row && dest.y == col )
            return true;
        else    
            return false;
    }

    calculateHValue(row,col,dest) {
        return abs( (row-dest.x) + (col-dest.y) );
        // return sqrt( (row-dest.x)*(row-dest.x) + (col-dest.y)*(col-dest.y) );
    }

    tracePath(cellDetails,dest) {

        if ( this.foundDest == true)
        {
            var row = dest.x;
            var col = dest.y;

            var path = [];

            while( !(cellDetails[row][col].parent.x == row && cellDetails[row][col].parent.y == col ) ) {
                path.push(createVector(row,col));
                var temp_row = cellDetails[row][col].parent.x;
                var temp_col = cellDetails[row][col].parent.y;
                row = temp_row;
                col = temp_col;
            }

            path.push(createVector(row,col));

            return path
        }
    }

    aStarSearch(grid,src,dest) {

        if( this.isValid(src.x,src.y) == false ) {
            console.log("Source is invalid");
            return;
        }

        if ( this.isValid(dest.x,dest.y) == false ) {
            console.log("Destination is invalid");
            return;
        }

        if ( this.isUnblocked(grid,src.x,src.y) == false || this.isUnblocked(grid,dest.x,dest.y) == false ) {
            console.log("Source or destination is blocked");
            return;
        }

        if ( this.isDestination(src.x,src.y,dest) == true ) {
            console.log("We are already at the destination");
            return;
        }

        var closedList = []
        for ( var i = 0 ; i < ROW ; i++ ) {
            closedList[i] = []
            for ( var j = 0 ; j < COL ; j++ ) {
                closedList[i][j] = false;
            }
        }

        var cellDetails = []
        for ( var i = 0 ; i < ROW ; i++ ) {
            cellDetails[i] = []
            for ( var j = 0 ; j < COL ; j++ ) {
                var temp = new cell()
                cellDetails[i][j] = temp;
            }
        }

        var i = src.x;
        var j = src.y;
        cellDetails[i][j].f = 0;
        cellDetails[i][j].g = 0;
        cellDetails[i][j].h = 0;
        cellDetails[i][j].parent.x = i;
        cellDetails[i][j].parent.y = j;

        var openList = [];
        openList.push(createVector(0,i,j));

        while(openList.length > 0) {

            var lowest = 0;
            for ( var i = 0 ; i < openList.length ; i++ ) {
                if ( openList[i].x < openList[lowest].x ) { lowest = i; }
            }

            var p = openList[lowest];
            openList.splice(lowest,1);

            var i = p.y;
            var j = p.z;
            closedList[i][j] = true;

            var gNew, hNew, fNew;

            if ( this.isValid(i-1,j) == true ) {

                if (this.isDestination(i-1,j,dest) == true) {
                    cellDetails[i-1][j].parent.x = i;
                    cellDetails[i-1][j].parent.y = j;
                    console.log("The destination cell is found");
                    this.foundDest = true;
                    return this.tracePath(cellDetails,dest);
                }

                else if ( closedList[i-1][j] == false && this.isUnblocked(grid,i-1,j) == true ) {
                    gNew = cellDetails[i][j].g + 1.0;
                    hNew = this.calculateHValue(i-1,j,dest);
                    fNew = gNew + hNew;
                
                    if ( cellDetails[i-1][j].f == Infinity || cellDetails[i-1][j].f > fNew ) {
                        openList.push(createVector(fNew,i-1,j));

                        cellDetails[i-1][j].f = fNew;
                        cellDetails[i-1][j].g = gNew;
                        cellDetails[i-1][j].h = hNew;
                        cellDetails[i-1][j].parent.x = i;
                        cellDetails[i-1][j].parent.y = j;
                    }                    
                }
            }

            if ( this.isValid(i+1,j) == true ) {

                if (this.isDestination(i+1,j,dest) == true) {
                    cellDetails[i+1][j].parent.x = i;
                    cellDetails[i+1][j].parent.y = j;
                    console.log("The destination cell is found");
                    this.foundDest = true;
                    return this.tracePath(cellDetails,dest);
                }

                else if ( closedList[i+1][j] == false && this.isUnblocked(grid,i+1,j) == true ) {
                    gNew = cellDetails[i][j].g + 1.0;
                    hNew = this.calculateHValue(i,j+1,dest);
                    fNew = gNew + hNew;
                
                    if ( cellDetails[i+1][j].f == Infinity || cellDetails[i+1][j].f > fNew ) {
                        openList.push(createVector(fNew,i+1,j));

                        cellDetails[i+1][j].f = fNew;
                        cellDetails[i+1][j].g = gNew;
                        cellDetails[i+1][j].h = hNew;
                        cellDetails[i+1][j].parent.x = i;
                        cellDetails[i+1][j].parent.y = j;
                    }                    
                }
            }

            if ( this.isValid(i,j+1) == true ) {

                if (this.isDestination(i,j+1,dest) == true) {
                    cellDetails[i][j+1].parent.x = i;
                    cellDetails[i][j+1].parent.y = j;
                    console.log("The destination cell is found");
                    this.foundDest = true;
                    return this.tracePath(cellDetails,dest);
                }

                else if ( closedList[i][j+1] == false && this.isUnblocked(grid,i,j+1) == true ) {
                    gNew = cellDetails[i][j].g + 1.0;
                    hNew = this.calculateHValue(i,j+1,dest);
                    fNew = gNew + hNew;
                
                    if ( cellDetails[i][j+1].f == Infinity || cellDetails[i][j+1].f > fNew ) {
                        openList.push(createVector(fNew,i,j+1));

                        cellDetails[i][j+1].f = fNew;
                        cellDetails[i][j+1].g = gNew;
                        cellDetails[i][j+1].h = hNew;
                        cellDetails[i][j+1].parent.x = i;
                        cellDetails[i][j+1].parent.y = j;
                    }                    
                }
            }

            if ( this.isValid(i,j-1) == true ) {

                if (this.isDestination(i,j-1,dest) == true) {
                    cellDetails[i][j-1].parent.x = i;
                    cellDetails[i][j-1].parent.y = j;
                    console.log("The destination cell is found");
                    this.foundDest = true;
                    return this.tracePath(cellDetails,dest);
                }

                else if ( closedList[i][j-1] == false && this.isUnblocked(grid,i,j-1) == true ) {
                    gNew = cellDetails[i][j].g + 1.0;
                    hNew = this.calculateHValue(i,j-1,dest);
                    fNew = gNew + hNew;
                
                    if ( cellDetails[i][j-1].f == Infinity || cellDetails[i][j-1].f > fNew ) {
                        openList.push(createVector(fNew,i,j-1));

                        cellDetails[i][j-1].f = fNew;
                        cellDetails[i][j-1].g = gNew;
                        cellDetails[i][j-1].h = hNew;
                        cellDetails[i][j-1].parent.x = i;
                        cellDetails[i][j-1].parent.y = j;
                    }                    
                }
            }
        }

        if ( this.foundDest == false )
            console.log("Failed to find the destination cell");
    }
}

/*
var moves;
var obstacles = [[1,2],[1,5],[0,5],[5,0],[5,1],[5,2],[5,3],[5,4],[6,6],[5,6],[7,4],[7,5],[7,6],[7,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8]];
var start = [0,0];
var end = [0,9];

function setup() {
    createCanvas(ROW*10, COL*10);
    maze = [[]];

    for ( var i = 0 ; i < ROW ; i++ )
    {
        maze[i] = [];
        for ( var j = 0 ; j < COL ; j++ )
        {
            maze[i][j] = 0;
        }
    }

    for ( var i = 0 ; i < obstacles.length ; i++ ) {
        maze[obstacles[i][0]][obstacles[i][1]] = 1;
    }

    var temp = new A_star(0,0,10,10);

    moves = temp.aStarSearch(maze,createVector(start[0],start[1]),createVector(end[0],end[1]));
}

function draw() {
    background(255);

    if ( moves != undefined) 
    {
        for ( var i = 0 ; i < moves.length ; i++ ) {
            fill(0,255,0);
            rect(moves[i].x*10,moves[i].y*10,10,10);
        }
    }

    for ( var i = 0 ; i < ROW ; i++ )
    {
        for ( var j = 0 ; j < COL ; j++ )
        {
            if ( maze[i][j] != 0 ) {
                fill(0);
                rect(i*10,j*10,10,10);
            }
        }
    }

    fill(0,0,255);
    rect(start[0]*10,start[1]*10,10,10);
    rect(end[0]*10,end[1]*10,10,10);
}*/