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

    // INTERFACE FOR GENERATING CURATED SET BASED ON SELECTED COLORIST SWAP.

    const [_ran, setNumSwap] = useState(_ran);

    function handleNumSwapChange() {
        // reset swap on click.
        const _c = generateNumSwap();
        setNumSwap(() => _c);
    }

    function generateNumSwap() {
        //count number of items in color swap book json and create list to used for fetching random swap.
        const numsSwap = []
        for (let n=0; n<swap_c.length; ++n) {
            numsSwap.push(n);
        }
        return Math.floor(Math.random() * numsSwap.length);
    }

    const randomSwapIndex = generateNumSwap(); // generate index for random swap.

    const colorHexSwap = swap_c[randomSwapIndex]["HEX_values"][0]; // store data for props to generate hex tiles.
    const colorNameSwap = swap_c[randomSwapIndex]["color_names"][0]
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

    const num = props.num;
    const curation = generateCuration(num);

    return(
            <div className="rowScrollMain svg_divider">
                <Accordion/>
                <Model1/>
                <br/>
                <div className="dotLine"/>
                <br/>
                <div className="model1_header">
                    <div>
                        <h1 className=" pinkHeader">COLLECTIONS</h1>
                        <h1 className=" pinkHeader italicSet">OF CARE:</h1>
                        <h1 className=" pinkHeader">COLOR</h1>
                    </div>
                    <div className="pinkHeader boxBorder" onClick = {handleNumSwapChange}>
                        <h1 className="pinkHeader italic" >SWAP </h1>
                        <h1 className="pinkHeader italic underlined animateFont__organism" >SAMPLE</h1>
                    </div>
                </div>

                <div className="centerBox">

                    <div className="accordion-container__imgFrame">
                        <ImageGenerator num={num}
                                        curatedSet = {curation}
                                        data = {matchedObjects}
                        />
                        <ColorCubes num={num}
                                    curation={curation}
                                    data = {matchedObjects}
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
                </div>
            </div>
    )
}

export default SpectreMain;