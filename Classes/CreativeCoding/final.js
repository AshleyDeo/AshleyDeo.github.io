//------GLOBAL VARS---------------------------------
let world = []; //array of Cells
let maxLength = 40; //size
let maxHeight = 30; //size
let cell_size = 16; //seperation between cells
let updateTimer = 0; //time between grid updates

//colors
let a1_color;
let a2_color;
let a4_color;
let d_color;

var colors;
var trackingData;

let drawConway = false; //update conways
let blackWhite = true; //color cells
//------CLASSES----------------------------------
class Cell {
    constructor(x, y, a) {
        this.x = x;
        this.y = y;
        this.neighbors = 0;
        this.alive = a.toFixed(0) % 2;
        this.age = 0;
    }

    update() { //update based on rules
        if (this.alive == 1) {
            if (this.neighbors > 3 || this.neighbors < 2) {
                this.alive = 0;
            } else {
                this.age++;
            }
        } else {
            this.alive = 0;
            if (this.neighbors == 3) {
                this.alive = 1;
                this.age = 0;
            }
        }
    }

    drawing() {
        if (blackWhite) { //black/white
            if (this.alive == 1) {
                fill(255);
            } else {
                fill(0);
            }
        } else { //coloring
            if (this.alive == 1) {
                fill(a1_color);
            } else {
                if (this.neighbors == 2) {
                    fill(a2_color);
                } else if (this.neighbors == 4) {
                    fill(a3_color);
                } else if (this.neighbors == 6) {
                    fill(a4_color);
                } else {
                    fill(d_color);
                }
            }
        }
        //draw
        noStroke();
        //rect(200 + (this.x * cell_size), 200 + (this.y * cell_size), cell_size, cell_size);
        rect(700 + (this.x * cell_size), this.y * cell_size, cell_size, cell_size);
        //rect(this.x * cell_size, 280 + (this.y * cell_size), cell_size, cell_size);
    }
}

//------ FUNCTIONS-----------------------------------
function setup() {
    let canvas = createCanvas(windowWidth - 20, windowHeight - 20);
    pixelDensity(1);
    capture = createCapture(VIDEO);
    capture.size(maxLength, maxHeight);
    capture.hide();

    d_color = color(255, 255, 255);
    a1_color = color(100, 255, 255);
    a2_color = color(102, 255, 150);
    a3_color = color(0, 255, 255);
    a4_color = color(255, 220, 255);

    //create base array
    for (let j = 0; j < maxHeight; j++) {
        for (let i = 0; i < maxLength; i++) {
            world.push(new Cell(i, j, 0));
        }
    }
}

