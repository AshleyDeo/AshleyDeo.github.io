//------CLASSES----------------------------------

let bg_r = 0;
let bg_g = 0;
let bg_b = 0;

let xplode = false;
let splode = false;

class Smoke {
    constructor() {
        this.visibility = false;
        this.xOrigin = 0;
        this.yOrigin = 0;
        this.xpos = 20;
        this.ypos = 10
        this.rad = 50; //radius
        this.alpha = 255;
    }

    update() {
        if (this.visibility) {  //if visibility draw
            splode = true;
            bg_r = 255;
            bg_g = 0;
            bg_b = 0;
            push();
            translate(this.xOrigin, this.yOrigin);
            noStroke();
            fill(220, 220, 220, this.alpha);

            for (let j = 0; j < 8; j++) {
                rotate(HALF_PI / 2);
                ellipse(this.xpos, this.ypos, this.rad, this.rad);
                ellipse(-this.xpos, this.ypos, this.rad, this.rad);
                ellipse(0, this.ypos - 10, this.rad, this.rad);
            }

            this.rad += 2;
            this.xpos += 3;
            this.ypos -= 3;
            this.alpha -= 7;
            if (this.alpha <= 0) {
                this.reset();
            }
            pop();

        }
    }

    reset() {
        splode = false;
        this.rad = 50;
        this.visibility = false;
        this.alpha = 255;
        this.xpos = 20;
        this.ypos = 10
    }
}

class Fire {
    constructor(x, y) {
        this.visibility = false;
        this.xOrigin = x;
        this.yOrigin = y;
        this.xpos = 5;
        this.ypos = 0;
        this.rad = 50; //radius
        this.smokes = new Smoke(x, y);
    }

    update() {
        if (this.visibility) { //if visibility draw
            xplode = true;
            bg_r = 255;
            bg_g = 150;
            bg_b = 0;
            push();
            //console.log(this.blow);
            translate(this.xOrigin, this.yOrigin); //center at mouse
            noStroke();
            for (let j = 0; j < 32; j++) {
                rotate(HALF_PI / 8);
                fill(255, 220, 50);
                triangle(this.xpos, this.ypos, -this.xpos, this.ypos, 0, this.ypos * 2);
            }
            for (let j = 0; j < 16; j++) {
                rotate(HALF_PI / 4);
                fill(255, 150, 50);
                triangle(this.xpos, this.ypos / 2, -this.xpos, this.ypos / 2, 0, this.ypos);
            }
            for (let j = 0; j < 8; j++) {
                rotate(HALF_PI / 2);
                fill(255, 50, 50);
                triangle(this.xpos, this.ypos / 4, -this.xpos, this.ypos / 4, 0, this.ypos / 2);
            }
            this.xpos += 1;
            this.ypos -= 4;
            if (this.ypos <= -70) {
                this.reset();
                this.smokes.xOrigin = this.xOrigin; //set explosion to mouse position
                this.smokes.yOrigin = this.yOrigin;
                this.smokes.visibility = true;
            }
            pop();

        }
        this.smokes.update();
    }

    reset() {
        xplode = false;
        this.rad = 50;
        this.visibility = false;
        this.xpos = 5;
        this.ypos = 0;
    }
}

class Bomb {
    constructor(x, y, r) {
        this.xpos = x;
        this.ypos = y;
        this.rotation = r;
        this.onFire = false;
        this.boom = new Fire();
        this.visibility = true;
        this.time = 5;
        this.timer = this.time;
    }

    update() {
        if (this.visibility) { //if visibility draw
            push();
            translate(this.xpos, this.ypos);
            rotate(this.rotation)

            noStroke();
            fill(255, 255, 255);
            rect(-2, -20, 5, -60, 20);

            fill(100, 100, 100);
            stroke(0);
            ellipse(0, 0, 50, 50);
            rectMode(CENTER);
            rect(0, -25, 30, 10, 10);

            pop();

            if (this.onFire) { //start explosion
                this.boom.xOrigin = this.xpos;
                this.boom.yOrigin = this.ypos;
                this.boom.visibility = true;
                this.visibility = false;
            }
        } else {
            if (frameCount % 60 == 0 && this.timer > 0) { //timer til reappear
                this.timer--;
            }
            if (this.timer == 0) {
                //change position
                this.xpos = random(50, width - 50);
                this.ypos = random(50, height - 50);
                //reset values
                this.visibility = true;
                this.timer = this.time;
                this.onFire = false;
            }
        }
        this.boom.update();
    }
}

