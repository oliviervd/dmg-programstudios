import React from "react";
import Sketch from "react-p5";

const RedBars = p5 => {

    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;
    let count = 0;
    let canvas;

    const setup = (p5, canvasParentRef) => {
        canvas = p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
    }

    const draw = p5 => {
        let _wave = p5.map(p5.sin(p5.radians(p5.frameCount * 0.4)), -1, 1, 0, 200)
        let _waveCos = p5.map(p5.cos(p5.radians(p5.frameCount * 10)), 1, -1, 0, 10)
        console.log(_wave);

        p5.noStroke();
        p5.fill("#FF0000");
        p5.rect(p5.mouseX, p5.mouseY, _waveCos, _wave);

        count = count + 1;
        if (count == 500) {
            p5.background(255);
            count = 0;
        }

    }

    return (<Sketch setup={setup} draw={draw}/>)

}

export default RedBars;