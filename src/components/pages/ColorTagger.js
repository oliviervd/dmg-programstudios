import React, {useState} from "react"

//data import
import object_c from "../data/color_data_clean_10.json";
import swap_c from "../data/swapbook.json";

import ColorTagger_imageGenerator from "../elements/index-color/ColorTagger_imageGenerator";
import ColorTagger_swapBook from "../elements/index-color/ColorTagger_swapBook";
import ColorTagger_colorCubes from "../elements/index-color/ColorTagger_colorCubes";
import ColorTagger_cube from "../elements/index-color/ColorTagger_cube";
import ColorMatchSlider from "../elements/index-color/colorMatchSlider";

import Header from "../elements/Header";
import InteractionBar from "../elements/interactionBar";

const ColorTagger = () => {

    const [visualIdentity, setVisualIdentity] = useState("graphic_archive_01")
    const [_objectNum] = useState(3)
    const [language, setLanguage] = useState("EN");


    //interface for generating curated set based on colorist swap.
    const [numSwap, setNumSwap] = useState(3); //Number of swaps.

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

            //todo: interface for number of matching colors
            if ((arr_1_clean.filter(c => arr2.includes(c))).length >= 4)  {
                // check if color in both arrays. Return array with overlap (3 matching colors.)
                itemsMatch.push(object_c[n]);
            }

        } return itemsMatch;
    }

    /// use matched items to generate list of items.

    let matchedObjects = check_overlap();
    //
    console.log("matched objects: " + matchedObjects.length);

    if (matchedObjects.length <= 3 ) {
        handleNumSwapChange();
    }

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
    console.log(curation);
    console.log(matchedObjects);
    const [buttonColor, setButtonColor] = useState("black")

    return(
        <div className={visualIdentity}>
            <div className="lightMode">
                <div className="gridH--1-2-6-1">
                    <Header setLanguage={setLanguage} language={language}/>
                    <div className="grid--75_25">
                        <div className="grid--2_6_2">
                            <div/>
                            <div>
                                <ColorMatchSlider/>
                            </div>
                            <div>
                                <svg onClick={()=>setNumSwap(generateNumSwap())} xmlns="http://www.w3.org/2000/svg" width="200" height="50">
                                    <g>
                                        <ellipse cx="60" cy="25" rx="50" ry="20"
                                            stroke={buttonColor} strokeWidth="2" fill="none">
                                        </ellipse>
                                        <text x="40" y="30" fontSize="15">reset</text>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className={"borderLine-left"} >
                            <div className="grid--even_2">
                                <h2 style={{marginLeft: 20}}>color index</h2>
                                <div >
                                </div>

                            </div>
                            <p style={{marginLeft: 20, marginRight:20}}>
                                as part of the studio digital we are exploring alternative ways of indexing our digitized collection.as part of the studio digital we are exploring alternative ways of indexing our digitized collection.as part of the studio digital we are exploring alternative ways of indexing our digitized collection.as part of the studio digital we are exploring alternative ways of indexing our digitized collection.as part of the studio digital we are exploring alternative ways of indexing our digitized collection.

                            </p>
                        </div>
                    </div>
                    <div className="grid--75_25">
                        <div className="gridH--even_2">
                            <ColorTagger_imageGenerator className="grid--even_3"  num={num}
                                                        curatedSet={curation}  data={matchedObjects}/>
                            <ColorTagger_colorCubes className="grid--even_3"  num={num} curation={curation} data={matchedObjects}/>
                        </div>
                        <div className="gridH--even_2 borderLine-left">
                            <ColorTagger_swapBook className="grid--even_3" num={_imSwap}/>
                            <ColorTagger_cube className="grid--even_3" hexColors={colorHexSwap}/>
                        </div>
                    </div>
                    <InteractionBar className="lineH" lang={language}
                                    visualIdentity={visualIdentity} setVisualIdentity={setVisualIdentity}/>/>
                </div>
            </div>
        </div>
    )
}

export default ColorTagger;