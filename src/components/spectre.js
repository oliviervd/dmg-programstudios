import React from "react";
import ImageGenerator from "./imageGenerator";
import ColorCubes from "./colorCubes";
import object_colors from "../data/objectsColor.json";

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
    const curation = generateCuration(4)
    console.log(curation)
    return(
        <div>
            {/*<div className="container" id="imageRandom"></div>*/}
            <ImageGenerator num={num}
                            curatedSet = {curation}/>
            {/*<button onClick={SpectreMain}>images</button>*/}
            {/*<button onClick={MasonryGrid}>masonry</button>*/}

            <ColorCubes num={num}
                        curation={curation}
                        className="container"/>
        </div>
    )
}

export default SpectreMain;