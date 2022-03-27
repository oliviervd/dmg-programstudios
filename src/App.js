import React, {useState} from "react";
import XenoHeader from "./components/header+footer/xenoHeader"
import SpectreMain from "./components/spectre"
import ProjectDescription from "./components/projectDescription";
import {spectrumProvider} from "./spectrumContext";
import $ from 'jquery';

function App() {

    const _objectNum = 4;

    return (
        <div>
            <spectrumProvider>
                <XenoHeader/>
                <div className="mainContainer">
                    <ProjectDescription></ProjectDescription>
                    <div className="dotLine"></div>
                    <SpectreMain num={_objectNum}/>
                    <div className="dotLine"></div>
                </div>
            </spectrumProvider>
        </div>
    );
}


export default App;