import React from "react";
import Sketch from "react-p5";

const Sketch_ModelsGrid = p5 => {

    let WIDTH = window.innerWidth
    let HEIGHT = window.innerHeight*(2/3)

    let gridSize = 2;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
    }

    const draw = p5 => {
        p5.background(255);

        let wave = p5.map(p5.sin(p5.radians(p5.frameCount)),-1, 1, 0, 1)

        for (let x = 0; x < gridSize; x++ ){
            for (let y = 0; y < gridSize; y++) {

                let xPos = x * WIDTH/gridSize * wave
                let yPos = y * HEIGHT/gridSize
                let xWidth = WIDTH/gridSize * wave
                let xOffSet = (WIDTH/gridSize)/2
                let yOffSet = (HEIGHT/gridSize)/2

                p5.noFill()
                p5.stroke(0)
                p5.strokeWeight(5);
                p5.ellipse( xPos + xOffSet , yPos + yOffSet, WIDTH/gridSize, HEIGHT/gridSize);
                p5.line(xPos, 0, xPos, HEIGHT) // vertical line
            }
        }

    }
    return (<Sketch setup={setup} draw={draw}/>)
}

export default Sketch_ModelsGrid;
