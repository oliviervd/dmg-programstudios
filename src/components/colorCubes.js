import React from "react";
import HexCube from "../components/cube"
import ObjectDescription from "./objectDescription";

import ldes_translations from "../data/ldes_dmg_translations.json"



function titleViaURI(uri) {
    return ldes_translations.filter(
        function(ldes_translations) {
            return ldes_translations.URI === uri
        }
    )

}

const ColorCubes = (props) => {

        const selection = props.curation
        const object_colors = props.data
        console.log(props.data);
        const color_hex = [];
        const color_names = [];
        const obj_titles_EN = [];
        const obj_desc_EN = [];

        for (var hexNum=0; hexNum<4; ++hexNum) {
            const x = selection[hexNum];
            var _hexVal = object_colors[x]["HEX_values"].replace("['","").replace("']","").replace("'","").split(",")

            const uri = object_colors[x]["URI"];

            const color_name = object_colors[x]["color_names"]

            const title = titleViaURI(uri)

            const title_en = title[0]["title_en"];
            const desc_en = title[0]["description_adlib_en"]

            color_hex.push(_hexVal);
            color_names.push(color_name);
            obj_titles_EN.push(title_en);
            obj_desc_EN.push(desc_en);
        }

    return(
            <div className="container">
                    <div>
                        <HexCube
                            hexColors = {color_hex[0]}
                            color_names={color_names[0]}/>
                        <div className="dotLine"/>
                        <div className="title-box">
                            <h1 className="title-box__title">**{obj_titles_EN[0]}</h1>
                        </div>
                        <div className="dotLine"/>
                        <div className="rowScroll">
                            <ObjectDescription text={obj_desc_EN[0]}/>
                        </div>
                    </div>
                    <div>
                        <HexCube
                            hexColors = {color_hex[1]}
                            color_names={color_names[1]}
                        />
                        <div className="dotLine"/>
                        <div className="title-box">
                            <h1 className="title-box__title underlined">**{obj_titles_EN[1]}</h1>
                        </div>
                        <div className="dotLine"/>
                        <div className="rowScroll">
                            <ObjectDescription text={obj_desc_EN[1]}/>
                        </div>
                    </div>
                    <div>

                        <HexCube
                            hexColors = {color_hex[2]}
                            color_names={color_names[2]}
                        />
                        <div className="dotLine"/>
                        <div className="title-box">
                            <h1 className="title-box__title">**{obj_titles_EN[2]}</h1>
                        </div>
                        <div className="dotLine"/>
                        <div className="rowScroll">
                            <ObjectDescription text={obj_desc_EN[2]}/>
                        </div>

                    </div>

            </div>
        )

}

export default ColorCubes;