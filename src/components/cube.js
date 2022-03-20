const HexCube = (props) => {

    const cubeColors = [];
    const hex_list = props.hexColors

    for (var cube=0; cube<10; ++cube) {

    }

    return (
        <div className="hexCube">
            <div>{hex_list}</div>
            <div>{hex_list}</div>
            <div>{hex_list}</div>
            <div>{hex_list}</div>
            <div>{hex_list}</div>
            <div>{hex_list}</div>
            <div>{hex_list}</div>
            <div>{hex_list}</div>
            <div>{hex_list}</div>
            <div>{hex_list}</div>
        </div>
    )
}

export default HexCube;