function draw() {
    background(255);
    capture.loadPixels(); //load pixels to read
    for (let y = 0; y < maxHeight - 1; y += 1) {
        for (let x = 0; x < maxLength - 1; x += 1) {
            //console.log(y + ", " + x);
            const i = (capture.width - x + (y * capture.width)) * 4;
            //read pixel color
            var r = capture.pixels[i + 1];
            var g = capture.pixels[i + 2];
            var b = capture.pixels[i + 3];
            var avg = (r + g + b) / 3;
            //console.log(i/4);
            if (avg > 160) { //copy pixels to board
                fill(255); //alive
                if (!drawConway) {
                    world[i / 4].alive = true;
                }
            } else {
                fill(0); //dead
                if (!drawConway) {
                    world[i / 4].alive = false;
                }
            }
            //draw video
            rectMode(CENTER);
            noStroke();
            rect(x * cell_size, y * cell_size, cell_size, cell_size);
        }
    }
    if (frameCount % 10 == 0 && updateTimer > 0) { //timer for board update
        updateTimer--;
    }
    if (drawConway) { //update neighbors 
        console.log("drawing");
        //update every 2 sec
        if (updateTimer <= 0) {
            updateTimer = 2;
            //update neighbor count for every cell
            for (let i = 0; i < maxLength * maxHeight; i++) {
                countNeighbors(world[i]);
                world[i].update();
            }
        }
    }
    //draw cells
    for (let i = 0; i < maxLength * maxHeight; i++) {
        world[i].drawing();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    if (keyCode === DOWN_ARROW) { //coloring switch
        blackWhite = !blackWhite;
    }
    if (keyCode === UP_ARROW) { //update board
        console.log("up");
        drawConway = !drawConway;
    }
}

function mousePressed() {
    console.log("Mosue");
    capture.noLoop();
}

function countNeighbors(curr_cell) { //count alive neigbors for cells
    let neighbors = 0;
    //console.log(maxLength + ", " + maxHeight);
    //console.log(curr_cell.x + ", " + curr_cell.y);

    if (curr_cell.x > 0 && world[(curr_cell.x - 1) * maxHeight + curr_cell.y].alive == 1) {
        neighbors++;
        //console.log("U");
    }
    if (curr_cell.x < maxLength - 1 && world[(curr_cell.x + 1) * maxHeight + curr_cell.y].alive == 1) {
        neighbors++;
        //console.log("D");
    }
    if (curr_cell.y > 0 && world[(curr_cell.x) * maxHeight + curr_cell.y - 1].alive == 1) {
        neighbors++;
        //console.log("L");
    }
    if (curr_cell.y < maxHeight - 1 && world[(curr_cell.x) * maxHeight + curr_cell.y + 1].alive == 1) {
        neighbors++;
        //console.log("R");
    }
    if (curr_cell.x > 0 && curr_cell.y > 0 && world[(curr_cell.x - 1) * maxHeight + curr_cell.y - 1].alive == 1) {
        neighbors++;
        //console.log("UL");
    }
    if (curr_cell.x < maxLength - 1 && curr_cell.y > 0 && world[(curr_cell.x + 1) * maxHeight + curr_cell.y - 1].alive == 1) {
        neighbors++;
        //console.log("DL");
    }
    if (curr_cell.x > 0 && curr_cell.y < maxHeight - 1 && world[(curr_cell.x - 1) * maxHeight + curr_cell.y + 1].alive == 1) {
        neighbors++;
        //console.log("UR");
    }
    if (curr_cell.x < maxLength - 1 && curr_cell.y < maxHeight - 1 && world[(curr_cell.x + 1) * maxHeight + curr_cell.y + 1].alive == 1) {
        neighbors++;
        //console.log("DR");
    }
    curr_cell.neighbors = neighbors;
}

//Infinite space
/*if (world[((curr_cell.x - 1) % (maxLength - 1) + maxLength - 1) % (maxLength - 1)][curr_cell.y].alive == 1) {
        neighbors++;
        //console.log("U");
    }
    if (world[(curr_cell.x + 1) % (maxLength - 1)][curr_cell.y].alive == 1) {
        neighbors++;
        //console.log("D");
    }
    if (world[curr_cell.x][(((curr_cell.y - 1) % (maxHeight - 1) ) + maxHeight - 1) % (maxHeight-1)].alive == 1) {
        neighbors++;
        //console.log("L");
    }
    if (world[curr_cell.x][(curr_cell.y + 1) % (maxHeight - 1)].alive == 1) {
        neighbors++;
        //console.log("R");
    }
    if (world[((curr_cell.x - 1) % (maxLength - 1) + maxLength - 1) % (maxLength - 1)][(((curr_cell.y - 1) % (maxHeight - 1) ) + maxHeight - 1) %  maxHeight].alive == 1) {
        neighbors++;
        //console.log("UL");
    }
    if (world[(curr_cell.x + 1) % (maxLength - 1)][(((curr_cell.y - 1) % (maxHeight - 1)) + maxHeight - 1) % (maxHeight - 1)].alive == 1) {
        neighbors++;
        //console.log("DL");
    }
    if (world[((curr_cell.x - 1) % (maxLength - 1) + maxLength - 1) % (maxLength - 1)][(curr_cell.y + 1) % (maxHeight - 1)].alive == 1) {
        neighbors++;
        //console.log("UR");
    }
    if (world[(curr_cell.x + 1) % (maxLength - 1)][(curr_cell.y + 1) % (maxHeight - 1)].alive == 1) {
        neighbors++;
        //console.log("DR");
    }*/