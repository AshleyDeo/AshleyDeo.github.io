let patternNum = 0; //press # on keyboard to switch patterns
let colorSwitch = false;
let color1;
let bcolor1;
let timer1 = 2;

let changerX = 0;
let changerY = 0;

let timer4 = 2;

function setup() {
    size(1920, 1080);
    color1 = color(255);
    bcolor1 = color(0);
}

function draw() {
    ellipseMode(CENTER);
    if (patternNum == 0) { //start page
        background(0);
        let instuct1 = "Check the console for instructions";
        let instuct2 = "Press 0 for help";
        textSize(64);
        fill(255);
        text(instuct1, width / 5, height / 2 - 100, width - 100, 200);
        text(instuct2, width / 3, height / 2, width - 100, 200);

    } else if (patternNum == 1) { //------------------------------------------------------------
        if (colorSwitch) { //press c: switch colors every 2 sec
            if (frameCount % 60 == 0 && timer1 > 0) {
                timer1--;
            }
            if (timer1 <= 0) {
                bcolor1 = color(random(255), random(255), random(255));
                color1 = color(random(255), random(255), random(255));
                timer1 = 2;
            }
        }

        background(bcolor1);
        fill(color1);

        noStroke();
        let col = 50;
        let row = 25;
        let width_x = 40;
        let width_y = 42;

        for (let x = 0; x < col + 2; x++) {
            for (let y = 0; y < row + 2; y++) {
                ellipse(width * x / col, height * y / row, width_x, width_y);
            }
        }

    } else if (patternNum == 2) { //------------------------------------------------------------
        background(0);
        strokeWeight(2);
        stroke(0);
        fill(162, 74, 217);
        let col = 70;
        let row = 40;
        let width_x = 40;
        let width_y = 40;
        let pos_x;
        let pos_y;
        for (let x = -1; x < col + 2; x++) {
            for (let y = -1; y < row + 2; y++) {
                pos_x = width * x / col;
                pos_y = height * y / row;

                //stretch x based on mouse x + 100 and -100
                if (changerX + 100 < pos_x || changerX - 100 > pos_x) {
                    width_x = 10;
                } else {
                    width_x = 40;
                }
                //stretch y based on mouse y + 100 and -100
                if (changerY - 200 < pos_y && changerY + 200 > pos_y) {
                    width_y -= 5;
                } else {
                    width_y = 20;
                }
                ellipse(pos_x, pos_y, width_x, width_y);
            }
        }

    } else if (patternNum == 3) { //------------------------------------------------------------
        background(0);
        strokeWeight(2);
        stroke(0);
        fill(16, 134, 143);
        let col = 30;
        let row = 15;
        let width_x = 200;
        let width_y = 100;
        let pos_x;
        let pos_y;
        let increasing = false;

        for (let x = 1; x < col; x++) {
            for (let y = 0; y < row + 1; y++) {
                pos_x = width * x / col;
                pos_y = height * y / row;
                ellipse(pos_x, pos_y, width_x, width_y);
            }
            if (increasing) { //stretch
                width_x += 25;
                width_y += 25;
            } else {  //shrink
                width_x -= 25;
                width_y -= 25;
            }
            //when witdth reaches limit it shrinks
            if (width_x > 200 || width_x < 0) {
                increasing = !increasing;
            }
        }

    } else if (patternNum == 4) { //------------------------------------------------------------
        background(0);
        fill(255);
        noStroke();
        let pos_x = width / 2;
        let pos_y = height / 2;
        spiralDraw(pos_x, pos_y, 9, 0);

    } else if (patternNum == 5) { //------------------------------------------------------------
        background(0);
        fill(255);
        noStroke();
        let pos_x = 0;
        let pos_y = 0;
        let col = 11;
        let row = 10;
        let width_x = 40;
        let width_y = 40;

        for (let x = 0; x < col; x++) {
            for (let y = 0; y < row; y++) {
                ellipse(pos_x, pos_y, width_x, width_y);

                pos_y += height * y / row;
                if (pos_y > height + (width_y / 2)) { //if off screen>>reset
                    pos_y = 0;
                }
                pos_x += width_x;
                if (pos_x > width + (width_x / 2)) { //if off screen>>reset
                    pos_x = 0;
                }
                width_y += 2;
            }
            pos_y = 0;
            width_x += 2;
        }
    }
}

