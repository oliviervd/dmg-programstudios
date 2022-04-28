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

        // coordinate system for grid;
        let gridX = 16*2; //grid amount X
        let gridY = 9*2; // grid amount Y
        let gridW = _width / gridX;
        let gridH = _height / gridY;

        // tiled__staired grid.
        for (let x = 0; x < gridX; x++) {
            for (let y = 0; y < gridY; y++) {

                p5.push()
                p5.translate(gridW * x, gridH * y); // distribute elements on coordinate system
                p5.stroke(_green1)
                p5.rect(gridW * x, gridW * x + gridW, gridH * y, gridH * y + gridH) // draw rect (grid);
                p5.pop()

            }
        }

        // ellipse (grid)

        p5.push();
        p5.translate(-_width/2, -_height/2);

        for (let x = 0; x < gridX; x++) {
            for (let y = 0; y < gridY; y++) {

                p5.push()
                p5.translate(_width/2 + gridW * x, _height/2 + gridH * y); // distribute elements on coordinate system
                p5.stroke(_green2)
                p5.ellipse(0, 0, 5, 5) // draw rect (grid);
                p5.pop()

            }
        }

        p5.pop();

        // scanner head
        let n = p5.map(p5.mouseX, 0, _width, 0, 1)
        let _lerp = p5.lerpColor(_green1, _green2, n);
        p5.fill(_lerp)
        p5.rect(rectWidth*index, 0, rectWidth, _height);

        // text displaying YEAR
        p5.push()
        p5.translate(_width/2, _height/2)
        p5.textSize(300);
        p5.textAlign(p5.CENTER, p5.CENTER)
        p5.text(begin+index, 0, 0);
        p5.fill(_green1)
        p5.pop()

        // cursor
        p5.noStroke()
        p5.fill(255);
        p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);


    }
    return (<Sketch setup={setup} draw={draw}/>)
}

export default Sketch1;
