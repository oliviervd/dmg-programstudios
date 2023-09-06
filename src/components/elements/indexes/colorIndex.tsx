import * as React from "react"
import {Suspense, useState} from "react";
import {useParams, useSearchParams, Link} from "react-router-dom";
import {fetchImageByColor, getKeyByValue, shuffleFisherYates, splice} from "../../utils/utils";
import colorRef from '../../data/colorRef.json';
import ObjectViewer from "../subjectpages/ObjectViewer";
import {useMediaQuery} from "react-responsive";
import SearchFilterBar from "../utils/SearchFilterBar";
import {filterByKey} from "../../utils/data_parsers";
import Loading from "../utils/Loading";
import translations from '../../data/translations.json';


const ColorIndex = (props) => {

    const [searchParamsColors, setSearchParamsColors] = useSearchParams()
    const [searchParamsGender, setSearchParamsGender] = useSearchParams()
    const _c = ["Tuscan brown", "Vanilla","Dark khaki", "Café noir",  "Rifle green", "Kobicha", "Artichoke", "Indigo dye", "Shadow blue", "Queen blue", "Gunmetal", "Morning blue", "Grullo", "Rich black (FOGRA39)"]
    const random = Math.floor(Math.random() * _c.length);
    const [image, setImage] = useState("");
    const [showDetailUIColors, setShowDetailUIColors] = useState(false);
    const [bitonal, setBitonal] = useState(false);
    const [details, setDetails] = useState("");
    const [hexFilter, setHexFilter] = useState("");
    const [colorInfo, setColorInfo] = useState(false);
    const [colorSwaps, setColorSwaps] = useState(true)

    const _lang = props.language
    function translate(_term, _lang) {
        return translations[_term][_lang] // _lang = key.
    }

    let maleFilter: boolean
    let femaleFilter: boolean
    if (searchParamsGender.get("sex") == "MALE") {
        maleFilter = true;
    }
    if (searchParamsGender.get("sex") == "FEMALE") {
        femaleFilter = true;
    }

    let objectColor: string
    if (searchParamsColors.get("color") != null) {
        objectColor = searchParamsColors.get("color")
    } else {
        objectColor = "Morning blue"
    }

    const selectGender = (type: string, value: string) => {
        searchParamsGender.set(type, value)
        setSearchParamsGender(searchParamsGender)
    }

    const selectColor = (type: string, value: string) => {
        searchParamsColors.set(type, value)
        setSearchParamsColors(searchParamsColors)
        props.setShowIndexColors(!props.showIndexColors)
        objectColor = value;
    }

    const _objects = props.objects
    const _thes  = props.thesaurus
    const _pers = props.agents
    const about = props.about

    //MEDIA QUERIE
    const isDesktopOrLaptop:boolean = useMediaQuery({
        query: '(min-width: 700px)'
    })
    const isMobile:boolean = useMediaQuery({
        query: '(max-width: 700px)'
    })

    //todo: when clicking on an image store objectNumber in memory (objectNumber) --> searchparams
    const handleImgClick = (id) => {
        setImage(id);
        setShowDetailUIColors(true);
        let objectNumberString = filterByValue(_objects, id);
        fetchObjectById(objectNumberString);
    }

    // parse MEDIA
    let images;
    images = fetchImageByColor(_objects, objectColor)

    let imageBlock: JSX.Element = <></>

    try{
        if (bitonal) {
            imageBlock = images.map(image => (
                <img
                    onClick={()=>handleImgClick(image)}
                     //todo: alt
                    src={image.replace("/full/0/default.jpg", "/400,/0/bitonal.jpg")}
                />
            ))
        } else {
            imageBlock = images.map(image => (
                <img
                    className={"hoverImage"}
                    onClick={()=>handleImgClick(image)}
                     // todo: alt
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
    let HexOptions;
    try{
        if (hexFilter==="") {
            try{
                if (!colorSwaps) {
                    HexOptions = Object.entries(Hex100ran).map(([key , i]) =>  (
                        <p className={"grid-text-autoflow"}
                            //style={{color:myStyle[`${i}`] ? getKeyByValue(colorRef, key) : "black"}}
                           style={{color: "black", fontWeight: "lighter"}}
                           onClick={()=>selectColor("color", key)}
                           key={key}>
                            #{key},
                        </p>

                    ));
                }else {
                    HexOptions = Object.entries(Hex100ran).map(([key , i]) =>  (
                        <p className={"grid-text-autoflow"}
                            //style={{color:myStyle[`${i}`] ? getKeyByValue(colorRef, key) : "black"}}
                           style={{
                               color: "black",
                               fontWeight: "lighter",
                               background:`${getKeyByValue(colorRef, key) + '40'}`,
                               //width:"40px",
                               //height:"20px",
                               //borderRadius: "30%"
                           }}
                           onClick={()=>selectColor("color", key)}
                           key={key}>
                            #{key}
                        </p>

                    ));
                }
            } catch {HexOptions=<p className={"rhizome"}>Loading...</p>}

        } else {
            HexOptions = _filterHex.map((color)=>{

                return <div style={{background:"pink"}}>
                    <p className={"grid-text-autoflow"}
                        //style={{color:myStyle[`${i}`] ? getKeyByValue(colorRef, key) : "black"}}
                       style={{color: "black"}}
                       onClick={()=>selectColor("color", color)}
                       key={color}>
                        #{color},
                    </p>
                </div>
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

                                {/* <div className={"turbulence"} style={{background: `${getKeyByValue(colorRef, objectColor)+'40'}`}}>
                                    <svg>
                                        <filter style={{visibility:"hidden"}} id="grainy">
                                            <feTurbulence
                                                type="turbulence"
                                                baseFrequency="0.9"
                                            />
                                            <feColorMatrix in="colorNoise" type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0" result="monoNoise" />
                                            <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />

                                        </filter>
                                    </svg>
                                    {/*<div className={"overlay"}></div>
                                </div> */}

                                <div>
                                    <div className="lineH"/>
                                    <div className="grid--2_6_2" style={{height: '5vh'}}>
                                        <div>
                                            <div style={{position: "absolute"}}>
                                                <h2>{translate('colors',_lang).toUpperCase()}</h2>
                                                <div style={{width: "10px"}}></div>
                                                <div >
                                                    <span className={"infoIcon"} style={{position: "absolute", left: "110%", top: 0, alignItems: "left", "height": 8, width: 8, fontSize:8, lineHeight:"8px"}} onClick={()=>setColorInfo(!colorInfo)}>i</span>
                                                </div>
                                                {colorInfo&&
                                                    <p style={{fontSize: "1.2em" ,padding: "10px",height: "auto", width:"500px", border:"solid 2px black", background: "white", position:"absolute", left: "100%"}}>{translate("colorIndexInfo",_lang)}</p>
                                                }
                                                <p onClick={()=>{setColorSwaps(!colorSwaps)}}>
                                                    ◧ show colors
                                                </p>
                                            </div>
                                        </div>
                                        <div className={"grid--5_95"}>
                                            <div></div>
                                            <SearchFilterBar filter={hexFilter} setFilter={setHexFilter} prompt={translate("color_search_prompt", _lang)}/>
                                        </div>
                                        <p style={{textAlign:"center"}}></p>
                                    </div>
                                    <div className={"lineH"}></div>
                                </div>
                                <div style={props.style}>

                                    <Suspense fallback={<Loading />}>
                                        <div>
                                            {HexOptions}
                                        </div>
                                    </Suspense>

                                </div>
                            </div>
                            <div>

                                <div className="grid--2_6_2">
                                    <p>{translate("images", _lang)}</p>
                                    <p>  </p>
                                    <div></div>
                                    <p></p>
                                </div>

                                <div className="grid--2_6_2">
                                    <h2 style={{color: getKeyByValue(colorRef, objectColor)}}>{objectColor}</h2>
                                    <div></div>
                                    <div className={"grid--even_3"}>
                                        <div>
                                            <div>
                                               {/* {maleFilter &&
                                                    <p onClick={()=>selectGender("sex", "")}>◧ {translate("male", _lang)}</p>
                                                }
                                                {!maleFilter &&
                                                    <p onClick={()=>selectGender("sex", "MALE")}>⧅ {translate("male", _lang)}</p>
                                                }*/}
                                            </div>
                                            <div>
                                               {/* {femaleFilter &&
                                                    <p onClick={()=>selectGender("sex", "")}>◧ {translate("female", _lang)}</p>
                                                }
                                                {!femaleFilter &&
                                                    <p onClick={()=>selectGender("sex", "FEMALE")}>⧅ {translate("female", _lang)}</p>
                                                }*/}
                                            </div>

                                        </div>
                                        {bitonal &&
                                            <p onClick={()=> setBitonal(!bitonal)} >◧ {translate("bitonal", _lang)}</p>
                                        }
                                        {!bitonal &&
                                            <p onClick={()=> setBitonal(!bitonal)} >⧅ {translate("bitonal", _lang)}</p>
                                        }
                                        <p>{translate("scroll", _lang)}</p>

                                    </div>
                                </div>

                                {!about &&
                                    <div className={showDetailUIColors? "container-masonry-half": "container-masonry-full"}>
                                        <div className={"masonry"}>
                                            <Suspense fallback={<Loading/>}>
                                                {imageBlock}
                                            </Suspense>
                                        </div>
                                        {showDetailUIColors &&
                                            <ObjectViewer
                                                showDetailUI={showDetailUIColors} setShowDetailUI={setShowDetailUIColors} description={false} thesaurus={_thes} personen={_pers}
                                                image={image} details={details} color={getKeyByValue(colorRef, objectColor)} colors={_objects} colorStrip={true} indexUI={true}
                                                box={false} split={false} language={_lang} viewer={false}  attribution={false}
                                            />
                                        }
                                    </div>
                                }
                                {about &&
                                    <div className={showDetailUIColors? "container-masonry-half": "container-masonry-full"} style={{width: "70vw"}}>
                                        <div className={"masonry"}>
                                            {imageBlock}
                                        </div>
                                        {showDetailUIColors &&
                                            <ObjectViewer
                                                showDetailUI={showDetailUIColors} setShowDetailUI={setShowDetailUIColors} description={false} thesaurus={_thes} personen={_pers}
                                                image={image} details={details} color={getKeyByValue(colorRef, objectColor)} colors={_objects} colorStrip={true} indexUI={true}
                                                box={false} split={false} language={_lang} viewer={false} attribution={false}
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
        </div>



    )
}

export default ColorIndex;