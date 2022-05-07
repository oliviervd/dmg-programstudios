import React ,{useEffect} from "react";
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

    let xOff = 0;
    let yOff = 1;
    let zOff = 2;

    let canvas;

    let HDC_outer;
    let HDC_inner;
    let DOME__OUTER;


    //colors
    let BG = 0;
    let FG = "#f1f1f1"
    let _green1 = "#00ff67"
    let _green2 = "#afc6ae"

    const preload = (p5) => {
        HDC_outer = p5.loadImage('hdc_01.jpeg');
        p5.redraw();
    }


    const setup = (p5, canvasParantRef) => {
        canvas = p5.createCanvas(WIDTH, HEIGHT, p5.WEBGL).parent(canvasParantRef);
        //HDC_inner = p5.loadImage("https://api.collectie.gent/iiif/image/iiif/2/b7a376735df545a775899c6efb23f808-MA_SCMS_FO_00683.tif/624,661,1992,1423/full/0/default.jpg");
        //p5.tint(255, 127);
    }

    const draw = p5 => {


        GRID_W = MAGNITUDE / GRID_X
        GRID_H = MAGNITUDE / GRID_Y;

        let eyeX = WIDTH/2.0 + p5.map(p5.mouseX, 0, WIDTH, 0, 1000);
        let eyeY = HEIGHT/2.0;
        let eyeZ =(HEIGHT/2.0) / p5.tan(p5.PI*30.0 / 180.0);
        let centerX = WIDTH/2.0;
        let centerY = HEIGHT/2.0;
        let centerZ = 0;
        let upX = 0;
        let upY = 1;
        let upZ = 0;
        p5.camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ);

        // -------- SCENE -----------//
        p5.background(BG);
        p5.perspective(p5.PI/3.0, p5.float(WIDTH/HEIGHT), 1, 10000);

        p5.push();
        p5.translate(0, 750, MOTION);
        p5.rotateX(p5.radians(90));

        // outer__dome;
        p5.push();
        //p5.texture(HDC_inner);
        p5.rotateX(p5.radians(-90));
        p5.rotateY(p5.radians(p5.frameCount*0.2));
        p5.translate(0, -2200, 0);
        //p5.texture(HDC_outer);
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
        p5.stroke(_green2)
        //p5.fill(0, 255, 103, 63)
        //p5.texture(HDC_outer);
        p5.rotateX(p5.radians(-90));
        p5.rotateY(p5.radians(p5.frameCount));
        p5.translate(p5.noise(xOff)*100, p5.noise(yOff)*HEIGHT*0.01, -p5.noise(zOff)*600);
        p5.sphere(300);
        p5.pop()

        p5.rotateY(p5.radians(p5.frameCount));
        // inner sphere
        p5.stroke(_green1);
        p5.fill(175, 198, 174, 67);
        p5.strokeWeight(4);
        p5.translate(p5.noise(xOff)*200, p5.noise(yOff)*HEIGHT*0.08, -p5.noise(zOff)*100);
        p5.sphere(500);

        p5.pop();

        xOff+=0.001;
        yOff+=0.001;
        zOff+=0.001;

        if(p5.keyPressed) {
            if (p5.key === 'z' || p5.key === 'w') {
                MOTION += SPEED; // move forward
                console.log("forward")
            } else if (p5.key === 's') {
                MOTION -= SPEED; // move backwards
                console.log("backwards")
            }
        }

    }

    return (<Sketch preload={preload} setup={setup} draw={draw}/>)
}

export default Sketch13D;
