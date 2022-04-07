import React, {useState} from "react";
import ImageGenerator from "./imageGenerator";
import ColorCubes from "./colorCubes";
import Accordion from "./carousel/Accordion";
import Model1 from "./models/model1"
import SwapBook from "./swapBook"
import HexCube from "./cube";

//data
import object_c from "../data/objectsColor_10.json"; // import json containing information on the collection of Design Museum Gent (objects that have been published)
import swap_c from "../data/swapbook.json"; // import json containing information on the color swapbook that used to belong to Henry van de Velde

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

    function generateNumSwap() {
        const numsSwap = []
        for (let n=0; n<swap_c.length; ++n) {
            numsSwap.push(n);
        }
        return Math.floor(Math.random() * numsSwap.length);
    }

    const [, setNumSwap] = useState(generateNumSwap())

    function handleNumSwapChange() {
        const _c = generateNumSwap();
        setNumSwap(()=>_c);
    }

    const ran = generateNumSwap();

    const colorHexSwap = swap_c[ran]["HEX_values"][0];
    const _imSwap = swap_c[ran]["IIIF_image"];

    return(
            <div className="rowScrollMain svg_divider">
                <Accordion/>
                <Model1/>
                <br/>
                <div className="dotLine"></div>
                <br/>
                <h1 className=" pinkHeader">COLLECTIONS</h1>
                <h1 className=" pinkHeader italicSet">OF CARE:</h1>
                <h1 className=" pinkHeader">COLOR</h1>

                <div className="centerBox">

                    <div className="accordion-container__imgFrame">
                        <ImageGenerator num={num}
                                        curatedSet = {curation}
                                        data = {object_colors}
                        />
                        <ColorCubes num={num}
                                    curation={curation}
                                    data = {object_colors}
                                    className="container"/>
                    </div>
                    <div>
                        <SwapBook
                            num = {_imSwap}
                        />
                        <HexCube
                            hexColors = {colorHexSwap}
                        />
                    </div>
                    <div className="pinkHeader" onClick = {handleNumSwapChange}>swap</div>
                </div>
            </div>
    )
}

export default SpectreMain;