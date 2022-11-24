import React, {useState} from "react"

//data import
import object_c from "../data/objectsColor_10.json";
import swap_c from "../data/swapbook.json";

import ColorTagger_imageGenerator from "../elements/index-color/ColorTagger_imageGenerator";
import ColorTagger_swapBook from "../elements/index-color/ColorTagger_swapBook";
import {useMediaQuery} from "react-responsive";
import ColorTagger_colorCubes from "../elements/index-color/ColorTagger_colorCubes";
import ColorTagger_cube from "../elements/index-color/ColorTagger_cube";

import Header from "../elements/Header";
import InteractionBar from "../elements/interactionBar";

const ColorTagger = (props) => {

    const [visualIdentity, setVisualIdentity] = useState("graphic_archive_01")
    const [_objectNum] = useState(3)

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

    const randomSwapIndex = generateNumSwap(); // generate index for random swap.
    const colorHexSwap = swap_c[randomSwapIndex]["HEX_values"][0]; // store data for props to generate hex tiles.
    const colorNameSwap = swap_c[randomSwapIndex]["color_names"][0]
    console.log(colorNameSwap);
    const _imSwap = swap_c[randomSwapIndex]["IIIF_image"]; // store data for props to fetch right image.

    function check_overlap() {
        //initiate list to populate
        let itemsMatch = [];

        //loop and check if color name is also in swap sample.
        for (let n=0; n<object_c.length; ++n) {
            //console.log(object_c[n]["color_names"])
            let arr2 = colorNameSwap

            //retrieve and clean array
            let arr1 = object_c[n]["color_names"].split(",")
            let arr_1_clean = [];
            for (let a=0; a<arr1.length; ++a) {
                arr_1_clean.push(arr1[a].replace("[[","").replace("]]","").trim().replace("[","").replace("]","").replace("'","").replace("'",""));
            }
            if ((arr_1_clean.filter(c => arr2.includes(c))).length >= 3)  {
                // check if color in both arrays. Return array with overlap (3 matching colors.)
                itemsMatch.push(object_c[n]);
            }
        } return itemsMatch;
    }

    /// use matched items to generate list of items.

    let matchedObjects = check_overlap();
    function generateCuration(count){

        const nums = [];
        const ranNums = [];

        let j = 0;
        for (let n=0; n<matchedObjects.length-1; ++n) {
            nums.push(n);
        }
        while (count--) {
            j = Math.floor(Math.random() * nums.length);
            ranNums.push(nums[j]);
            nums.splice(j,1);
        }
        return ranNums
    }

    const num = _objectNum;
    const curation = generateCuration(num);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    return(
        <div className={visualIdentity}>
            <Header/>
            <div className="grid--75_25" style={{margin:0}}>
                <div className="gridH--even_2">
                    <ColorTagger_imageGenerator className="grid--even_3" num={num} curatedSet={curation} data={matchedObjects}/>
                    <ColorTagger_colorCubes className="grid--even_3"  num={num} curation={curation} data={matchedObjects}/>
                </div>
                <div className="gridH--even_2">
                    <ColorTagger_swapBook className="grid--even_3" num={_imSwap}/>
                    <ColorTagger_cube className="grid--even_3" hexColors={colorHexSwap}/>
                </div>
            </div>
            <InteractionBar/>
        </div>
    )
}

export default ColorTagger;