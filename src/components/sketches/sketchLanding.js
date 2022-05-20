import Sketch from "react-p5";

const SketchLanding = p5 => {

    let canvas;
    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    let BG = 0;
    let FG = "#F1F1F1";

    const setup = (p5, canvasParentRef) => {
        canvas = p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
    }

    const draw = p5 => {
        p5.background(0);

        p5.translate(WIDTH/2, HEIGHT/2);
        p5.noFill();
        p5.stroke(FG);
        p5.ellipse(0, 0, 1200, 400);
    }

    return (
        <Sketch setup={setup} draw={draw}/>
    )
}

export default SketchLanding;