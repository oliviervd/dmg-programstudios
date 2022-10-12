import Sketch from "react-p5";
const Sketch_studios = p5 => {

    let canvas;
    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;
    let sentenceArray_DIG = [];
    let sentenceArray_GD = [];
    let studio_DIG = "Studio Digital Culture and Design";
    let studio_GD = "Studio Graphic Design";
    let BG = 0;
    let theta = 0;
    let r = 100;

    const setup = (p5, canvasParentRef) => {
        canvas = p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
        sentenceArray_DIG = studio_DIG.split("");
        sentenceArray_GD = studio_GD.split("");


    }

    const draw = p5 => {
        p5.background(BG);
        p5.stroke(255);
        p5.strokeWeight(20);
        p5.noFill();
        //p5.ellipse(WIDTH/2, HEIGHT/2, 200, 200); //ellipse 1
        //p5.ellipse(WIDTH/2 + 200, HEIGHT/2 - 200, 200, 200); // ellipse 2

        //circular text
        p5.translate(WIDTH/2, HEIGHT/2);
        p5.strokeWeight(1);
        p5.textSize(10);
        p5.angleMode(p5.DEGREES);
        let x = r * p5.cos(theta);
        let y = r * p5.sin(theta);

        let motion = p5.map(p5.sin(p5.radians(p5.frameCount)), -1, 1, 100, -100)
        p5.translate(-motion, motion);

        for (let i = 0; i < sentenceArray_DIG.length; i++){
            p5.rotate(360/sentenceArray_DIG.length);
            p5.text(sentenceArray_DIG[i], x, y);
        }

        r = r - motion/100;
        p5.translate(100 + motion, 100 + motion);
        for (let i = 0; i < sentenceArray_GD.length; i++){
            p5.rotate(360/sentenceArray_GD.length);
            p5.text(sentenceArray_GD[i], x, y);
        }
    }
    return (
        <Sketch setup={setup} draw={draw} />
    )
}

export default Sketch_studios