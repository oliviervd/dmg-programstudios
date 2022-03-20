import React from "react";
import MasonryGrid from "./masonry";
import ImageGenerator from "./imageGenerator";
import ColorCubes from "./colorCubes";
import object_colors from "../data/objectsColor.json";

function numSelect(i) {

    // this function creates an array of unique numbers based on the length of object_colors.
    var nums = [];
    var ranNums = [];
    var j = 0;
    for (var n=0; n<object_colors.length; ++n) {
        var x = Math.floor(Math.random() * object_colors.length)
        nums.push(n);
    }
    while (i--) {
        j = Math.floor(Math.random() * nums.length);
        ranNums.push(nums[j]);
        nums.splice(j,1);
    }
    return ranNums
}

function generateCuration(){
    return numSelect(5);
}


const SpectreMain = () => {
    const curation = generateCuration()
    console.log(curation)
    return(
        <div>
            {/*<div className="container" id="imageRandom"></div>*/}
            <ImageGenerator curatedSet = {curation}/>
            {/*<button onClick={SpectreMain}>images</button>*/}
            {/*<button onClick={MasonryGrid}>masonry</button>*/}

            <ColorCubes curation={curation} className="container"/>
        </div>
    )
}

export default SpectreMain;