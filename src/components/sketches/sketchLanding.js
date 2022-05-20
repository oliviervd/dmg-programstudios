import Sketch from "react-p5";
import {Link} from "react-router-dom";

const SketchLanding = p5 => {

    let canvas;
    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    let FG = 0;
    let BG = "#F1F1F1";
    let happy;

    let fontSize = 128;
    let lineHeight = 0.9;
    let _shrink

    const setup = (p5, canvasParentRef) => {
        canvas = p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
        var fontFile = "P-ACR-AGON-Regular.otf"
        happy = p5.loadFont(fontFile, 1000);
    }

    const draw = p5 => {

        _shrink = p5.map(p5.sin(p5.radians(p5.frameCount*0.2)), -1, 1, -1, 1);
        console.log(_shrink);

        p5.background(BG);

        p5.translate(WIDTH/2, HEIGHT/2);
        p5.noFill();
        p5.stroke(FG);
        p5.strokeWeight(7);
        p5.ellipse(0, 0, 1200, 400);

        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textSize(128);
        p5.textFont(happy);
        p5.fill(FG);
        p5.textLeading(fontSize * _shrink);
        p5.text("MODELS FROM THE PAST \n FOR THE FUTURE ", 0, 0);
        //p5.text("FOR THE FUTURE", 0, 60);

        p5.textSize(30);
        p5.text(_shrink, 0, -300)
    }

    return (
        <Sketch setup={setup} draw={draw} />
    )
}

export default SketchLanding;