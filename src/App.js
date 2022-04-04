import React, {useState} from "react";
import XenoHeader from "./components/header+footer/xenoHeader"
import SpectreMain from "./components/spectre"
import ProjectDescription from "./components/projectDescription";

function App() {

    const _objectNum = 4;

    const [sideActive, setSideActive] = useState(true);

    function openSide() {
        console.log("MTF STOP HIDING ME")
        setSideActive(!sideActive);
    }


    return (
        <div>
            <XenoHeader/>
            <div className="superContainer">
                {sideActive &&
                    <ProjectDescription/>
                }
                <div className="mainContainerAlt" onClick={openSide}>
                    <div className="dotLine"/>
                    <SpectreMain num={_objectNum}/>
                    <div className="dotLine"/>
                </div>
            </div>
                {/*<XenoHeader/>
                <div className="mainContainer">
                    <ProjectDescription/>
                    <div className="dotLine"/>
                    <SpectreMain num={_objectNum}/>
                    <div className="dotLine"/>
                </div>*/}
        </div>
    );
}


export default App;