import React, {useState} from "react";
import MasonryGrid from "./components/masonry.py";
import ColorPicker from "./components/colorPicker";

/*
STRUCTURE:

>- app
>-- color picker
>-- catalogue
>---- image
>---- color hex
>---- info text

 */

function App() {

    return (
        <div>
            <div>
                <h1>SPECTRUM</h1>
                <ColorPicker></ColorPicker>
                <h4>pull. transmit. fall in love, and break up again.</h4>
                <button onClick = {MasonryGrid}>GENERATE</button>
                <div className={"container"} id={"imageRandom"}>
                </div>
            </div>
        </div>
    );
}


export default App;