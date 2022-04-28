import React from "react";
import Sketch from "react-p5";


const Sketch13D = p5 => {

    let MAGNITUDE = 12000;
    let HEIGHT = window.innerHeight
    let WIDTH = window.innerWidth
    let GRID_X = 100; //grid amount X
    let GRID_Y = 100;
    let GRID_W;
    let GRID_H;
    let SPEED = 20;
    let MOTION = 0;

    let canvas;

    let HDC_outer;
    let HDC_inner;
    let DOME__OUTER;


    //colors
    let BG = 0;
    let FG = "#f1f1f1"
    let _green1 = "#00ff67"
    let _green2 = "#afc6ae"


    const setup = (p5, canvasParantRef) => {
        canvas = p5.createCanvas(WIDTH, HEIGHT, p5.WEBGL).parent(canvasParantRef);
        HDC_outer = p5.loadImage('https://api.collectie.gent/iiif/image/iiif/2/5ef857c9b8b605791a2024c09daf2ed1-MA_SCMS_FO_00682.tif/full/1920,/0/default.jpg');
        HDC_inner = p5.loadImage("hdc_01.jpeg");
    }

    const draw = p5 => {

        GRID_W = MAGNITUDE / GRID_X
        GRID_H = MAGNITUDE / GRID_Y;

        // -------- SCENE -----------//
        p5.background(BG);
        p5.perspective(p5.PI/3.0, p5.float(WIDTH/HEIGHT), 1, 10000);

        p5.push();
        p5.translate(0, 300, MOTION);
        p5.rotateX(p5.radians(90));

        // outer__dome;
        p5.push();
        //p5.texture(HDC_inner);
        p5.rotateX(p5.radians(-90));
        p5.rotateY(p5.radians(p5.frameCount*0.2));
        p5.translate(0, -2200, 0);
        p5.sphere(3000);
        p5.pop();

        // __draw grid for floor ref. (boxes)__ //

        //p5.fill(BG)
        p5.rectMode(p5.CENTER);
        p5.push()
        p5.stroke("#ff0000");
        p5.translate(0, 20);
        p5.rect(0, 0, MAGNITUDE, MAGNITUDE);
        p5.pop()

        p5.noFill();

        for (let x = 0; x < GRID_X; x++) {
            for (let y = 0; y < GRID_Y; y++) {
                p5.push()
                p5.translate(GRID_W/2 - MAGNITUDE/2 + GRID_W * x, GRID_H/2 - MAGNITUDE/2 + GRID_H * y);
                p5.box(5);
                p5.pop()
            }
        }

        p5.push()
        p5.translate(300, -700, 400);
        //p5.texture(HDC_inner);
        p5.stroke(_green2)
        p5.fill(0, 255, 103, 63)
        p5.rotateX(p5.radians(-90));
        p5.rotateY(p5.radians(p5.frameCount));
        p5.sphere(300);
        p5.pop()

        p5.rotateY(p5.radians(p5.frameCount));
        // inner sphere
        p5.stroke(_green1);
        p5.fill(175, 198, 174, 67);
        p5.sphere(500);

        p5.pop();

        if(p5.keyPressed) {
            if (p5.key == 'z' | p5.key == 'w') {
                MOTION += SPEED; // move forward
                console.log("forward")
            } else if (p5.key == 's') {
                MOTION -= SPEED; // move backwards
                console.log("backwards")
            }
        }

    }

    window.onresize = function() {
        HEIGHT = window.innerHeight
        WIDTH = window.innerWidth
        canvas.size(WIDTH, HEIGHT);
    }

    return (<Sketch setup={setup} draw={draw}/>)
}

export default Sketch13D;
