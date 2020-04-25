//------GLOBAL VARS---------------------------------
let world = [];
let sepx = 4;
let sepy = 4;
let maxLength = 520 / sepx;
let maxHeight = 1452 / sepy;
let cell_size = 5;
let updateTimer = 0;

let a1_color;
let a2_color;
let a4_color;
let d_color;

let drawConway = false;

//------CLASSES----------------------------------
class Cell {
    constructor(x, y, a) {
        this.x = x;
        this.y = y;
        this.neighbors = 0;
        this.alive = a.toFixed(0) % 2;
        this.age = 0;
    }

    update() {
        if (this.alive == 1) {
            if (this.neighbors > 3 || this.neighbors < 4) {
                this.alive = 0;
            } else {
                this.age++;
            }
        } else {
            this.alive = 0;
            if (this.neighbors == 2) {
                this.alive = 1;
                this.age = 0;
            }
        }
        if (this.alive == 1) {
            //fill(a1_color);
            fill(255);
        } else {
            if (this.neighbors < 2) {
                fill(0);
            }
            /* else if (this.neighbors < 4) {
                fill(a2_color);
            } else if (this.neighbors < 6) {
                fill(a3_color);
            } else {
                fill(a4_color);
            }*/
        }
        noStroke();
        rect(this.x * cell_size, this.y * cell_size, cell_size, cell_size);
    }
}

//------ FUNCTIONS-----------------------------------
function setup() {
    let canvas = createCanvas(windowWidth - 20, windowHeight - 20);
    //canvas1 = createGraphics(windowWidth - 20, windowHeight - 20);
    //canvas2 = createGraphics(windowWidth - 20, windowHeight - 20);

    capture = createCapture(VIDEO);
    capture.size(windowWidth - 20, windowHeight - 20);
    capture.hide();

    d_color = color(255, 255, 255);
    a1_color = color(100, 255, 255);
    a2_color = color(102, 255, 150);
    a3_color = color(0, 255, 255);
    a4_color = color(255, 220, 255);

}

function draw() {
    if (drawConway == true) {
        console.log("drawing");
        //image(canvas1, 350, 0, 320, 240);
        //update every 2 sec 
        if (frameCount % 10 == 0 && updateTimer > 0) {
            updateTimer--;
        }
        if (updateTimer <= 0) {
            updateTimer = 2;
            background(255, 255, 255);
            //update neighbor count for every cell
            for (let i = 0; i < maxLength - 1; i++) {
                for (let j = 0; j < maxHeight - 1; j++) {
                    countNeighbors(world[i][j]);
                }
            }
            //update cell status
            for (let i = 0; i < maxLength - 1; i++) {
                for (let j = 0; j < maxHeight - 1; j++) {
                    world[i][j].update();
                }
            }
            //noLoop();
        }
    } else {
        background(255);
        image(capture, 0, 0, 320, 240); //camera
        filter(THRESHOLD); //b/w filter
    }
}

//function windowResized() {
//    resizeCanvas(windowWidth - 20, windowHeight - 20);
//}

function keyPressed() {
    if (keyCode === LEFT_ARROW) { //press twice to work
        capture.loadPixels(); //load pixels to read
        for (let y = 0; y < height; y += sepx) {
            let arr = [];
            for (let x = 0; x < width; x += sepy) {
                //console.log(y + ", " + x);
                const i = y * width + x;
                const darkness = (255 - capture.pixels[i * 4]) / 255;
                const dark1 = capture.pixels[i * 4] % 2; //read pixel color
                const radius = 10 * darkness;
                arr.push(new Cell(x / sepy, y / sepx, dark1)); // create conway board
                ellipse(x, y, radius, radius);
            }
            world.push(arr);
        }
        noLoop();
    }

    if (keyCode === UP_ARROW) {
        console.log("up");
        drawConway = true;
        clear();
        loop();
        console.log(drawConway);
    }
    if (keyCode === DOWN_ARROW) {
        console.log("down");
        drawConway = false;
    }
}

function countNeighbors(curr_cell) {
    let neighbors = 0;
    //console.log(maxLength + ", " + maxHeight);
    //console.log(curr_cell.x + ", " + curr_cell.y);

    if (curr_cell.x > 0 && world[curr_cell.x - 1][curr_cell.y].alive == 1) {
        neighbors++;
        //console.log("U");
    }
    if (curr_cell.x < maxLength - 1 && world[curr_cell.x + 1][curr_cell.y].alive == 1) {
        neighbors++;
        //console.log("D");
    }
    if (curr_cell.y > 0 && world[curr_cell.x][curr_cell.y - 1].alive == 1) {
        neighbors++;
        //console.log("L");
    }
    if (curr_cell.y < maxHeight - 1 && world[curr_cell.x][curr_cell.y + 1].alive == 1) {
        neighbors++;
        //console.log("R");
    }
    if (curr_cell.x > 0 && curr_cell.y > 0 && world[curr_cell.x - 1][curr_cell.y - 1].alive == 1) {
        neighbors++;
        //console.log("UL");
    }
    if (curr_cell.x < maxLength - 1 && curr_cell.y > 0 && world[curr_cell.x + 1][curr_cell.y - 1].alive == 1) {
        neighbors++;
        //console.log("DL");
    }
    if (curr_cell.x > 0 && curr_cell.y < maxHeight - 1 && world[curr_cell.x - 1][curr_cell.y + 1].alive == 1) {
        neighbors++;
        //console.log("UR");
    }
    if (curr_cell.x < maxLength - 1 && curr_cell.y < maxHeight - 1 && world[curr_cell.x + 1][curr_cell.y + 1].alive == 1) {
        neighbors++;
        //console.log("DR");
    }
    curr_cell.neighbors = neighbors;
}