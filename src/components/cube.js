const HexCube = (props) => {

    const cubeColors = [];
    const hex_list = props.hexColors
    console.log(hex_list)

    for (var cube=0; cube<10; ++cube) {
        console.log(hex_list[0][cube].replace("[",""))
    }

    return (
        <div className="hexCube">
            <div style={{backgroundColor: hex_list[0][0].replace("[","")}}>{hex_list[0][0].replace("[","")}</div>
            <div style={{backgroundColor: hex_list[0][1].replace(" '","").replace("'","")}}>{hex_list[0][1].replace(" '","").replace("'","")}</div>
            <div style={{backgroundColor: hex_list[0][2].replace(" '","").replace("'","")}}>{hex_list[0][2].replace(" '","").replace("'","")}</div>
            <div style={{backgroundColor: hex_list[0][3].replace(" '","").replace("'","")}}>{hex_list[0][3].replace(" '","").replace("'","")}</div>
            <div style={{backgroundColor: hex_list[0][4].replace(" '","").replace("'","")}}>{hex_list[0][4].replace(" '","").replace("'","")}</div>
            <div style={{backgroundColor: hex_list[0][5].replace(" '","").replace("'","")}}>{hex_list[0][5].replace(" '","").replace("'","")}</div>
            <div style={{backgroundColor: hex_list[0][6].replace(" '","").replace("'","")}}>{hex_list[0][6].replace(" '","").replace("'","")}</div>
            <div style={{backgroundColor: hex_list[0][7].replace(" '","").replace("'","")}}>{hex_list[0][7].replace(" '","").replace("'","")}</div>
            <div style={{backgroundColor: hex_list[0][8].replace(" '","").replace("'","")}}>{hex_list[0][8].replace(" '","").replace("'","")}</div>
            <div style={{backgroundColor: hex_list[0][9].replace(" '","").replace("'","")}}>{hex_list[0][9].replace(" '","").replace("'","")}</div>
        </div>
    )
}

export default HexCube;