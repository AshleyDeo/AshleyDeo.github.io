let angle = 1.5
let canvasWidth = 1400; 
let canvasHeight = 1100; 

function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

function draw() {
    background(0);
    //sun
    fill(255, 255, 0);
    stroke(0);
    ellipse(canvasWidth / 2, canvasHeight / 2, 150, 150);
    fill(255, 200, 0);
    stroke(0,0,0,0);
    ellipse(canvasWidth / 2, canvasHeight / 2, 125, 125);

    ///PLANETS
    //1
    strokeWeight(2);
    stroke(255);
    fill(0, 0, 0, 0);
    ellipse(canvasWidth / 2, canvasHeight / 2, 350, 350);
    
    stroke(0);
    fill(100, 100, 100);
    ellipse((canvasWidth / 2) + (175 * cos(30)), (canvasHeight / 2) + (175 * sin(30)), 50, 50);

    //2
    strokeWeight(2);
    stroke(255);
    fill(0, 0, 0, 0);
    ellipse(canvasWidth / 2, canvasHeight / 2, 500, 500);

    stroke(0);
    fill(150, 150, 100);
    ellipse((canvasWidth / 2) + (250 * cos(30)), (canvasHeight / 2) + (250 * sin(-30)), 50, 50);

    //3
    strokeWeight(2);
    stroke(255);
    fill(0, 0, 0, 0);
    ellipse(canvasWidth / 2, canvasHeight / 2, 600, 600);

    stroke(0);
    fill(23, 255, 205);
    ellipse((canvasWidth / 2) + (300 * cos(100)), (canvasHeight / 2) + (300 * sin(100)), 50, 50);

    //4
    strokeWeight(2);
    stroke(255);
    fill(0, 0, 0, 0);
    ellipse(canvasWidth / 2, canvasHeight / 2, 700, 700);

    stroke(0);
    fill(200, 76, 22);
    ellipse((canvasWidth / 2) + (350 * cos(15)), (canvasHeight / 2) + (350 * sin(15)), 50, 50);

    //5
    strokeWeight(2);
    stroke(255);
    fill(0, 0, 0, 0);
    ellipse(canvasWidth / 2, canvasHeight / 2, 1000, 900);

    stroke(0);
    fill(255, 148, 33);
    ellipse((canvasWidth / 2) + (500 * cos(0)), (canvasHeight / 2) + (450 * sin(0)), 50, 50);

    //6
    strokeWeight(2);
    stroke(255);
    fill(0, 0, 0, 0);
    ellipse(canvasWidth / 2, canvasHeight / 2, 1100, 1000);

    stroke(0);
    fill(255, 210, 28);
    ellipse((canvasWidth / 2) + (550 * cos(-150)), (canvasHeight / 2) + (500 * sin(-150)), 50, 50);

    //7
    strokeWeight(2);
    stroke(255);
    fill(0, 0, 0, 0);
    ellipse(canvasWidth / 2, canvasHeight / 2, 1200, 1100);

    stroke(0);
    fill(181, 244, 255);
    ellipse((canvasWidth / 2) + (600 * cos(3.2)), (canvasHeight / 2) + (550 * sin(3.2)), 50, 50);

    //8
    strokeWeight(2);
    stroke(255);
    fill(0, 0, 0, 0);
    ellipse(canvasWidth / 2, canvasHeight / 2, 1300, 1200);

    stroke(0);
    fill(66, 104, 255);
    ellipse((canvasWidth / 2) + (650 * cos(-2.2)), (canvasHeight / 2) + (600 * sin(-2.2)), 50, 50);

}