import React from "react";

const HexCube = (props) => {

    const hex_list = props.hexColors

    return (
        <div>
            <div className="hexCube">
                <div style={{backgroundColor: hex_list[0].replace("[","")}}>{hex_list[0].replace("[","")}</div>
                <div style={{backgroundColor: hex_list[1].replace(" '","").replace("'","")}}>{hex_list[1].replace(" '","").replace("'","")}</div>
                <div style={{backgroundColor: hex_list[2].replace(" '","").replace("'","")}}>{hex_list[2].replace(" '","").replace("'","")}</div>
                <div style={{backgroundColor: hex_list[3].replace(" '","").replace("'","")}}>{hex_list[3].replace(" '","").replace("'","")}</div>
                <div style={{backgroundColor: hex_list[4].replace(" '","").replace("'","")}}>{hex_list[4].replace(" '","").replace("'","")}</div>
                <div style={{backgroundColor: hex_list[5].replace(" '","").replace("'","")}}>{hex_list[5].replace(" '","").replace("'","")}</div>
                <div style={{backgroundColor: hex_list[6].replace(" '","").replace("'","")}}>{hex_list[6].replace(" '","").replace("'","")}</div>
                <div style={{backgroundColor: hex_list[7].replace(" '","").replace("'","")}}>{hex_list[7].replace(" '","").replace("'","")}</div>
                <div style={{backgroundColor: hex_list[8].replace(" '","").replace("'","")}}>{hex_list[8].replace(" '","").replace("'","")}</div>
                <div style={{backgroundColor: hex_list[9].replace(" '","").replace("'","")}}>{hex_list[9].replace(" '","").replace("'","")}</div>
            </div>
            {/*<div className="hexCubeNames">
                <p> {color_names[0].replace("[['","").replace("'","")}</p>
                <p> {color_names[1].replace("'","").replace("'","")}</p>
                <p> {color_names[2].replace("'","").replace("'","")}</p>
                <p> {color_names[3].replace("'","").replace("'","")}</p>
                <p> {color_names[4].replace("'","").replace("'","")}</p>
                <p> {color_names[5].replace("'","").replace("'","")}</p>
                <p> {color_names[6].replace("'","").replace("'","")}</p>
                <p> {color_names[7].replace("'","").replace("'","")}</p>
                <p> {color_names[8].replace("'","").replace("'","")}</p>
                <p> {color_names[9].replace("]]","")}</p>

            </div>*/}
        </div>

    )
}

export default HexCube;