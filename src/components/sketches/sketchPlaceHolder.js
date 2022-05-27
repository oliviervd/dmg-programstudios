import React from "react";
import p5 from "react-p5"
import Sketch from "react-p5";

const SketchPlaceHolder = p5 => {

    let c;
    let n =20;
    const WIDTH = document.getElementById("PLCH").offsetWidth;
    const HEIGHT = document.getElementById("PLCH").offsetHeight;
    const BG = "#fbf2e7";
    const FG = 0;

    const setup = (p5, canvasParentRef) => {
        c = p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
    }

    const draw = p5 => {

        let _cW = WIDTH/n;
        let _cH = HEIGHT/n;

        p5.background(BG);
        p5.stroke(FG);
        p5.strokeWeight(2);

        //p5.translate(WIDTH/2, HEIGHT/2);

        for(let x = 0; x <n; x++) {
            for(let y = 0; y <n; y++) {
                let _r = p5.int(p5.random(0, 4));

                 if (_r == 0){
                     p5.fill(FG);
                     p5.ellipse(_cW * x + _cW / 2, _cH * y + _cH / 2, _cW, _cH);
                 } else {
                     p5.noFill();
                     p5.rect(_cW * x + _cW / 2, _cH * y + _cH / 2, _cW, _cH);
                 }
            }
        }
    }

    return(<Sketch setup={setup} draw={draw}/>)

}

export default SketchPlaceHolder