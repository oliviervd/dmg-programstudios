import React, {Suspense, useState} from "react";
import {fetchImageByColor, getKeyByValue, shuffleFisherYates, splice} from "../../utils/utils";
import colorRef from "../../data/colorRef.json";
import ObjectViewer from "../subjectpages/ObjectViewer";
import {useMediaQuery} from "react-responsive";
import SearchFilterBar from "../utils/SearchFilterBar";
import {filterByKey} from "../../utils/data_parsers";
import Loading from "../utils/Loading";

const ColorIndex = (props) => {

    const _c = ["Tuscan brown", "Vanilla","Dark khaki", "Café noir",  "Rifle green", "Kobicha", "Artichoke", "Indigo dye", "Shadow blue", "Queen blue", "Gunmetal", "Morning blue", "Grullo", "Rich black (FOGRA39)"]
    const random = Math.floor(Math.random() * _c.length);
    const [objectColor, setObjectColor] = useState(_c[random]); // set Color of objects to be shown in Masonry
    const [image, setImage] = useState("");
    const [showDetailUIColors, setShowDetailUIColors] = useState(false);
    const [bitonal, setBitonal] = useState(false);
    const [details, setDetails] = useState("");
    const [hexFilter, setHexFilter] = useState("");

    const _objects = props.objects
    const _thes  = props.thesaurus
    const _pers = props.agents
    const about = props.about

    //MEDIA QUERIE
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 700px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 700px)'
    })

    // when clicking on an image store objectNumber in memory (objectNumber)
    const handleImgClick = (id) => {
        setImage(id);
        setShowDetailUIColors(true);
        let objectNumberString = filterByValue(_objects, id);
        fetchObjectById(objectNumberString);
    }

    let images;
    images = fetchImageByColor(_objects, objectColor)

    let imageBlock = ""

    try{
        if (bitonal) {
            imageBlock = images.map(image => (
                <img
                    onClick={()=>handleImgClick(image)}
                    alt={'INSERT ALT HERE'} //todo: alt
                    src={image.replace("/full/0/default.jpg", "/400,/0/bitonal.jpg")}
                />
            ))
        } else {
            imageBlock = images.map(image => (
                <img
                    className={"hoverImage"}
                    onClick={()=>handleImgClick(image)}
                    alt={'INSERT ALT HERE'} // todo: alt
                    src={image.replace("/full/0/default.jpg", "/400,/0/default.jpg")}
                />
            ))
        }

    } catch {imageBlock=<h2>Loading...</h2>}

    const HexList = [];

    try{
        for (let i=0; i<_objects.length; i++){
            // iterate over all colors.
            for (let z=0; z<_objects[i]["color_names"].length; z++) {
                for (let hex = 0; hex < _objects[i]["color_names"][z].length; hex++) {
                    if (_objects[i]["color_names"][z][hex] !== "Gray (X11 gray)"){
                        HexList.push(_objects[i]["color_names"][z][hex])
                    }
                }
            }
        }
    } catch {}

    const _HexCounts = {};
    for (const _hex of HexList) {
        _HexCounts[_hex] = _HexCounts[_hex] ? _HexCounts[_hex] + 1 : 1;
    }

    const Hex100 = shuffleFisherYates(_HexCounts) // RANDOMIZE SELECTION OF COLORS USING FISHER YATES
    const Hex100ran = splice(Hex100, 0, 10000); // ONLY SELECT FIRST 100 OUT OF SELECTION.

    const _filterHex = filterByKey(Hex100ran, hexFilter);
    console.log(_filterHex)

    let HexOptions;

    try{
        if (hexFilter==="") {
            try{
                HexOptions = Object.entries(Hex100ran).map(([key , i]) =>  (
                    <p className={"grid-text-autoflow"}
                        //style={{color:myStyle[`${i}`] ? getKeyByValue(colorRef, key) : "black"}}
                       style={{color: "black"}}
                       onClick={()=>handleClickTag(key)}
                       key={key}>
                        #{key},
                    </p>
                ));
            } catch {HexOptions=<p className={"rhizome"}>Loading...</p>}

        } else {
            HexOptions = _filterHex.map((color)=>{
                return <p className={"grid-text-autoflow"}
                    //style={{color:myStyle[`${i}`] ? getKeyByValue(colorRef, key) : "black"}}
                          style={{color: "black"}}
                          onClick={()=>handleClickTag(color)}
                          key={color}>
                    #{color},
                </p>


            });
        }
    } catch {HexOptions=<p className={"rhizome"}>Loading...</p>}




    function fetchObjectById(ObjectNumber) {
        for (let i=0; i<_objects.length; i++) {
            if (_objects[i].objectNumber === ObjectNumber) {
                setDetails(_objects[i])
            }
        }
    }

    function filterByValue(array, string) {
        let x = array.filter(o => o.iiif_image_uris.includes(string))
        return x[0]["objectNumber"];
    }

    // todo: move Color index to separate component --> clean up code.

    const handleClickTag = (key) => {
        setObjectColor(key)
        props.setShowIndexColors(!props.showIndexColors)
    }

    function collapse() {
        props.setCollapseColors(!props.collapseColors)
        props.setCollapseExhibition(false);
    }


    return(
        <div>
            {isDesktopOrLaptop&&
                <div>
                    {props.collapseColors &&
                        <div>
                            <div style={{width:"inherit"}}>
                                <div>
                                    <div className="lineH"/>
                                    <div className="grid--2_6_2" style={{height: '5vh'}}>
                                        <h2 onClick={()=>collapse()}>COLORS</h2>
                                        <div className={"grid--5_95"}>
                                            <div></div>
                                            <SearchFilterBar filter={hexFilter} setFilter={setHexFilter} prompt={" looking for a specific color?"}/>
                                        </div>
                                        <p style={{textAlign:"center"}}>*pseudorandom selection out of {HexList.length} colors observed.</p>
                                    </div>
                                    <div className={"lineH"}></div>
                                </div>
                                <div style={props.style}>

                                        <Suspense fallback={<Loading />}>
                                            {HexOptions}
                                        </Suspense>

                                </div>
                            </div>
                            <div>
                                <div className="lineH"/>

                                <div className="grid--2_6_2">
                                    <p>images</p>
                                    <div></div>
                                    <p></p>
                                </div>

                                <div className="grid--2_6_2">
                                    <h2 style={{color: getKeyByValue(colorRef, objectColor)}}>{objectColor}</h2>
                                    <div></div>
                                    <div className={"grid--2_1"}>
                                        <p>>>> scroll this way >>>></p>
                                        {bitonal &&
                                            <p onClick={()=> setBitonal(!bitonal)} >◧ bitonal</p>
                                        }
                                        {!bitonal &&
                                            <p onClick={()=> setBitonal(!bitonal)} >⧅ bitonal</p>
                                        }
                                    </div>
                                </div>

                                {!about &&
                                    <div className={showDetailUIColors? "container-masonry-half": "container-masonry-full"}>
                                        <div className={"masonry"} style={{height: "700px", overflowY:"scroll", padding: "5px"}}>
                                            <Suspense fallback={<Loading/>}>
                                                {imageBlock}
                                            </Suspense>
                                        </div>
                                        {showDetailUIColors &&
                                            <ObjectViewer
                                                showDetailUI={showDetailUIColors} setShowDetailUI={setShowDetailUIColors} description={false} thesaurus={_thes} personen={_pers}
                                                image={image} details={details} color={getKeyByValue(colorRef, objectColor)} colors={_objects} colorStrip={true} indexUI={true}
                                                box={false}
                                            />
                                        }
                                    </div>
                                }
                                {about &&
                                    <div className={showDetailUIColors? "container-masonry-half": "container-masonry-full"} style={{width: "70vw"}}>
                                        <div className={"masonry"} style={{height: "700px", overflowY:"scroll", padding: "5px"}}>
                                            {imageBlock}
                                        </div>
                                        {showDetailUIColors &&
                                            <ObjectViewer
                                                showDetailUI={showDetailUIColors} setShowDetailUI={setShowDetailUIColors} description={false} thesaurus={_thes} personen={_pers}
                                                image={image} details={details} color={getKeyByValue(colorRef, objectColor)} colors={_objects} colorStrip={true} indexUI={true}
                                                box={false}
                                            />
                                        }
                                    </div>
                                }
                            </div>
                        </div>

                    }
                    {!props.collapseColors &&
                        <div>
                           {/* <div className="lineH"/>
                            <div style={{height: "5vh"}} className="grid--2_6_2">
                                <p onClick={()=>collapse()}>colors</p>
                                <div></div>
                                <p style={{textAlign:"center"}}>*pseudorandom selection out of {HexList.length} colors observed.</p>
                            </div>*/}
                        </div>
                    }
                </div>
            }
            {isMobile &&
                <div>

                    <div>
                        <div className="lineH"/>
                        {props.showIndexColors &&
                            <div style={{overflowY: "hidden"}}>
                                <div className="grid--2_6_2">
                                    <p>colors</p>
                                    <div></div>
                                </div>

                                <div style={{height: "100%", overflowY:"scroll"}}>
                                    <Suspense>
                                        {HexOptions}
                                    </Suspense>
                                </div>
                            </div>

                        }


                        <div className="grid--2_6_2">
                            <h2 style={{color: getKeyByValue(colorRef, objectColor)}}>{objectColor}</h2>
                            <div style={{height: "5vh"}}></div>
                            <p onClick={()=>props.setShowIndexColors(!props.showIndexColors)}>>>> scroll this way >>>></p>
                        </div>

                        <div className={"masonry"} style={{height: "85vh", overflowY:"scroll"}}>
                            {imageBlock}
                        </div>
                        <div>
                            <div className={"lineH"}></div>
                        </div>

                        {showDetailUIColors &&
                            <ObjectViewer
                                showDetailUI={showDetailUIColors} setShowDetailUI={setShowDetailUIColors} description={false} thesaurus={_thes} personen={_pers}
                                image={image} details={details} color={getKeyByValue(colorRef, objectColor)} colors={_objects} colorStrip={true} indexUI={true}
                                box={false}
                            />
                        }

                    </div>
                </div>
            }
        </div>



    )
}

export default ColorIndex;