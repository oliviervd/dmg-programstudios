import React, {useState, useEffect, Suspense} from "react"
import { createClient } from '@supabase/supabase-js'
import {useNavigate} from "react-router-dom";
import {shuffleFisherYates, splice, getKeyByValue, fetchImageByColor, wait} from "../utils/utils";
import ObjectViewer from "../elements/subjectpages/ObjectViewer";
import colorRef from "../data/db/colorRef.json"; // data with CSS color referencing.
import {useMediaQuery} from "react-responsive";
import Footer from "../elements/utils/Footer";
import ExhibitionIndex from "../elements/indexes/exhibitionIndex";

import useObjectsQuery from "../hooks/useObjectsQuery";
import useThesaurusQuery from "../hooks/useThesaurusQuery";
import useAgentQuery from "../hooks/useAgentQuery";
import {fetchAllExhibitions} from "../utils/data_parsers";
import {useQuery} from "@tanstack/react-query";
import useExhibitionLister from "../hooks/useExhibitionLister";

const Index = (props) => {
    // UTILS
    let navigate = useNavigate();
    //MEDIA QUERIES
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 700px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 700px)'
    })

    // COLOR INDEX
    const [collapseColors, setCollapseColors] = useState(true);
    const [objectNumber, setObjectNumber] = useState(""); // store object_number from image that was clicked
    const [details, setDetails] = useState("");
    const [showDetailUI, setShowDetailUI] = useState(false);
    const [image, setImage] = useState("");
    const [showIndex, setShowIndex] = useState(true);
    const [bitonal, setBitonal] = useState(false);
    const [about, setAbout] = useState(false);

    const _c = ["Tuscan brown", "Dark khaki", "Café noir", "Brown sugar", "Chestnut", "Kobicha", "Indigo dye", "Shadow blue", "Queen blue", "Eerie black", "Independence", "Morning blue", "Grullo", "Old rose"]
    const random = Math.floor(Math.random() * _c.length);
    const [objectColor, setObjectColor] = useState(_c[random]); // set Color of objects to be shown in Masonry

    // * --- IMPROVED API CALLS --- * //
    const _objects  = useObjectsQuery().data;
    const _thes  = useThesaurusQuery().data;
    const _pers = useAgentQuery().data;
    const _exhibitions = useExhibitionLister(_objects);
    console.log(_exhibitions)

    // * --- * //

    function fetchObjectById(ObjectNumber) {
        for (let i=0; i<_objects.length; i++) {
            if (_objects[i].objectNumber == ObjectNumber) {
                setDetails(_objects[i])
            }
        }
    }

    function filterByValue(array, string) {
        let x = array.filter(o => o.iiif_image_uris.includes(string))
        return x[0]["objectNumber"];
    }

    // todo: move Color index to separate component --> clean up code.

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

    // set STYLING (onHover pickup color);
    const [myStyle, setMyStyle] = useState({})
    const handleClick = (id) => {
        setMyStyle(prevState => ({
            ...myStyle,
            [id]: !prevState[id]
        }))
    }

    const handleClickTag = (key) => {
        setObjectColor(key)
        setShowIndex(!showIndex)
    }

    // when clicking on an image store objectNumber in memory (objectNumber)
    const handleImgClick = (id) => {
        setImage(id);
        setShowDetailUI(true);
        let objectNumberString = filterByValue(_objects, id);
        fetchObjectById(objectNumberString);
    }

    const HexOptions = Object.entries(Hex100ran).map(([key , i]) =>  (
        <p className={"grid-text-autoflow"}
            //style={{color:myStyle[`${i}`] ? getKeyByValue(colorRef, key) : "black"}}
            style={{color: "black"}}
            onClick={()=>handleClickTag(key)} onMouseOver={()=>handleClick(i)}
            onMouseLeave={()=>handleClick(i)} key={key}>
            #{key},
        </p>
    ));

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

    } catch {}

    // https://www.youtube.com/watch?v=FEiggoSm8tw
    const routeChange = () => {
        navigate("/")
    }

    let style;

    if(about) {
        style = {
            height: "200px",
            overflowY:"scroll",
            width: "70vw"
        }
    } else {
        style = {
            height: "200px",
            overflowY:"scroll"
        }
    }


    return(
        <div>
            {isDesktopOrLaptop&&
                <div>
                    <div className="grid--3_4_3 container">
                        <h1 className="home" onClick={()=>setAbout(!about)}>index</h1>
                        <div></div>
                        <h1 className="home" style={{textAlign:"right"}} onClick={()=>routeChange()}>home</h1>

                    </div>
                    <div className={about? "grid--3_7 container": "container"}>
                        {about &&
                            <div className={"grid--97_3"}>
                                <div style={{borderLeft: "1px solid black"}}>
                                    <div style={{margin: "10px"}}>
                                        <p className={"rhizome"}/>
                                            <br/>
                                            <p onClick={()=>setAbout(!about)}>[CLOSE]</p>
                                    </div>
                                </div>
                                <div className="lineV"></div>
                            </div>
                        }

                        <div>
                            <div className="grid--even" style={{width: "inherit"}}>
                                {collapseColors &&
                                    <div>
                                        <div style={{width:"inherit"}}>
                                            <div className="lineH"/>
                                            <div className="grid--2_6_2">
                                                <p onClick={()=>setCollapseColors(!collapseColors)}>colors</p>
                                                <div></div>
                                                <p style={{textAlign:"center"}}>*pseudorandom selection out of {HexList.length} colors observed.</p>
                                            </div>
                                            <div style={style}>
                                                <Suspense>
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
                                                <div className={showDetailUI? "container-masonry-half": "container-masonry-full"}>
                                                    <div className={"masonry"} style={{height: "700px", overflowY:"scroll", padding: "5px"}}>
                                                        {imageBlock}
                                                    </div>
                                                    {showDetailUI &&
                                                        <ObjectViewer
                                                            showDetailUI={showDetailUI} setShowDetailUI={setShowDetailUI} description={false} thesaurus={_thes} personen={_pers}
                                                            image={image} details={details} color={getKeyByValue(colorRef, objectColor)} colors={_objects} colorStrip={true} indexUI={true}
                                                            box={false}
                                                        />
                                                    }
                                                </div>
                                            }
                                            {about &&
                                                <div className={showDetailUI? "container-masonry-half": "container-masonry-full"} style={{width: "70vw"}}>
                                                    <div className={"masonry"} style={{height: "700px", overflowY:"scroll", padding: "5px"}}>
                                                        {imageBlock}
                                                    </div>
                                                    {showDetailUI &&
                                                        <ObjectViewer
                                                            showDetailUI={showDetailUI} setShowDetailUI={setShowDetailUI} description={false} thesaurus={_thes} personen={_pers}
                                                            image={image} details={details} color={getKeyByValue(colorRef, objectColor)} colors={_objects} colorStrip={true} indexUI={true}
                                                            box={false}
                                                        />
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </div>

                                }
                                {!collapseColors &&
                                    <div>
                                        <div className="lineH"/>
                                        <div style={{height: "5vh"}} className="grid--2_6_2">
                                            <p onClick={()=>setCollapseColors(!collapseColors)}>colors</p>
                                            <div></div>
                                            <p style={{textAlign:"center"}}>*pseudorandom selection out of {HexList.length} colors observed.</p>
                                        </div>
                                    </div>

                                }

                                <div>
                                    <div className="lineH"/>
                                    <p>exhibitions</p>
                                    <ExhibitionIndex exhibitionList={_exhibitions}/>
                                </div>
                                <div style={{height: "5vh"}}>
                                    <div className="lineH"/>
                                    <p className={"rhizome fast"}>[something is growing here... ]</p>
                                    <div className="grid--even_10">
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            }
            {isMobile &&
                <div>
                    <div className="grid--3_4_3">
                        <h1 className="home">index</h1>
                        <div></div>
                        <h2 onClick={()=>routeChange()}>back to home</h2>

                    </div>

                    <div>
                        <div className="lineH"/>
                        {showIndex &&
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
                            <p onClick={()=>setShowIndex(true)}>>>> scroll this way >>>></p>
                        </div>

                        <div className={"masonry"} style={{height: "85vh", overflowY:"scroll"}}>
                            {imageBlock}
                        </div>
                        <div>
                            <div className={"lineH"}></div>
                        </div>

                        {showDetailUI &&
                            <ObjectViewer
                                showDetailUI={showDetailUI} setShowDetailUI={setShowDetailUI} description={false} thesaurus={_thes} personen={_pers}
                                image={image} details={details} color={getKeyByValue(colorRef, objectColor)} colors={_objects} colorStrip={true} indexUI={true}
                                box={false}
                            />
                        }

                    </div>
                </div>
            }


        <Footer></Footer>
        </div>
    )
}

export default Index;