class Stick {
    constructor(x, y, r) {
        this.xpos = x;
        this.ypos = y;
        this.rotation = r;
        this.onFire = false;
        this.boom = new Fire();
        this.visibility = true;
        this.time = 5;
        this.timer = this.time;
    }

    update() {
        if (this.visibility) {
            push();
            translate(this.xpos, this.ypos);
            rotate(this.rotation)

            noStroke();
            fill(255, 255, 255);
            rect(-2.5, -20, 5, -40, 20);

            rectMode(CENTER);
            fill(255, 0, 0);
            stroke(0);
            rect(0, 0, 10, 50, 10);
            rect(-5, 0, 10, 50, 10);
            rect(5, 0, 10, 50, 5);

            fill(255, 200, 100);
            rect(0, -15, 20, 10);
            rect(0, 15, 20, 10);
            pop();

            if (this.onFire) {
                this.boom.xOrigin = this.xpos;
                this.boom.yOrigin = this.ypos;
                this.boom.visibility = true;
                this.visibility = false;
            }
        } else {
            if (frameCount % 60 == 0 && this.timer > 0) {
                this.timer--;
            }
            if (this.timer == 0) {
                this.xpos = random(50, width - 50);
                this.ypos = random(50, height - 50);
                this.visibility = true;
                this.timer = this.time;
                this.onFire = false;
            }

        }
        this.boom.update();
    }
}
//------GLOBAL VARS---------------------------------
let fire1 = new Fire();
let bombs = [10];
let sticks = [10];
let boomTime = 8;
let boomTimer = boomTime;

//------ FUNCTIONS-----------------------------------
function setup() {
    let canvas = createCanvas(windowWidth - 20, windowHeight - 20);
    for (let i = 0; i < 10; i++) {
        bombs[i] = new Bomb(random(50, width - 50), random(50, height - 50), random(PI * 2));
    }
    for (let i = 0; i < 10; i++) {
        sticks[i] = new Stick(random(50, width - 50), random(50, height - 50), random(PI * 2));
    }
}

function draw() {
    checkSplode();
    background(bg_r, bg_g, bg_b);
    //console.log(boomTimer);

    if (frameCount % 60 == 0 && boomTimer > 0) {
        boomTimer--;
    }
    if (boomTimer == 0) { // explode random bomb
        let bombType = int(random(10));
        let bombNum = int(random(10));
        //console.log(bombType);
        if (bombType > 2 && bombType < 6) {
            bombs[bombNum].onFire = true;
        }
        if (bombType > 5 && bombType < 9) {
            sticks[bombNum].onFire = true;
        }
        boomTimer = boomTime;
    }
    let xplode = false;
    for (let i = 0; i < 10; i++) {
        bombs[i].update();
        sticks[i].update();
    }
}

function checkSplode() { //change background when exploding
    bg_r = 168;
    bg_g = 213;
    bg_b = 255;

    if (splode) {
        bg_r = 255;
        bg_g = 0;
        bg_b = 0;
    }
    if (xplode) {
        bg_r = 255;
        bg_g = 150;
        bg_b = 0;
    }

    //console.log(bg_r);
}

function windowResized() {
    resizeCanvas(windowWidth - 20, windowHeight - 20);
}

function mouseClicked() {
    for (let i = 0; i < 10; i++) {
        if (mouseX <= bombs[i].xpos + 25 && mouseX >= bombs[i].xpos - 25) {
            if (mouseY <= bombs[i].ypos + 25 && mouseY >= bombs[i].ypos - 35) {
                bombs[i].onFire = true;
            }
        }
        if (mouseX <= sticks[i].xpos + 10 && mouseX >= sticks[i].xpos - 10) {
            if (mouseY <= sticks[i].ypos + 25 && mouseY >= sticks[i].ypos - 35) {
                sticks[i].onFire = true;
            }
        }
    }
}

// Adjective: Explosive