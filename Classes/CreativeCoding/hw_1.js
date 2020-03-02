let annoy = 0; //# of clicks on Monster
let drawAll = 1; // draw all except face

class BlanketMonster {
    constructor(x_, y_, color_) {
        this.pos_x = x_;
        this.pos_y = y_;
        this.orig_rgb = color_; //original color 
        this.blanket_rgb = this.orig_rgb; //color var

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
        rect(this.pos_x + 450, this.pos_y + 100, this.armLength, 50, 30);

        //Blanket
        fill(this.blanket_rgb);
        strokeWeight(4);
        stroke(51);
        rect(this.pos_x + 50, this.pos_y, 800, 220, 20);

        //Bumps
        //fill(255);
        strokeWeight(5);
        stroke(51);
        arc(this.pos_x + 250, this.pos_y + 50, 400, 350, PI, TWO_PI, OPEN);
        arc(this.pos_x + 625, this.pos_y + 60, 450, 300, PI, TWO_PI, OPEN);

        if (pillow1.clicked == 1) {
            this.blanket_rgb = color(45, 59, 252);
            this.sleep();
        } else if (this.anger == 1) { //click on monster
            this.shake();
        } else if (this.touch == 1) { //clicked on circle
            this.moveArm();
        } else {
            this.orig_rgb = color(3, 240, 252);
        }

    }

    reset() { //reset monster vars
        this.pos_x = 400;
        this.pos_y = 400;
        this.blanket_rgb = this.orig_rgb;
        this.armLength = 10;
    }

    sleep() {
        fill(0);
        textSize(this.fontsize);
        text("Z", this.text_pos_x, this.text_pos_y);

        //move text
        this.text_pos_x += this.text_mov;
        this.text_pos_y -= this.text_mov;
        this.fontsize += 2;

        if (this.text_pos_y < 0) { //when off screen reset text animation
            this.text_pos_x = 900;
            this.text_pos_y = 400;
            this.fontsize = 60;
        }
    }

    moveArm() {
        this.blanket_rgb = color(252, 245, 114);

        fill(0);
        textSize(110);
        text("??", windowWidth / 2, 200);

        if (this.armLength >= 1000 || this.armBack == 1) { //when arm reaches circle come back
            this.armBack = 1;
            this.armLength -= 20;
        } else { // move arm out
            this.armLength += 10;
        }

        if (this.armBack == 1 && this.armLength <= 10) { // reset arm vars
            this.armLength = 10;
            this.touch = 0;
            this.armBack = 0;
            this.reset();
        }
    }

    shake() {
        this.blanket_rgb = color(255, 0, 0);
        this.pos_x += random(-7, 7);
        this.pos_y += random(-7, 7);

        //check if monster is outside radius and redo calc
        while (this.pos_x > 407 || this.pos_x < 393) {
            this.pos_x = 400;
            this.pos_x += random(-7, 7);
        }

        while (this.pos_y > 407 || this.pos_y < 393) {
            this.pos_y = 400;
            this.pos_y += random(-7, 7);
        }

        //Timer til popup
        //60 fps
        if (frameCount % 60 == 0 && this.annoyTimer > 0) {
            this.annoyTimer--;
        }
        if (annoy >= 3 || this.annoyTimer <= 0) { //call popup face
            drawAll = 0;
            drawFace();
            //timer popup lasts
            if (frameCount % 60 == 0 && this.faceTimer > 0) {
                this.faceTimer--;
            }
            if (this.faceTimer == 0) { //reset when finished
                drawAll = 1;
                this.anger = 0;
                annoy = 0;
                this.faceTimer = 3;
                this.annoyTimer = 3;
                this.reset();
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
        rect(this.pos_x, this.pos_y, 200, 100);
        strokeWeight(5);
        //fill(255);
        arc(this.pos_x + 5, this.pos_y + 50, 50, 100, HALF_PI, HALF_PI + PI, OPEN);
        //arc(pos_x + 195, pos_y + 50, 50, 100, -HALF_PI, HALF_PI, OPEN);
        ellipse(this.pos_x + 195, this.pos_y + 50, 75, 100);

        if (this.clicked == 1) {
            monster.blanket_rgb = color(45, 59, 252);
            monster.sleep();
        }
    }
}

let canvasWidth = 1400;
let canvasHeight = 1100;

let monster;
let pillow1 = new Pillow(100, 100);

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    monster = new BlanketMonster(400, 400, color(3, 240, 252));
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
    rect(0, 0, windowWidth, windowHeight);

    rectMode(CENTER);
    fill(255, 0, 0);//eye blood
    rect(windowWidth / 2 - 300, 500, 50, 400, 50);
    rect(windowWidth / 2 + 300, 500, 50, 400, 50);
    fill(255);//eyes
    ellipse(windowWidth / 2 - 300, 300, 200, 100);
    ellipse(windowWidth / 2 + 300, 300, 200, 100);

    fill(255);//mouth
    ellipse(windowWidth / 2, 800, 500, 200);

    fill(0);//teeth 
    ellipse(windowWidth / 2, 700, 50, 100);
    ellipse(windowWidth / 2 + 50, 900, 50, 100);

    for (let i = 0; i < 2; i++) {
        ellipse(windowWidth / 2 + 100 * (i + 1), 700, 50, 100);
        ellipse(windowWidth / 2 - 100 * (i + 1), 700, 50, 100);
        ellipse(windowWidth / 2 + 50 + 100 * (i + 1), 900, 50, 100);
        ellipse(windowWidth / 2 + 50 - 100 * (i + 1), 900, 50, 100);
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