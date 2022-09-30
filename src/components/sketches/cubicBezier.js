import React from "react";
import p5 from "react-p5";
import Sketch from "react-p5";

const CubicBezier = (p5) => {

    let canvas, _happy;
    //let BG = "#ffe600";
    let BG = "#8faa95"
    let FG = 0;

    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight * 4/5;

    const setup = (p5, canvasParentRef) => {
        canvas = p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
    }

    const draw = p5 => {
        // setup
        p5.background(BG);

        let waveV = p5.map(p5.sin(p5.radians(p5.frameCount*0.9)), -1, 1, -200, 300);
        let waveH = p5.map(p5.sin(p5.radians(p5.frameCount*0.5)), -1, 1, -400, 1000);
        let _p = p5.map(p5.tan(p5.radians(p5.frameCount*0.7)), -1, 1, -1000, 0 + waveH);

        let cX = WIDTH/2 + waveH + _p; // center X
        let cY = HEIGHT/2 + waveV - _p + waveH; // center Y

        let delta = 0.01;

        let p0 = p5.createVector(cX, cY); // center
        let p1 = p5.createVector(0, 0); // top-left
        let p2 = p5.createVector(WIDTH, 0); // top-right
        let p3 = p5.createVector(0, HEIGHT); // bottom-left
        let p4 = p5.createVector(WIDTH, HEIGHT); // bottom-left;


        p5.stroke(FG, 50 + waveV/10);
        //p5.fill(BG);
        //p5.strokeWeight(2);

        let t;
        p5.beginShape();
        for (let t = 0; t <= 1.000001; t += delta) {
            quadratic(p0, p1, p2, t);
        }
        p5.endShape();

        p5.beginShape();
        for (let t = 0; t <= 1.000001; t += delta) {
            quadratic(p0, p3, p4, t);
        }
        p5.endShape();

        p5.beginShape();
        for (let t = 0; t <= 1.000001; t += delta) {
            quadratic(p0, p1, p3, t);
        }
        p5.endShape();

        p5.beginShape();
        for (let t = 0; t <= 1.000001; t += delta) {
            quadratic(p0, p2, p4, t);
        }
        p5.endShape();

        p5.beginShape();
        for (let t = 0; t <= 1.000001; t += delta) {
            let x = quadratic(p0, p2, p4, t);
            let y = quadratic(p0, p1, p4, t);
            p5.vertex(x, y);
        }
        p5.endShape();

        function quadratic(s0, s1, s2, t) {
            let xT1 = p5.lerp(s1.x, s0.x, t);
            let xT2 = p5.lerp(s0.x, s2.x, t);
            let yT1 = p5.lerp(s1.y, s0.y, t);
            let yT2 = p5.lerp(s0.y, s2.y, t);

            let _w = 2 * t;
            p5.strokeWeight(_w);

            p5.line(xT1, yT1, xT2, yT2);
            let xT = p5.lerp(xT1, xT2, t);
            let yT = p5.lerp(yT1, yT2, t);
            p5.vertex(xT, yT);

        }


    }
    return <Sketch setup={setup} draw={draw}/>
}

export default CubicBezier;