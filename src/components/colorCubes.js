import React, {useState} from "react";
import axios from 'axios';

import object_colors from "../data/objectsColor.json";
import HexCube from "../components/cube"

const {translate} = require('deepl-translator');


const ColorCubes = (props) => {

        const maxL = 198;

        const selection = props.curation
        const color_hex = [];
        const color_hex_text = [];
        const obj_titles_NL = [];
        //const obj_titles_EN = [];
        for (var hexNum=0; hexNum<4; ++hexNum) {
            const x = selection[hexNum];
            var _hexVal = object_colors[x]["HEX_values"].replace("['","").replace("']","").replace("'","").split(",")
            const _hexValStr = object_colors[x]["HEX_values"].replace("['","").replace("']","").replace("'","").split("[")
            const _objTitle = object_colors[x]["title"]
            //console.log(_objTitle)
            //const _objTitleEn = translate("Vaas 83 met vogel", 'EN', 'NL')
            //    .then(res => console.log(`Translation: ${res.translation}`))
            //    .catch(console.error);
            color_hex.push(_hexVal);
            color_hex_text.push(_hexValStr[1]);
            obj_titles_NL.push(_objTitle);
            //obj_titles_EN.push(_objTitleEn);
        }

    return(
            //<p>{props._hVal}</p> //todo: fetch hex values from masonry.js

            <div className="container">
                    <div>
                        <h2>GHOSTS AND THEIR SHELLS </h2>
                        <h3>DREAMING OF IMAGES</h3>{color_hex_text[0]}
                        <HexCube hexColors = {color_hex[0]}/>
                        <h3>**{obj_titles_NL[0]}</h3>
                        <h3 className="rowScroll"></h3>
                    </div>
                    <div>
                        <h2>GHOSTS AND THEIR SHELLS </h2>
                        <h3>DREAMING OF IMAGES</h3>{color_hex_text[1]}
                        <HexCube hexColors = {color_hex[1]}/>
                        <h3>**{obj_titles_NL[1]}</h3>
                        <h3 className="rowScroll"></h3>


                    </div>
                    <div>
                        <h2>GHOSTS AND THEIR SHELLS </h2>
                        <h3>DREAMING OF IMAGES</h3>{color_hex_text[2]}
                        <HexCube hexColors = {color_hex[2]}/>
                        <h3>**{obj_titles_NL[2]}</h3>
                        <h3 className="rowScroll"></h3>


                    </div>
                    <div>
                        <h2>GHOSTS AND THEIR SHELLS </h2>
                        <h3>DREAMING OF IMAGES</h3>{color_hex_text[3]}
                        <HexCube hexColors = {color_hex[3]}/>
                        <h3>**{obj_titles_NL[3]}</h3>
                        <h3 className="rowScroll"></h3>

                    </div>

            </div>
        )

}

export default ColorCubes;