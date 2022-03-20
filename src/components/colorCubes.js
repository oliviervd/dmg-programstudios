import React from "react";
import object_colors from "../data/objectsColor.json";
import HexCube from "../components/cube"


const ColorCubes = (props) => {

        const selection = props.curation
        const color_hex = [];
        for (var hexNum=0; hexNum<5; ++hexNum) {
            const x = selection[hexNum];
            var _hexVal = object_colors[x]["HEX_values"].replace("['","").replace("']","").replace("'","").split(",")
            color_hex.push(_hexVal)
        }



        const hex_1 = color_hex[0]
        console.log(color_hex[1])
        console.log(color_hex[2])
        console.log(color_hex[3])
        console.log(color_hex[4])


    return(
            //<p>{props._hVal}</p> //todo: fetch hex values from masonry.js

            <div className="container">
                    <div>
                        <h2>GHOSTS AND THEIR SHELLS </h2><h3>DREAMING OF IMAGES</h3>{color_hex[0]}
                        <HexCube hexColors = {color_hex[0]}/>
                    </div>
                    <div>
                        <h2>GHOSTS AND THEIR SHELLS </h2><h3>DREAMING OF IMAGES</h3>{color_hex[1]}
                        <HexCube hexColors = {color_hex[1]}/>
                    </div>
                    <div><h2>GHOSTS AND THEIR SHELLS </h2>
                        <h3>DREAMING OF IMAGES</h3>{color_hex[2]}
                        <HexCube hexColors = {color_hex[2]}/>
                    </div>
                    <div>
                        <h2>GHOSTS AND THEIR SHELLS </h2><h3>DREAMING OF IMAGES</h3>{color_hex[3]}
                        <HexCube hexColors = {color_hex[3]}/>
                    </div>
                    <div>
                        <h2>GHOSTS AND THEIR SHELLS </h2><h3>DREAMING OF IMAGES</h3>{color_hex[4]}
                        <HexCube hexColors = {color_hex[4]}/>
                    </div>
            </div>
        )

}

export default ColorCubes;