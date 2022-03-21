import React, {useState} from "react";
import XenoHeader from "./components/header+footer/xenoHeader"
import SpectreMain from "./components/spectre"
import ProjectDescription from "./components/projectDescription";
import {spectrumProvider} from "./spectrumContext";
import $ from 'jquery';

function App() {

    const _objectNum = 4;

    const [colors, setColors] = useState({
        color: ""
    })

    const [objectSelect, setObjectSelect] = useState(""); //todo: fetch and pass prop upstream from masonry.


    const handleSubmit = (c) => {
        c.preventDefault();
        console.log(colors)
    }

    var h = $('#handle'),
        l = $('#left'),
        r = $('#right'),
        w = $('body').width() - 18;

    var isDragging = false;

    h.mousedown(function(e){
        isDragging = true;
        e.preventDefault();
    });
    $(document).mouseup(function(){
        isDragging = false;
    }).mousemove(function(e){
        if(isDragging){
            l.css('width', e.pageX);
            r.css('width', w - e.pageX);
        }
    });

    return (
        <div>
            <spectrumProvider>
                <XenoHeader/>
                <div className="mainContainer">
                    <ProjectDescription></ProjectDescription>
                    <SpectreMain num={_objectNum}/>
                </div>

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