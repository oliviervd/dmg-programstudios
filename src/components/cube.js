const HexCube = (props) => {

    const cubeColors = [];
    const hex_list = props.hexColors
    //console.log(hex_list)

    for (var cube=0; cube<10; ++cube) {
        //console.log(hex_list[0][cube].replace("[",""))
    }

    return (
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
    )
}

export default HexCube;