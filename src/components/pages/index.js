import React, {useState, useEffect} from "react"
import { createClient } from '@supabase/supabase-js'
import {useNavigate} from "react-router-dom";
import {shuffleFisherYates, splice, getKeyByValue} from "../utils/utils";

import colorRef from "../data/db/colorRef.json";

const supabase = createClient("https://nrjxejxbxniijbmquudy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yanhlanhieG5paWpibXF1dWR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDMwNTY0NCwiZXhwIjoxOTg5ODgxNjQ0fQ.3u7yTeQwlheX12UbEzoHMgouRHNEwhKmvWLtNgpkdBY")

const Index = () => {

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


    const HexList = [];
    for (let i=0; i<colors.length; i++){
        // iterate over all colors.
        for (let z=0; z<colors[i]["color_names"].length; z++) {
            for (let hex = 0; hex < colors[i]["color_names"][z].length; hex++) {
                HexList.push(colors[i]["color_names"][z][hex])
            }
        }
    }
    const _HexCounts = {};
    for (const _hex of HexList) {
        _HexCounts[_hex] = _HexCounts[_hex] ? _HexCounts[_hex] + 1 : 1;
    }
    const Hex100 = shuffleFisherYates(_HexCounts) // RANDOMIZE SELECTION OF COLORS USING FISHER YATES

    const Hex100ran = splice(Hex100, 0, 100); // ONLY SELECT FIRST 100 OUT OF SELECTION.
    const HexOptions = Object.entries(Hex100ran).map(([key , value]) =>  (
        <h2 style={{color:getKeyByValue(colorRef, key)}} key={key}>{key}</h2>
    ));

    return(
        <div className="container">
            <div className="grid--3_4_3">
                <h1 className="home">index</h1>
                <div></div>
                <h2 className="box-title main" style={{textAlign: "right"}} onClick={()=>navigate("/")}>return.</h2>
            </div>
            <div className="grid--even">
                <div>
                    <div className="lineH"/>
                    <p>systems</p>
                    <div className="grid--even_10">
                        <h2>019</h2>
                        <h2>DESIGN MUSEUM GENT</h2>
                    </div>

                </div>
                <div>
                    <div className="lineH"/>
                    <div className="grid--2_6_2">
                        <p>colors</p>
                        <div></div>
                        <p style={{textAlign:"center"}}>*pseudorandom selection out of {HexList.length} colors observed.</p>
                    </div>
                    <div className="grid--even_10">
                        {HexOptions}
                    </div>


                </div>
                <div>
                    <div className="lineH"/>
                    <p>people</p>
                    <div className="grid--even_8">

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Index;