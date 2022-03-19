import React, {useState} from "react";
import XenoHeader from "./components/xeno"
import MetaSelection from "./components/metaSelection"
import MasonryGrid from "./components/masonry";

/*
STRUCTURE:

>- app
>-- color picker; "a spectrum of {colors} traversing an ocean of desire"
>-- catalogue
>---- image
>---- color hex
>---- info text

 */

function App() {

    const [colors, setColors] = useState({
        color: ""
    })

    const handleSubmit = (c) => {
        c.preventDefault();
        console.log(colors)
    }

    return (
        <div>
            <XenoHeader/>
            <div className="container" id="imageRandom"></div>
            <form onSubmit={handleSubmit}>
                a spectrum of <br/>
                <input onChange={(c) => setColors({...colors, color: c.target.value})}
                       type="text"
                       value={colors.color}/> <br/>
                traversing an ocean of desire
            </form>
            <button onClick={MasonryGrid}>CLICK</button>
            <MetaSelection col={colors.color}/>

            {/*<h4>pull. transmit. fall in love, and break up again.</h4>*/}
            {/*<button onClick = {MasonryGrid}>GENERATE</button>*/}
            {/*<div className={"container"} id={"imageRandom"}>*/}

        </div>
    );
}


export default App;