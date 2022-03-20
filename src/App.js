import React, {useState} from "react";
import XenoHeader from "./components/xeno"
import SpectreMain from "./components/spectre"
import {spectrumProvider} from "./spectrumContext";

function App() {

    const [colors, setColors] = useState({
        color: ""
    })

    const [objectSelect, setObjectSelect] = useState(""); //todo: fetch and pass prop upstream from masonry.


    const handleSubmit = (c) => {
        c.preventDefault();
        console.log(colors)
    }

    return (
        <div>
            <spectrumProvider>
                <XenoHeader/>
                <SpectreMain/>
                {/*<form onSubmit={handleSubmit}>
                    a spectrum of <br/>
                    <input onChange={(c) => setColors({...colors, color: c.target.value})}
                           type="text"
                           value={colors.color}/> <br/>
                    traversing an ocean of desire
                </form>
                <MetaSelection col={colors.color}/>*/}

            </spectrumProvider>
        </div>
    );
}


export default App;