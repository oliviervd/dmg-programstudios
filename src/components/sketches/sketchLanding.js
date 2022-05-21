import Sketch from "react-p5";
import {Link} from "react-router-dom";

const SketchLanding = p5 => {

    let canvas;
    let _width = window.innerWidth;
    let _height = window.innerHeight;


    let FG = 0;
    let BG = "#F1F1F1";
    let _pacragon;
    let _happy;

    let fontSize = 128;
    let lineHeight = 0.9;
    let _shrink
    let _closed
    let _days
    let _hours
    let _minutes
    let _today;
    let _closeDate;
    let _count;
    let _fullMoon;

    let _ticker = 0;

    const setup = (p5, canvasParentRef) => {
        canvas = p5.createCanvas(_width, _height).parent(canvasParentRef);
        var fontFile_1 = "P-ACR-AGON-Regular.otf"
        var fontFile_2 = "happy-times-NG_regular_master_web.ttf"
        _happy = p5.loadFont(fontFile_2, 1000);
        _pacragon = p5.loadFont(fontFile_1, 1000);
    }

    const draw = p5 => {

        let fitX = _width * 0.75;
        _shrink = p5.map(p5.sin(p5.radians(p5.frameCount*0.2)), -1, 1, -1, 1);

        p5.background(BG);

        p5.translate(_width/2, _height/2);
        p5.noFill();
        p5.stroke(FG);
        p5.strokeWeight(7);
        p5.ellipse(0, 0, _width*0.75, 400);

        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textSize(_width/18);
        let _main = "MODELS FROM THE PAST \n FOR THE FUTURE "
        p5.textFont(_pacragon);
        p5.fill(FG);
        p5.textLeading(fontSize * _shrink);
        p5.text(_main, 0, 0);
        //p5.text("FOR THE FUTURE", 0, 60);

        console.log(_width);

        p5.noFill();
        p5.textSize(_width/70);
        p5.strokeWeight(2);
        p5.text(_shrink, 0, -300)

        p5.textFont(_happy);

        _today = new Date();
        _closeDate = new Date("03/06/2022");

        _count = Math.abs(_today - _closeDate)
        _days = _count/(1000 * 3600 * 24) + " days"
        _hours= _count/(1000 * 3600) + " hours"
        _minutes = _count/(1000) + " minutes"
        _fullMoon = Math.floor(_count/(1000 * 3600 * 24) / 29.5) + " full moons"
        console.log(_fullMoon)

        _ticker += 1;
        if (_ticker == 400) {
            _ticker = 0;
        }

        if (_ticker < 100) {
            _closed = "the museum has been closed for " + _days
            p5.text(_closed, 0, -340)
        } else if (_ticker > 100 && _ticker < 200) {
            _closed = "the museum has been closed for " + _hours
            p5.text(_closed, 0, -340)
        } else if (_ticker > 200 && _ticker < 300) {
            _closed = "the museum has been closed for " + _minutes
            p5.text(_closed, 0, -340)
        } else {
            _closed = "the museum has been closed for " + _fullMoon
            p5.text(_closed, 0, -340)
        }

    }

    window.onresize = function() {
        //assign new values for WIDTH and HEIGHT
        _width = window.innerWidth;
        _height = window.innerHeight;
        canvas.size(_width, _height);
    }

    return (
        <Sketch setup={setup} draw={draw} />
    )
}

export default SketchLanding;