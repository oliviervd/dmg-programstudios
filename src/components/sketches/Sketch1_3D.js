import React ,{useEffect} from "react";
import Sketch from "react-p5";

const Sketch13D = p5 => {

    let MAGNITUDE = 10000;
    let _height = window.innerHeight
    let _width = window.innerWidth
    let GRID_X = 50; //grid amount X
    let GRID_Y = 50;
    let GRID_W;
    let GRID_H;
    let SPEED = 20;
    let MOTION = 0;

    let xOff = 0;
    let yOff = 1;
    let zOff = 2;

    let canvas;


    //colors
    let BG = 0;
    let FG = "#f1f1f1"
    let _green1 = "#00ff67"
    let _green2 = "#afc6ae"
    let _pink1 = "#C6AEAF"
    let _bruises


    const setup = (p5, canvasParantRef) => {
        canvas = p5.createCanvas(_width, _height, p5.WEBGL).parent(canvasParantRef);
        //_bruises = p5.loadImage("bruise_01.png");
        //p5.tint(255, 127);
    }

    const draw = p5 => {


        GRID_W = MAGNITUDE / GRID_X
        GRID_H = MAGNITUDE / GRID_Y;

        let eyeX = _width/2.0 + p5.map(p5.mouseX, 0, _width, 0, 1000);
        let eyeY = _height/2.0;
        let eyeZ =(_height/2.0) / p5.tan(p5.PI*30.0 / 180.0);
        let centerX = _width/2.0;
        let centerY = _height/2.0;
        let centerZ = 0;
        let upX = 0;
        let upY = 1;
        let upZ = 0;
        p5.camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ);

        // -------- SCENE -----------//
        p5.background(255);
        p5.perspective(p5.PI/3.0, p5.float(_width/_height), 1, 10000);

        p5.push();
        p5.translate(0, 1000, MOTION); // 750
        p5.rotateX(p5.radians(90));

        // outer__dome;

        p5.push();
        p5.lights();
        //IMAGE_OUTSIDE
        p5.rotateX(p5.radians(-90));
        p5.rotateY(p5.radians(-90)); //starting pos.
        p5.rotateY(p5.radians(p5.frameCount*0.2));
        p5.translate(0, -2700, 0);
        //p5.texture(HDC_outer);
        //HDC_outer.resize(2500, 0); // RESIZE IMG.
        //p5.image(HDC_outer, -1500, 1000); // ACTIVATE IMG.
        //p5.sphere(3000);
        p5.pop();

        //IMAGE INSIDE
        p5.push();
        let _angle = p5.map(p5.mouseY, 0, _height, 0, 360);
        p5.rotateX(p5.radians(-90));
        p5.rotateY(p5.radians(-30));
        p5.translate(1500, -2200, -1000);
        //HDC_outer.resize(2500, 0); // RESIZE IMG.
        // p5.image(MODELMUS01, -1500, 1000); // ACTIVATE IMG.
        // p5.sphere(3000);

        p5.rectMode(p5.CENTER);
        p5.push()
        p5.translate(0, 20);
        p5.fill(198, 174, 175, 99);
        p5.rect(0, 0, MAGNITUDE, MAGNITUDE);
        p5.pop()

        p5.noFill();

        for (let x = 0; x < GRID_X; x++) {
            for (let y = 0; y < GRID_Y; y++) {
                p5.push()
                p5.translate(GRID_W/2 - MAGNITUDE/2 + GRID_W * x, GRID_H/2 - MAGNITUDE/2 + GRID_H * y);
                //p5.stroke(_pink1);
                p5.fill(_pink1);
                p5.ellipse(0, 0, 5, 10);

                p5.pop()
            }
        }

        p5.pop();


        // __draw grid for floor ref. (boxes)__ //

        //p5.fill(BG)
        p5.rectMode(p5.CENTER);
        p5.push()
        p5.translate(0, 20);
        p5.fill(198, 174, 175, 65);
        p5.rect(0, 0, MAGNITUDE, MAGNITUDE);
        p5.pop()

        p5.noFill();

        for (let x = 0; x < GRID_X; x++) {
            for (let y = 0; y < GRID_Y; y++) {
                p5.push()
                p5.translate(GRID_W/2 - MAGNITUDE/2 + GRID_W * x, GRID_H/2 - MAGNITUDE/2 + GRID_H * y);
                //p5.stroke(_pink1);
                p5.fill(_pink1);
                p5.ellipse(0, 0, 5, 10);

                p5.pop()
            }
        }


        p5.push()
        p5.translate(300, -700, 400);
        p5.stroke(_green2)
        //p5.fill(0, 255, 103, 63)
        //p5.texture(_bruises); // REACTIVATE FOR SPHERE.
        p5.rotateX(p5.radians(-90));
        p5.rotateY(p5.radians(p5.frameCount));
        p5.translate(p5.noise(xOff)*100, p5.noise(yOff)*_height*0.01, -p5.noise(zOff)*600);
        p5.sphere(300);
        p5.pop()

        p5.rotateY(p5.radians(p5.frameCount));
        // inner sphere
        p5.stroke(_pink1);
        p5.fill(175, 198, 174, 67);
        p5.strokeWeight(2);
        p5.translate(p5.noise(xOff)*200, p5.noise(yOff)*_height*0.08, -p5.noise(zOff)*100);
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

    window.onresize = function() {
        _width = window.innerWidth;
        _height = window.innerHeight;
        canvas.size(_width, _height);
    }

    //return (<Sketch preload={preload} setup={setup} draw={draw}/>)
    return (<Sketch setup={setup} draw={draw}/>)
}

export default Sketch13D;
