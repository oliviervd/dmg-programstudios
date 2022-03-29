import React from "react";
import XenoHeader from "./components/header+footer/xenoHeader"
import SpectreMain from "./components/spectre"
import ProjectDescription from "./components/projectDescription";

function App() {

    const _objectNum = 4;

    return (
        <div>
                <XenoHeader/>
                <div className="mainContainer">
                    <ProjectDescription></ProjectDescription>
                    <div className="dotLine"></div>
                    <SpectreMain num={_objectNum}/>
                    <div className="dotLine"></div>
                </div>
        </div>
    );
}


export default App;