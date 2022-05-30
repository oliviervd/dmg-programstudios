import React from "react";
import Sketch from "react-p5";

const Sketch_ModelsGrid = p5 => {

    let WIDTH = window.innerWidth
    let HEIGHT = window.innerHeight*(1/2)

    let gridSize = 50;
    let _happy;
    let _pacragon;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
        var fontFile_1 = "P-ACR-AGON-Regular.otf"
        var fontFile_2 = "happy-times-NG_regular_master_web.ttf"
        _happy = p5.loadFont(fontFile_2, 1000);
        _pacragon = p5.loadFont(fontFile_1, 1000);
    }

    const draw = p5 => {
        p5.background(255);

        let wave = p5.map(p5.sin(p5.radians(p5.frameCount*0.1)),-1, 1, 0.5, 1)
        let _w2 = p5.map(p5.cos(p5.radians(p5.frameCount*0.1)),-1, 1, 0.5, 2)
        p5.textFont(_pacragon);
        p5.textSize(WIDTH/10);
        //p5.stroke(255);
        p5.fill(255);
        p5.textAlign(p5.CENTER, p5.CENTER);
        //p5.text("_BREAK", WIDTH/2, HEIGHT/2);
        //p5.text("_BREAK, MUTATE AND BUILT ON WHAT IS AND ISN'T REAL", WIDTH/2, HEIGHT/2);
        //p5.text("_BREAK, MUTATE AND BUILT ON WHAT IS AND ISN'T REAL", WIDTH/2, HEIGHT/2);

        for (let x = 0; x < gridSize; x++ ){
            for (let y = 0; y < gridSize; y++) {

                let xPos = x * WIDTH/gridSize * wave
                let xPosRev = x * WIDTH/gridSize/wave
                let yPos = y * HEIGHT/gridSize
                let xOffSet = (WIDTH/gridSize)/2
                let yOffSet = (HEIGHT/gridSize)/2

                p5.noFill()
                p5.stroke(0)

                let _w = p5.random(-1, 5);
                if(_w==0) {
                    p5.fill("#afc6ae");
                }
                p5.strokeWeight(_w2);
                p5.ellipse( xPos + xOffSet , yPos + yOffSet, WIDTH/gridSize, HEIGHT/gridSize);
                p5.ellipse( WIDTH - xPos + xOffSet , yPos + yOffSet, WIDTH/gridSize, HEIGHT/gridSize);
                p5.line(xPos, 0, xPos, HEIGHT) // vertical line

                p5.fill("#afc6ae");
                p5.ellipse( xPosRev + xOffSet , yPos + yOffSet, WIDTH/gridSize, HEIGHT/gridSize);

            }
        }

    }
    return (<Sketch setup={setup} draw={draw}/>)
}

export default Sketch_ModelsGrid;
