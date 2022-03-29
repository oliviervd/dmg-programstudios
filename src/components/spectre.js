import React,{useState} from "react";
import ImageGenerator from "./imageGenerator";
import ColorCubes from "./colorCubes";
import Accordion from "./carousel/Accordion";

//data
import object_c from "../data/objectsColor_10.json";




const SpectreMain = (props) => {

    const [color, setColor] = useState("")

    const object_colors = object_c.filter(function(item) {
        return item.color_names.includes(color);
    })

    function handleColorChange(color) {
        const _c = color;
        setColor(()=>_c);
    }

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

    const num = props.num;
    const [curation, setCuration] = useState(generateCuration(num));

    function handleCurationChange() {
        const _x = generateCuration(num);
        setCuration(() => _x);
    }

    return(
        <div className="rowScrollMain svg_divider">
            <Accordion/>
            <h3>COLOR UI INTERFACE (PICK A COLOR AND GENERATE SELECTION)</h3>
            <div className="colorPickInterface">
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
                <button className="colorPickerInterfaceLuckyButton" onClick={handleCurationChange}>FEELING LUCKY?</button>
            </div>
            <div className="cool-to-warm-spectrum accordion-container">
                <ImageGenerator num={num}
                                curatedSet = {curation}
                                data = {object_colors}
                />
                <ColorCubes num={num}
                            curation={curation}
                            data = {object_colors}
                            className="container"/>
            </div>
        </div>
    )
}

export default SpectreMain;