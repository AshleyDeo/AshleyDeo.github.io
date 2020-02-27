class BlanketMonster {
    constructor(x, y) {
        this.pos_x = x;
        this.pos_y = y;
        this.orig_rgb; //original color 
        this.blanket_rgb; //color var

        this.touch = 0; // touch bool for arm
        this.armLength = 10;
        this.anger = 0; //anger bool for shake
        this.annoyTimer = 3; //time til popup
        this.faceTimer = 2; //timer for face
        this.armBack = 0; //bool for slide arm back

        this.text_pos_x = 900;
        this.text_pos_y = 400;
        this.text_mov = 5; //speed of Z text
        this.fontsize = 60;
    }

    update() {
        // Arm
        strokeWeight(4);
        stroke(51);
        fill(252, 213, 114);
        rect(pos_x + 450, pos_y + 100, armLength, 50, 30);

        //Blanket
        fill(blanket_rgb);
        strokeWeight(4);
        stroke(51);
        rect(pos_x + 50, pos_y, 800, 220, 20);

        //Bumps
        //fill(255);
        strokeWeight(5);
        stroke(51);
        arc(pos_x + 250, pos_y + 50, 400, 350, PI, TWO_PI, OPEN);
        arc(pos_x + 625, pos_y + 60, 450, 300, PI, TWO_PI, OPEN);

        if (pillow1.clicked == 1) {
            blanket_rgb = color(45, 59, 252);
            sleep();
        } else if (anger == 1) { //click on monster
            shake();
        } else if (touch == 1) { //clicked on circle
            moveArm();
        } else {
            orig_rgb = color(3, 240, 252);
        }

    }

    reset() { //reset monster vars
        pos_x = 400;
        pos_y = 400;
        blanket_rgb = orig_rgb;
        armLength = 10;
    }

    sleep() {
        fill(0);
        textSize(fontsize);
        text("Z", text_pos_x, text_pos_y);

        //move text
        text_pos_x += text_mov;
        text_pos_y -= text_mov;
        fontsize += 2;

        if (text_pos_y < 0) { //when off screen reset text animation
            text_pos_x = 900;
            text_pos_y = 400;
            fontsize = 60;
        }
    }

    moveArm() {
        blanket_rgb = color(252, 245, 114);

        fill(0);
        textSize(110);
        text("??", width / 2, 200);

        if (armLength >= 1000 || armBack == 1) { //when arm reaches circle come back
            armBack = 1;
            armLength -= 20;
        } else { // move arm out
            armLength += 10;
        }

        if (armBack == 1 && armLength <= 10) { // reset arm vars
            armLength = 10;
            touch = 0;
            armBack = 0;
            reset();
        }
    }

    shake() {
        blanket_rgb = color(255, 0, 0);
        pos_x += random(-7, 7);
        pos_y += random(-7, 7);

        //check if monster is outside radius and redo calc
        while (pos_x > 407 || pos_x < 393) {
            pos_x = 400;
            pos_x += random(-7, 7);
        }

        while (pos_y > 407 || pos_y < 393) {
            pos_y = 400;
            pos_y += random(-7, 7);
        }

        //Timer til popup
        //60 fps
        if (frameCount % 60 == 0 && annoyTimer > 0) {
            annoyTimer--;
        }
        if (annoy >= 3 || annoyTimer <= 0) { //call popup face
            drawAll = 0;
            drawFace();
            //timer popup lasts
            if (frameCount % 60 == 0 && faceTimer > 0) {
                faceTimer--;
            }
            if (faceTimer == 0) { //reset when finished
                drawAll = 1;
                anger = 0;
                annoy = 0;
                faceTimer = 3;
                annoyTimer = 3;
                reset();
            }
        }
    }
}

class Pillow {
    constructor(x, y) {
        this.pos_x = x;
        this.pos_y = y;
        this.clicked = 0;
    }

    update() {
        fill(200);
        strokeWeight(4);
        stroke(51);
        rect(pos_x, pos_y, 200, 100);
        strokeWeight(5);
        //fill(255);
        arc(pos_x + 5, pos_y + 50, 50, 100, HALF_PI, HALF_PI + PI, OPEN);
        //arc(pos_x + 195, pos_y + 50, 50, 100, -HALF_PI, HALF_PI, OPEN);
        ellipse(pos_x + 195, pos_y + 50, 75, 100);

        if (clicked == 1) {
            monster.blanket_rgb = color(45, 59, 252);
            monster.sleep();
        }
    }
}

let canvasWidth = 1400;
let canvasHeight = 1100;

const monster = new BlanketMonster(400, 400);
const pillow1 = new Pillow(100, 100);

let annoy = 0; //# of clicks on Monster
let drawAll = 1; // draw all except face

function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

function draw(){
    if (drawAll == 1) { //draw everything
        background(200, 100, 200);
        monster.update();
        pillow1.update();
        fill(61, 204, 118);
        ellipse(1900, 500, 150, 150);
    } else { //remove other objs
        background(200, 100, 200);
        monster.update();
    }
    //drawFace();
}

function drawFace(){ //pop up
    noStroke();
    fill(0);
    rect(0, 0, width, height);

    rectMode(CENTER);
    fill(255, 0, 0);//eye blood
    rect(width / 2 - 300, 500, 50, 400, 50);
    rect(width / 2 + 300, 500, 50, 400, 50);
    fill(255);//eyes
    ellipse(width / 2 - 300, 300, 200, 100);
    ellipse(width / 2 + 300, 300, 200, 100);

    fill(255);//mouth
    ellipse(width / 2, 800, 500, 200);

    fill(0);//teeth 
    ellipse(width / 2, 700, 50, 100);
    ellipse(width / 2 + 50, 900, 50, 100);

    for (let i = 0; i < 2; i++) {
        ellipse(width / 2 + 100 * (i + 1), 700, 50, 100);
        ellipse(width / 2 - 100 * (i + 1), 700, 50, 100);
        ellipse(width / 2 + 50 + 100 * (i + 1), 900, 50, 100);
        ellipse(width / 2 + 50 - 100 * (i + 1), 900, 50, 100);
    }
    //reset rectMode
    rectMode(CORNER);
}


function mouseClicked() {
    if (mouseX >= 100 && mouseX <= 300) {
        if (mouseY >= 100 && mouseY <= 250) { //click pillow
            pillow1.clicked = 1 - pillow1.clicked;
            if (pillow1.clicked == 0) {
                monster.reset();
            }
        }
    }

    if (mouseX >= 1800 && mouseX <= 2050 &&
        mouseY >= 500 && mouseY <= 750) { // click circle
        monster.touch = 1 - monster.touch;
        if (monster.touch == 0) {
            monster.reset();
        }
    }


    if (mouseX >= 400 && mouseX <= 1500 &&
        mouseY >= 400 && mouseY <= 900) { //click monster
        monster.anger = 1 - monster.anger;
        if (monster.anger == 0) {
            annoy += 1; //increase annoyance
            monster.reset();
        }
    }
}