import Sketch from "react-p5";
const Sketch_studios = p5 => {

    let canvas;
    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;
    let BG = 0;

    const setup = (p5, canvasParentRef) => {
        canvas = p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
    }

    const draw = p5 => {
        p5.background(BG);
        p5.stroke(255);
        p5.strokeWeight(20);
        p5.noFill();
        p5.ellipse(WIDTH/2, HEIGHT/2, 200, 200); //ellipse 1
        p5.ellipse(WIDTH/2 + 200, HEIGHT/2 - 200, 200, 200); // ellipse 2
    }
    return (
        <Sketch setup={setup} draw={draw} />
    )
}

export default Sketch_studios