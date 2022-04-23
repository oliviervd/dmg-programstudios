import React from "react";
import Sketch from "react-p5";


const Sketch1 = () => {

    let _height = window.innerHeight
    let _width = window.innerWidth


    const setup = (p5, canvasParantRef) => {
        p5.createCanvas(_width, _height).parent(canvasParantRef)

    }

    const draw = p5 => {

        let models = [
            "models",
            "from",
            "the",
            "past",
            "for",
            "the",
            "future"
        ]

        let begin = 1903;
        let end = 2025
        let index = p5.int(p5.map(p5.mouseX, 0, _width, 0, (end-begin)));
        let rectWidth = (_width/(end-begin));

        p5.background("#f1f1f1");

        p5.stroke("#00FF67");
        p5.rect(rectWidth*index, 0, rectWidth, _height);


        p5.push()
        p5.translate(_width/2, _height/2)
        p5.textSize(300);
        p5.textAlign(p5.CENTER, p5.CENTER)
        p5.text(begin+index, 0, 0);
        p5.fill("#00FF67")
        p5.pop()


        p5.noStroke()
        p5.fill("#00FF67")
        p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);


    }
    return (<Sketch setup={setup} draw={draw}/>)
}

export default Sketch1;
