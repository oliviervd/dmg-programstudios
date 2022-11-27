import React from "react";

const HexCube = (props) => {

    const hex_list = props.hexColors

    //todo: show Hexlist only on hover

    return (
        <div>
            <div className="hexCube" style={{margin:20}}>
                <p className ="hexCube__single" style={{backgroundColor: hex_list[0].replace("[","")}}>{hex_list[0].replace("[","")}</p>
                <p className ="hexCube__single" style={{backgroundColor: hex_list[1].replace(" '","").replace("'","")}}>{hex_list[1].replace(" '","").replace("'","")}</p>
                <p className ="hexCube__single" style={{backgroundColor: hex_list[2].replace(" '","").replace("'","")}}>{hex_list[2].replace(" '","").replace("'","")}</p>
                <p className ="hexCube__single" style={{backgroundColor: hex_list[3].replace(" '","").replace("'","")}}>{hex_list[3].replace(" '","").replace("'","")}</p>
                <p className ="hexCube__single" style={{backgroundColor: hex_list[4].replace(" '","").replace("'","")}}>{hex_list[4].replace(" '","").replace("'","")}</p>
                <p className ="hexCube__single" style={{backgroundColor: hex_list[5].replace(" '","").replace("'","")}}>{hex_list[5].replace(" '","").replace("'","")}</p>
                <p className ="hexCube__single" style={{backgroundColor: hex_list[6].replace(" '","").replace("'","")}}>{hex_list[6].replace(" '","").replace("'","")}</p>
                <p className ="hexCube__single" style={{backgroundColor: hex_list[7].replace(" '","").replace("'","")}}>{hex_list[7].replace(" '","").replace("'","")}</p>
                <p className ="hexCube__single" style={{backgroundColor: hex_list[8].replace(" '","").replace("'","")}}>{hex_list[8].replace(" '","").replace("'","")}</p>
                <p className ="hexCube__single" style={{backgroundColor: hex_list[9].replace(" '","").replace("'","")}}>{hex_list[9].replace(" '","").replace("'","")}</p>
            </div>
        </div>

    )
}

export default HexCube;