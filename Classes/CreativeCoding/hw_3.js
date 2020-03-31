let currPattern = 3; // tracks pattern
let scaleNum = 1; //tracks scale
let spray = false; //pattern drawn constantly
let timeDragged = 0;//count franes
let timeMoved = 0;

function setup() {
    size(1920, 1080);
    background(0);
    noStroke();
    ellipseMode(CENTER);
}

function draw() {

}
function mouseMoved(){
    if (spray) {
        timeMoved++;
        if (timeMoved > 5) { // every 5 frames draw
            pushMatrix();
            translate(random(-200, 100), random(-200, 100)); // translate around poleter
            if (currPattern == 1) {
                pattern1(mouseX, mouseY, 255 * 0.25, 1);
            } else if (currPattern == 2) {
                pattern2(mouseX, mouseY, 255 * 0.05, 1);
            } else if (currPattern == 3) {
                pattern3(mouseX, mouseY, 255 * 0.1, 1);
            }
            popMatrix();
            timeMoved = 0; //reset timer
        }
    }
}
function mouseClicked(){
    if (!spray) {
        if (currPattern == 1) {
            pattern1(mouseX, mouseY, 255 * 0.5, 1);
        } else if (currPattern == 2) {
            pattern2(mouseX, mouseY, 255 * 0.5, 1);
        } else if (currPattern == 3) {
            pattern3(mouseX, mouseY, 255 * 0.5, 1);
        }
    }
    currPattern++;
    if (currPattern > 3) {
        currPattern = 1;
    }
}
function keyPressed(){
    spray = !spray;
}
function mouseDragged(){
    timeDragged++;
    if (timeDragged > 10) { // every 10 frames draw
        scaleNum += 0.5; //increase scale during draw frame
        if (scaleNum > 5) {
            scaleNum = 0.5;
        }
        currPattern += 2; //change pattern
        if (currPattern > 3) {
            currPattern = currPattern % 3;
        }
        pushMatrix();
        translate(random(-100 * scaleNum, 80 * scaleNum), random(-100 * scaleNum, 80 * scaleNum)); //translates  based on scale
        if (currPattern == 1) {
            pattern1(mouseX, mouseY, 255 * 0.1, scaleNum);
        } else if (currPattern == 2) {
            pattern2(mouseX, mouseY, 255 * 0.1, scaleNum);
        } else if (currPattern == 3) {
            pattern3(mouseX, mouseY, 255 * 0.1, scaleNum);
        }
        timeDragged = 0; //reset timer
        popMatrix();
    }
}
function mouseReleased(){
    scaleNum = 1;
}

function pattern1(x_pos, y_pos, alpha, scaling){
    let spacing = 20 * scaling;
    let width_x = 20 * scaling;
    let width_y = 20 * scaling;
    //translate(x_pos, y_pos);
    //rotate(PI/3.0);
    fill(random(255), random(255), random(255), alpha);
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            ellipse(x_pos + x * spacing, y_pos + y * spacing, width_x, width_y);
        }
    }
}

function pattern2(pos_x, pos_y, alpha, scaling){
    let width_x = 20 * scaling;
    let width_y = 20 * scaling;
    let spacing = 20 * scaling;
    let increasing = false;

    for (let x = 1; x < 10; x++) {
        for (let y = 0; y < 5; y++) {
            fill(pos_x % 255, pos_y % 255, width_x);
            ellipse(pos_x + x * spacing, pos_y + spacing * y, width_x, width_y);
        }
        if (increasing) { //stretch
            width_x += 10;
            width_y += 10;
        } else {  //shrink
            width_x -= 10;
            width_y -= 10;
        }
        //when witdth reaches limit it shrinks
        if (width_x > 50 || width_x < 0) {
            increasing = !increasing;
        }
    }
}

function pattern3(pos_x, pos_y, alpha, scaling){
    let width_x = 30 * scaling;
    let width_y = 20 * scaling;
    let spacing = 20 * scaling;

    fill(pos_x + 127 % 255, pos_y + 98 % 255, (pos_x + pos_y) % 255, alpha);

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 5; y++) {
            ellipse(pos_x + x * spacing, pos_y + spacing * y, width_x * 2, width_y - y * 2);
            ellipse(pos_x + x * spacing, pos_y + spacing * y, width_x / 2 - x, width_y * 2);
        }
    }
}