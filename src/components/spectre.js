import React,{useState} from "react";
import ImageGenerator from "./imageGenerator";
import ColorCubes from "./colorCubes";
import object_colors from "../data/objectsColor_10.json";
import ldes_translations from "../data/ldes_dmg_translations.json"

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

    function handleCurationChange(event) {
        const _x = generateCuration(num);
        setCuration((prev) => _x);
        console.log(_x);
    }

    console.log("curated set: "+ curation)
    return(
        <div className="cool-to-warm-spectrum">
            <ImageGenerator num={num}
                            curatedSet = {curation}/>

            <ColorCubes num={num}
                        curation={curation}
                        className="container"/>

            <button className="buttonRandomizer" onClick={handleCurationChange}>PSEUDO-RANDOMIZE</button>

        </div>
    )
}

export default SpectreMain;