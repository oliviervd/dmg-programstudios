import React, {useEffect} from "react";
import p5 from "react-p5"
import Sketch from "react-p5";

const SketchPlaceHolder = (p5, props) => {

    let _c = props._id
    let c;
    let n =20;
    let WIDTH = 400;
    let HEIGHT = 400;
    const BG = "#fbf2e7";
    //const BG = 255;
    const FG = 0;

    const setup = (p5, canvasParentRef) => {
        c = p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
    }

    const draw = (p5, props) => {

        let _cW = WIDTH/n;
        let _cH = HEIGHT/n;

        p5.background(BG);
        p5.stroke(FG);
        p5.strokeWeight(2);

        window.onresize = function() {
            WIDTH = document.getElementById(_c).offsetWidth;
            HEIGHT = document.getElementById(_c).offsetHeight;
            c.size(WIDTH, HEIGHT);
        }

        //p5.translate(WIDTH/2, HEIGHT/2);

        for(let x = 0; x <n; x++) {
            for(let y = 0; y <n; y++) {
                let _r = p5.int(p5.random(0, 100));

                 if (_r === 0){
                     p5.fill(FG);
                     p5.ellipse(_cW * x + _cW / 2, _cH * y + _cH / 2, _cW/3.33, _cH/3.33);
                 } else {
                     p5.noFill();
                     p5.rect(_cW * x, _cH * y, _cW, _cH);
                 }
            }
        }
    }



    return(<Sketch setup={setup} draw={draw}/>)

}

export default SketchPlaceHolder