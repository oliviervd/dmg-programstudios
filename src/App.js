import React, {Component, useState} from "react";
import masonryGrid from "./components/masonry.py";
import ColorPicker from "./components/colorPicker";
import object_colors from "./data/objects_color.json";

class App extends Component {
    render() {

        return (
            <div>
                <div>
                    <h1 onClick={masonryGrid}>SPECTRUM</h1>
                    <ColorPicker/>
                    <h4>pull. transmit. fall in love, and break up again.</h4>
                    <div className={"container"} id={"imageRandom"}>
                    </div>
                </div>
            </div>
        )
    };
}

export default App;