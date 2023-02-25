import React, {useState, useEffect, Suspense} from "react"
import { createClient } from '@supabase/supabase-js'
import {useNavigate} from "react-router-dom";
import {shuffleFisherYates, splice, getKeyByValue, fetchImageByColor} from "../utils/utils";
import ObjectViewer from "../elements/objectviewers/ObjectViewer";
import colorRef from "../data/db/colorRef.json"; // data with CSS color referencing.
import {useMediaQuery} from "react-responsive";

const supabase = createClient("https://nrjxejxbxniijbmquudy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yanhlanhieG5paWpibXF1dWR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDMwNTY0NCwiZXhwIjoxOTg5ODgxNjQ0fQ.3u7yTeQwlheX12UbEzoHMgouRHNEwhKmvWLtNgpkdBY")

const Index = () => {

    // UTILS
    let navigate = useNavigate();

    //MEDIA QUERIES
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 1224px)'
    })

    // COLOR INDEX
    const [colors, setColors] = useState([]); // fetch all colors used in DB and store
    const [thesaurus, setThesaurus] = useState([]) // fetchThesaurus
    const [personen, setPersonen] = useState("")

    const [objectColor, setObjectColor] = useState("Laurel green"); // set Color of objects to be shown in Masonry
    const [showColorUI, setShowColorsUI] = useState(false); // switch
    const [objectNumber, setObjectNumber] = useState("") // store object_number from image that was clicked
    const [details, setDetails] = useState("");
    const [showDetailUI, setShowDetailUI] = useState(false);
    const [image, setImage] = useState("");

    useEffect(() => {
        fetchColors()
        fetchThesaurus()
        fetchPersonen()
    }, []);

    console.log(colors)

    async function fetchColors() {
        const { data } = await supabase
            .from("dmg_objects_LDES")
            .select("color_names, HEX_values, iiif_image_uris, objectNumber",  {'head':false})
            .not("color_names", 'is', null)
        setColors(data)
    }

    async function fetchThesaurus() {
        const { data } = await supabase
            .from("dmg_thesaurus_LDES")
            .select("*",  {'head':false})
        setThesaurus(data)
    }

    async function fetchObjectsByID(objectNumber) {
        const { data } = await supabase
            .from("dmg_objects_LDES")
            .select("LDES_raw, objectNumber,  iiif_image_uris" )
            .eq("objectNumber", objectNumber)
        setDetails(data)
    }

    async function fetchPersonen() {
        const { data } = await supabase
            .from("dmg_personen_LDES")
            .select("*",  {'head':false})
        setPersonen(data)
    }

    function filterByValue(array, string) {
        let x = array.filter(o => o.iiif_image_uris.includes(string))
        return x[0]["objectNumber"];
        setObjectNumber(x[0]["objectNumber"])
        console.log(x[0]["objectNumber"])

            //Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
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
    }

    // when clicking on an image store objectNumber in memory (objectNumber)
    const handleImgClick = (id) => {
        setImage(id);
        //const objectNumberString = id.split("/")[7].split("-transcode-")[1].split("$")[0].split(".jpg")[0] // derive objectnumber from image URI
        //setObjectNumber(objectNumberString);
        setShowDetailUI(true);
        let objectNumberString = filterByValue(colors, id);
        fetchObjectsByID(objectNumberString)

    }

    function parseLDES(input) {
        const LDES = input[0]["LDES_raw"]
        //console.log(LDES["id"])
        return LDES
    }

    try{
        parseLDES(details);
    } catch {}

    const HexOptions = Object.entries(Hex100ran).map(([key , i]) =>  (
        <p className={"grid-text-autoflow"}
            //style={{color:myStyle[`${i}`] ? getKeyByValue(colorRef, key) : "black"}}
            style={{color: "black"}}
            onClick={()=>handleClickTag(key)} onMouseOver={()=>handleClick(i)}
            onMouseLeave={()=>handleClick(i)} key={key}>
            #{key},
        </p>
    ));

    const images = fetchImageByColor(colors, objectColor)
    const imageBlock = images.map(image => (
        <img
            onClick={()=>handleImgClick(image)}
            src={image.replace("/full/0/default.jpg", "/400,/0/default.jpg")}
        />
    ))

    const routeChange = () => {
        navigate("/")
    }


    return(
        <div className="container">
            <div className="grid--3_4_3">
                <h1 className="home">index</h1>
                <div></div>
                <h2 onClick={()=>routeChange()}>back to home</h2>

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
                    <div style={{height: "200px", overflowY:"scroll"}}>
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
                        <p>>>> scroll this way >>>></p>
                    </div>

                    <div className={showDetailUI? "container-masonry-half": "container-masonry-full"}>
                        <div className={"masonry"} style={{height: "700px", overflowY:"scroll"}}>
                            {imageBlock}
                        </div>
                        {showDetailUI &&
                            <ObjectViewer
                                showDetailUI={showDetailUI} setShowDetailUI={setShowDetailUI} description={false} thesaurus={thesaurus} personen={personen}
                                image={image} details={details} color={getKeyByValue(colorRef, objectColor)} colors={colors} colorStrip={true} indexUI={true} personen={personen}
                            />
                        }
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