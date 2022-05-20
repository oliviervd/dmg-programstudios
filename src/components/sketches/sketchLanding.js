import Sketch from "react-p5";
import {Link} from "react-router-dom";

const SketchLanding = p5 => {

    let canvas;
    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    let FG = 0;
    let BG = "#F1F1F1";
    let happy;
    let _happy;

    const setup = (p5, canvasParentRef) => {
        canvas = p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
        var fontFile = "P-ACR-AGON-Regular.otf"
        happy = p5.loadFont(fontFile, 128);
    }

    const draw = p5 => {
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
        p5.text("MODELS FROM THE PAST", 0, -60);
        p5.text("FOR THE FUTURE", 0, 60);
    }

    return (
        <Sketch setup={setup} draw={draw} />
    )
}

export default SketchLanding;