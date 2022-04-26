import React from "react";
import Sketch from "react-p5";


const Sketch1 = p5 => {

    let _height = window.innerHeight
    let _width = window.innerWidth

    //colors
    let _white1 = "#f1f1f1"
    let _green2 = "#afc6ae"


    const setup = (p5, canvasParantRef) => {
        p5.createCanvas(_width, _height).parent(canvasParantRef)
    }

    const draw = p5 => {

        let _green1 = p5.color(0, 255, 103)
        let _green2 = p5.color(175, 198, 174)

        let begin = 1903; //year the museum opened
        let end = 2030 // make dynamic?
        let _span = end - begin;

        let _mmPos = (_width/_span)
        let _hdcPos = (_width/_span) * 19 // 19 yrs after opening the museum moved to Hotel De Coninck.
        let _dingPOS = (_width/_span) * 121

        let _History = (_width/_span) * 19
        let index = p5.int(p5.map(p5.mouseX, 0, _width, 0, (end-begin)));
        let rectWidth = (_width/(end-begin));

        p5.background(_white1)

        //rect
        let n = p5.map(p5.mouseX, 0, _width, 0, 1)
        let _lerp = p5.lerpColor(_green1, _green2, n);
        p5.fill(_lerp)
        p5.rect(rectWidth*index, 0, rectWidth, _height);

        p5.push()
        p5.translate(_width/2, _height/2)
        p5.textSize(300);
        p5.textAlign(p5.CENTER, p5.CENTER)
        p5.text(begin+index, 0, 0);
        p5.fill(_green1)
        p5.pop()

        //meta information; //todo: put in dictionary instead of evoking with variables.
        p5.textSize(15);

        //Models_Museum
        p5.fill(0);
        p5.stroke(0);
        //p5.line(_mmPos, 0, _mmPos, _mmPos);
        //p5.text("**Museum of Models", _mmPos, _History);

        //hotel de Coninck TODO: write function to generate these things and use dictionary declared above.
        //p5.line(_hdcPos, 0, _hdcPos, _height);
        //p5.text("**Hotel De Coninck", _hdcPos, _History);

        //DING
        //p5.line(_dingPOS, 0, _dingPOS, _height);
        //p5.text("DING", _dingPOS, _dingPOS);

        p5.noStroke()
        p5.fill(255);
        p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);


    }
    return (<Sketch setup={setup} draw={draw}/>)
}

export default Sketch1;
