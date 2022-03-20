import React from "react";
import object_colors from "../data/objectsColor.json";
import HexCube from "../components/cube"


const ColorCubes = (props) => {

        const maxL = 198;

        const selection = props.curation
        const color_hex = [];
        const color_hex_text = [];
        for (var hexNum=0; hexNum<4; ++hexNum) {
            const x = selection[hexNum];
            var _hexVal = object_colors[x]["HEX_values"].replace("['","").replace("']","").replace("'","").split(",")
            const _hexValStr = object_colors[x]["HEX_values"].replace("['","").replace("']","").replace("'","").split("[")
            color_hex.push(_hexVal)
            color_hex_text.push(_hexValStr[1])
        }


    return(
            //<p>{props._hVal}</p> //todo: fetch hex values from masonry.js

            <div className="container">
                    <div>
                        <h2>GHOSTS AND THEIR SHELLS </h2><h3>DREAMING OF IMAGES</h3>{color_hex_text[0]}
                        <HexCube hexColors = {color_hex[0]}/>
                    </div>
                    <div>
                        <h2>GHOSTS AND THEIR SHELLS </h2><h3>DREAMING OF IMAGES</h3>{color_hex_text[1]}
                        <HexCube hexColors = {color_hex[1]}/>
                    </div>
                    <div><h2>GHOSTS AND THEIR SHELLS </h2>
                        <h3>DREAMING OF IMAGES</h3>{color_hex_text[2]}
                        <HexCube hexColors = {color_hex[2]}/>
                    </div>
                    <div>
                        <h2>GHOSTS AND THEIR SHELLS </h2><h3>DREAMING OF IMAGES</h3>{color_hex_text[3]}
                        <HexCube hexColors = {color_hex[3]}/>
                    </div>

            </div>
        )

}

export default ColorCubes;