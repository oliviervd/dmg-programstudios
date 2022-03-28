import React,{useState} from "react";
import ImageGenerator from "./imageGenerator";
import ColorCubes from "./colorCubes";
import Accordion from "./carousel/Accordion";

//data
import object_colors from "../data/objectsColor_10.json";

function numSelect(i) {

    // this function creates an array of unique numbers based on the length of object_colors.
    const nums = [];
    const ranNums = [];
    let j = 0;
    for (let n=0; n<object_colors.length; ++n) {
        nums.push(n);
    }
    while (i--) {
        j = Math.floor(Math.random() * nums.length);
        ranNums.push(nums[j]);
        nums.splice(j,1);
    }
    return ranNums
}

function generateCuration(count){
    return numSelect(count);
}


const SpectreMain = (props) => {

    const num = props.num;
    const [curation, setCuration] = useState(generateCuration(num));

    function handleCurationChange() {
        const _x = generateCuration(num);
        setCuration(() => _x);
        console.log(_x);
    }

    console.log("curated set: "+ curation)
    return(
        <div className="rowScrollMain svg_divider">
            <Accordion/>
            <div>COLOR UI INTERFACE (PICK A COLOR AND GENERATE SELECTION)</div>
            <div className="colorPickInterface" onClick={handleCurationChange}>
                <div className="colorPickerInterfaceList">
                    <div className="colorPickerInterfaceColorSQ">placeholder COLOR HEX 1</div>
                    <div className="colorPickerInterfaceColorSQ">placeholder COLOR HEX 2</div>
                    <div className="colorPickerInterfaceColorSQ">placeholder COLOR HEX 3</div>
                    <div className="colorPickerInterfaceColorSQ">placeholder COLOR HEX 4</div>
                    <div className="colorPickerInterfaceColorSQ">placeholder COLOR HEX 5</div>
                    <div className="colorPickerInterfaceColorSQ">placeholder COLOR HEX 6</div>
                    <div className="colorPickerInterfaceColorSQ">placeholder COLOR HEX 7</div>
                    <div className="colorPickerInterfaceColorSQ">placeholder COLOR HEX 8</div>
                    <div className="colorPickerInterfaceColorSQ">placeholder COLOR HEX 9</div>
                    <div className="colorPickerInterfaceColorSQ">placeholder COLOR HEX 10</div>
                </div>
                <button className="colorPickerInterfaceLuckyButton">FEELING LUCKY?</button>
            </div>
            <div className="cool-to-warm-spectrum accordion-container">
                <ImageGenerator num={num}
                                curatedSet = {curation}/>
                <ColorCubes num={num}
                            curation={curation}
                            className="container"/>
            </div>
        </div>
    )
}

export default SpectreMain;