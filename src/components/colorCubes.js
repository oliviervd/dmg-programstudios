import React from "react";

import object_colors from "../data/objectsColor_10.json";
import ldes_translations from "../data/ldes_dmg_translations.json"

import HexCube from "../components/cube"

function titleViaURI(uri) {
    return ldes_translations.filter(
        function(ldes_translations) {
            return ldes_translations.URI === uri
        }
    )

}

const ColorCubes = (props) => {

        const selection = props.curation
        const color_hex = [];
        const obj_titles_EN = [];
        const obj_desc_EN = [];

        for (var hexNum=0; hexNum<4; ++hexNum) {
            const x = selection[hexNum];
            var _hexVal = object_colors[x]["HEX_values"].replace("['","").replace("']","").replace("'","").split(",")
            const _hexValStr = object_colors[x]["HEX_values"].replace("['","").replace("']","").replace("'","").split("[")
            const _objTitle = object_colors[x]["title"]

            const uri = object_colors[x]["URI"];
            console.log(uri)

            const title = titleViaURI(uri)
            console.log(title)

            const title_en = title[0]["title_en"];
            const desc_en = title[0]["description_adlib_en"]

            color_hex.push(_hexVal);
            obj_titles_EN.push(title_en);
            obj_desc_EN.push(desc_en);
        }

    return(
            //<p>{props._hVal}</p> //todo: fetch hex values from masonry.js

            <div className="container">
                    <div>

                        <HexCube hexColors = {color_hex[0]}/>
                        <div className="dotLine"></div>
                        <div className="titleBox">
                            <h2 className="titleBoxTitle">**{obj_titles_EN[0]}</h2>
                        </div>
                        <h3 className="rowScroll">{obj_desc_EN[0]}</h3>
                    </div>
                    <div>

                        <HexCube hexColors = {color_hex[1]}/>
                        <div className="dotLine"></div>
                        <div className="titleBox">
                            <h2 className="titleBoxTitle underlined">**{obj_titles_EN[1]}</h2>
                        </div>
                        <h3 className="rowScroll">{obj_desc_EN[1]}</h3>


                    </div>
                    <div>

                        <HexCube hexColors = {color_hex[2]}/>
                        <div className="dotLine"></div>
                        <div className="titleBox">
                            <h2 className="titleBoxTitle">**{obj_titles_EN[2]}</h2>
                        </div>
                        <h3 className="rowScroll">{obj_desc_EN[2]}</h3>


                    </div>
                    <div>

                        <HexCube hexColors = {color_hex[3]}/>
                        <div className="dotLine"></div>
                        <div className="titleBox">
                            <h2 className="titleBoxTitle underlined">**{obj_titles_EN[3]}</h2>
                        </div>
                        <div className='rowScroll'>
                            <h3>{obj_desc_EN[3]}</h3>
                        </div>


                    </div>

            </div>
        )

}

export default ColorCubes;