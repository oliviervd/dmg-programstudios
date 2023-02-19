import React, {useState, useEffect, Suspense} from "react"
import { createClient } from '@supabase/supabase-js'
import {useNavigate} from "react-router-dom";
import {shuffleFisherYates, splice, getKeyByValue} from "../utils/utils";

import colorRef from "../data/db/colorRef.json";
import {useMediaQuery} from "react-responsive";

const supabase = createClient("https://nrjxejxbxniijbmquudy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yanhlanhieG5paWpibXF1dWR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDMwNTY0NCwiZXhwIjoxOTg5ODgxNjQ0fQ.3u7yTeQwlheX12UbEzoHMgouRHNEwhKmvWLtNgpkdBY")

const Index = () => {
    //responsive
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 1224px)'
    })

    let navigate = useNavigate();
    // COLOR INDEX
    const [colors, setColors] = useState([]);
    useEffect(() => {
        fetchColors()
    }, []);



    async function fetchColors() {
        const { data } = await supabase
            .from("dmg_objects_LDES")
            .select("color_names, HEX_values, iiif_image_uris",  {'head':false})
            .not("color_names", 'is', null)
        setColors(data)
    }

    function fetchImageByColor(color) {
        const imageList = []
        for (let i=0; i<colors.length; i++){
            for (let z=0; z<colors[i]["color_names"].length; z++) {
                if (colors[i]["color_names"][z].includes(color)) {
                    //console.log(colors[i]["iiif_image_uris"][z])
                    imageList.push(colors[i]["iiif_image_uris"][z])
                }
            }
        }
        return imageList
    }


    const HexList = [];
    for (let i=0; i<colors.length; i++){
        // iterate over all colors.
        for (let z=0; z<colors[i]["color_names"].length; z++) {
            for (let hex = 0; hex < colors[i]["color_names"][z].length; hex++) {
                if (colors[i]["color_names"][z][hex] != "Gray (X11 gray)"){
                    HexList.push(colors[i]["color_names"][z][hex])
                }
            }
        }
    }
    const _HexCounts = {};
    for (const _hex of HexList) {
        _HexCounts[_hex] = _HexCounts[_hex] ? _HexCounts[_hex] + 1 : 1;
    }
    const Hex100 = shuffleFisherYates(_HexCounts) // RANDOMIZE SELECTION OF COLORS USING FISHER YATES

    console.log(Hex100)
    const Hex100ran = splice(Hex100, 0, 10000); // ONLY SELECT FIRST 100 OUT OF SELECTION.

    // set STYLING (onHover pickup color);
    const [myStyle, setMyStyle] = useState({})
    const handleClick = (id) => {
        setMyStyle(prevState => ({
            ...myStyle,
            [id]: !prevState[id]
        }))
    }

    // set Color for selection of collection;
    const [objectColor, setObjectColor] = useState("MA");
    const [showColors, setShowColors] = useState(false);

    const HexOptions = Object.entries(Hex100ran).map(([key , i]) =>  (
        <p className={"grid-text-autoflow"}
            //style={{color:myStyle[`${i}`] ? getKeyByValue(colorRef, key) : "black"}}
            style={{color: "black"}}
            onClick={()=>setObjectColor(key)} onMouseOver={()=>handleClick(i)}
            onMouseLeave={()=>handleClick(i)} key={key}>
            #{key},
        </p>
    ));

    const images = fetchImageByColor(objectColor)
    const imageBlock = images.map(image => (
        <img src={image.replace("/full/0/default.jpg", "/400,/0/default.jpg")}/>
    ))
    console.log(images);



    return(
        <div className="container">
            <div className="grid--3_4_3">
                <h1 className="home">index</h1>
                <div></div>
                {isDesktopOrLaptop&&
                    <h2 className="uppercase text-center" style={{textAlign: "right", margin: 10, marginTop: "-10px"}} onClick={()=>navigate("/")}>home</h2>
                }
            </div>
            <div className="grid--even">
                <div>
                    <div className="lineH"/>
                    <div className="grid--2_6_2">
                        <p>colors</p>
                        <div></div>
                        {isDesktopOrLaptop&&
                            <p style={{textAlign:"center"}}>*pseudorandom selection out of {HexList.length} colors observed.</p>
                        }
                    </div>
                    <div className={showColors? "full": "half"}>
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
                        <div></div>
                    </div>
                    <h2 style={{color: getKeyByValue(colorRef, objectColor)}}>{objectColor}</h2>
                    <div className={"container-masonry"}>
                        <div className="masonry">
                            {imageBlock}
                        </div>
                    </div>


                </div>

                <div>
                    <div className="lineH"/>
                    <p>people</p>
                    <div className="grid--even_8">

                    </div>
                </div>
                <div>
                    <div className="lineH"/>
                    <p>systems</p>
                    <div className="grid--even_10">
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Index;