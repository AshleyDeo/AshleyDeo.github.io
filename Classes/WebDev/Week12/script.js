//Hi Hello
//Stop clicking me
//It's dark 

//Light on
//It's too bright

//Follow
//I don't like this color

//Click 10x
//Final Grade: C
//Guess you did ok

//Perfect
//That's better
//Now change the color

//Sleep
//Jerk
//I'm gonna just sleep

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

let link; 
let backgroundColor = 0;

let start = true;
let lightOn = false;
let sleep = false;
let follow = false;
let perfect = false;
let clickCount = 0;
let fade = 255;

let text1 = ["Hi", "Hello", "STOP IT!!!","It's dark...", "It's too bright!!"]
let tindex = 0;

let circle1;
let circle2;
let circle3;
let circle4;
let circle5;
let drawText = false;

function setup() {
    createCanvas(canvasWidth, canvasHeight - 10);

    circle1 = new CirclButt(canvasWidth/2, canvasHeight - 200, 100)
    circle5 = new CirclButt(canvasWidth/2, canvasHeight - 200, 100)
    circle2 = new CirclButt(((2 * canvasWidth) / 3) + 100, canvasHeight - 200, 100)
    circle3 = new CirclButt(((1 * canvasWidth) / 4), canvasHeight - 200, 100)
    circle4 = new CirclButt(((3 * canvasWidth) / 4), canvasHeight - 200, 100)
}

function draw() {
    background(backgroundColor);

    var distance = dist(mouseX, mouseY, 55, 50);

    //Back Button
    if (distance < 25) {
        goBack = true;
    } else {
        goBack = false;
    }
    if (goBack == true) {
        textAlign(CENTER);
        fill(0, 255, 195);
        cursor(HAND);
        textSize(32);
        text("Back", 120, 40)
    } else {
        fill(100, 255, 195);
        cursor(ARROW);
    }
    triangle(20, 30, 70, 5, 70, 55)

    //Starting
    if (start) {
        if (clickCount > 19) {
            fade = 255;
            text("Whatever. Just let me sleep...", canvasWidth / 2, canvasHeight / 3)

        } else {
            if (circle1.distance() < circle1.diameter) {
                circle1.display(100, 100, 100, 1)
                circle1.hovering = true;
            } else {
                circle1.display(200, 200, 200, 1);
                circle1.hovering = false;
            }
        }
       
        if (drawText) {
            textAlign(CENTER);
            fill(255, 255, 255, fade);
            textSize(64);
            if (clickCount < 11) {
                text(text1[int(tindex)], canvasWidth / 2, canvasHeight / 3)
            }
            if (clickCount == 11) {
                text(text1[2], canvasWidth / 2, canvasHeight / 3)
            }

            if (clickCount > 12 && clickCount < 20) {
                text("It's dark...", canvasWidth / 2, canvasHeight / 3)
            }
            if (fade < 0) {
                drawText = false;
                fade = 255;
            } else {
                fade -= 2;
            }
        }
        if (clickCount > 12 && clickCount < 20) {
            circle2.display(255, 247, 0)
            if (circle2.distance() < circle2.diameter) {
                circle2.display(155, 147, 0, 1)
                circle2.hovering = true;
            } else {
                circle2.display(255, 247, 0, 1);
                circle2.hovering = false;
            }
        }
    }

    if (lightOn) {
        if (drawText) {
            textAlign(CENTER);
            fill(0, 0, 0, fade);
            textSize(64);
            text("It's too bright!!", canvasWidth / 2, canvasHeight / 3);
            if (fade < 0) {
                drawText = false;
                fade = 255;
            } else {
                fade -= 2;
            }
        }

        if (circle3.distance() < circle3.diameter) {
            circle3.display(240, 240, 100)
            circle3.hovering = true;
        } else {
            circle3.display(100, 100, 0);
            circle3.hovering = false;
        }
        circle4.display(0, 0, 0)

        if (circle4.distance() < circle4.diameter) {
            circle4.hovering = true;
        } else {
            circle4.hovering = false;
        }
    }

    if (follow) {

        if (clickCount < 10) {
            circle5.display(100, 100, 200)
            if (circle5.distance() < circle5.diameter) {
                circle5.hovering = true;
            } else {
                circle5.hovering = false;
            }
            if (drawText) {
                textAlign(CENTER);
                fill(0, 0, 0, fade);
                textSize(64);
                text("I don't like this color.", canvasWidth / 2, canvasHeight / 3)
            }
        } else {
            textAlign(CENTER);
            fill(0, 0, 0, fade);
            textSize(90);
            text("Fine. I'm done with you. You may leave.", canvasWidth / 2, canvasHeight / 3)
        }
    }

    if (perfect) {
        textAlign(CENTER);
        fill(255, 255, 255, fade);
        textSize(80);
        text("Just wow. ", canvasWidth / 2, canvasHeight / 3)
        text("Not too great at following instructions.", canvasWidth / 2, (canvasHeight / 3) +100)
    }
}

function mousePressed() {
    if (goBack == true) {
        window.open('../webdev.html', "_self")
    }

    if (circle1.hovering) {
        fade = 255;
        drawText = true;
        clickCount++;
        tindex = random(2);
        if (clickCount == 13) {
            circle1.x -= 200;
        }
    }
    if (circle2.hovering) {
        start = false;
        lightOn = true;
        backgroundColor = color(255, 247, 0);
        clickCount = 0;
        drawText = true;
    }
    if (circle3.hovering) {
        drawText = true;
        clickCount=0;
        //if (clickCount == 1) {
        backgroundColor = color(225, 227, 0);
        //}
        //if (clickCount > 3) {
            lightOn = false;
            follow = true;
            clickCount = 0;
        //}
    }
    if (circle4.hovering) {
        backgroundColor = 0;
        lightOn = false;
        sleep = false;
        follow = false;
        perfect = true;
        clickCount = 0;
        fade = 255;
    }
    if (circle5.hovering) {
        clickCount++;
        backgroundColor = color(random(255), random(255), random(255));
    }


}
class CirclButt {
    constructor(x,y,d) {
        this.x = x;
        this.y = y;
        this.diameter = d;
        this.hovering = false;
    }

    display(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }

    distance() {
        return dist(mouseX, mouseY, this.x, this.y);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}