function keyPressed() {
    if (key == 48) {
        prletln("Press number 1 - 5 for patterns");
        if (patternNum == 1) {
            prletln("Press C to turn on/off color changer");
        }
        if (patternNum == 2) {
            prletln("Move Mouse");
        }
    }
    if (key == 49) { // 1
        patternNum = 1;
        prletln("Pattern 1");
    }
    if (key == 50) { // 2
        patternNum = 2;
        prletln("Pattern 2");
    }
    if (key == 51) { // 3
        patternNum = 3;
        prletln("Pattern 3");
    }
    if (key == 52) { // 4
        patternNum = 4;
        prletln("Pattern 4");
    }
    if (key == 53) { // 5
        patternNum = 5;
        prletln("Pattern 5");
    }
    if (patternNum == 1) {
        if (key == 67 || key == 99) { // C
            colorSwitch = !colorSwitch;
            prlet("Color Changer: ");
            if (colorSwitch) {
                prlet("ON\n");
            } else {
                prlet("OFF\n");
            }
        }
    }
}

function mouseMoved() {
    if (patternNum == 2) { // update mouse position
        changerX = mouseX;
        changerY = mouseY;
    }
}

function spiralDraw(x, y, circleLevel, direction) {
    if (circleLevel <= 0) {
        return; //stop when circleLevel = 0
    }
    if (direction == 0) {
        // draw new circle to diff posiiton
        spiralDraw(x + (100 * (10 - circleLevel)), y - (150 * (10 - circleLevel)), circleLevel - 1, 2); //top right
        spiralDraw(x - (100 * (10 - circleLevel)), y - (150 * (10 - circleLevel)), circleLevel - 1, 1); //top left
        spiralDraw(x + (100 * (10 - circleLevel)), y + (150 * (10 - circleLevel)), circleLevel - 1, 3); //bottom right
        spiralDraw(x - (100 * (10 - circleLevel)), y + (150 * (10 - circleLevel)), circleLevel - 1, 4); //bottom left
    }
    if (direction == 1) {
        spiralDraw(x + (90 * (10 - circleLevel)), y - (110 * (10 - circleLevel)), circleLevel - 1, 2); //top right
        spiralDraw(x + (110 * (10 - circleLevel)), y + (90 * (10 - circleLevel)), circleLevel - 1, 3); //bottom right
    }
    if (direction == 2) {
        spiralDraw(x + (120 * (10 - circleLevel)), y - (80 * (10 - circleLevel)), circleLevel - 1, 2); //top right
        spiralDraw(x - (80 * (10 - circleLevel)), y - (120 * (10 - circleLevel)), circleLevel - 1, 1); //top left
    }
    if (direction == 3) {
        spiralDraw(x + (130 * (10 - circleLevel)), y + (70 * (10 - circleLevel)), circleLevel - 1, 3); //bottom right
        spiralDraw(x - (70 * (10 - circleLevel)), y + (130 * (10 - circleLevel)), circleLevel - 1, 4); //bottom left
    }
    if (direction == 4) {
        spiralDraw(x - (140 * (10 - circleLevel)), y - (60 * (10 - circleLevel)), circleLevel - 1, 1); //top left
        spiralDraw(x - (60 * (10 - circleLevel)), y + (140 * (10 - circleLevel)), circleLevel - 1, 4); //bottom left
    }

    fill(255 / circleLevel, 100, 100);
    ellipse(x, y, 50 + (10 * (9 - circleLevel)), 50 + (10 * (9 - circleLevel)));
}