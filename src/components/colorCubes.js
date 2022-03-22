import React from "react";

import object_colors from "../data/objectsColor_10.json";
import HexCube from "../components/cube"

const ColorCubes = (props) => {

        const selection = props.curation
        const color_hex = [];
        const obj_titles_NL = [];
        for (var hexNum=0; hexNum<4; ++hexNum) {
            const x = selection[hexNum];
            var _hexVal = object_colors[x]["HEX_values"].replace("['","").replace("']","").replace("'","").split(",")
            const _hexValStr = object_colors[x]["HEX_values"].replace("['","").replace("']","").replace("'","").split("[")
            const _objTitle = object_colors[x]["title"]

            color_hex.push(_hexVal);
            obj_titles_NL.push(_objTitle);
        }

    return(
            //<p>{props._hVal}</p> //todo: fetch hex values from masonry.js

            <div className="container">
                    <div>

                        <HexCube hexColors = {color_hex[0]}/>
                        <h3>**{obj_titles_NL[0]}</h3>
                        <h3 className="rowScroll"></h3>
                    </div>
                    <div>

                        <HexCube hexColors = {color_hex[1]}/>
                        <h3>**{obj_titles_NL[1]}</h3>
                        <h3 className="rowScroll"></h3>


                    </div>
                    <div>

                        <HexCube hexColors = {color_hex[2]}/>
                        <h3>**{obj_titles_NL[2]}</h3>
                        <h3 className="rowScroll"></h3>


                    </div>
                    <div>

                        <HexCube hexColors = {color_hex[3]}/>
                        <h3>**{obj_titles_NL[3]}</h3>
                        <h3 className="rowScroll"></h3>

                    </div>

            </div>
        )

}

export default ColorCubes;