import React, {useState} from "react"

//data import
import object_c from "../data/objectsColor_10.json";
import swap_c from "../data/swapbook.json";

const ColorTagger = () => {

    //interface for generating curated set based on colorist swap.
    const [numSwap, setNumSwap] =useState(3); //Number of swaps.

    function handleNumSwapChange() {
        //reset swap on click
        const _c = generateNumSwap();
        setNumSwap(() => _c)
    }

    function generateNumSwap() {
        const numSwap = [];
        for (let n=0; n<swap_c.length; ++n) {
            numSwap.push(n);
        }
        return Math.floor(Math.random() * numSwap.length);
    }

    return(
        <div>

        </div>
    )
}

export default ColorTagger;