import React, {useState} from "react";
import XenoHeader from "./components/header+footer/xenoHeader"
import SpectreMain from "./components/spectre"
import ProjectDescription from "./components/projectDescription";

function App() {

    const _objectNum = 4;

    const [sideActiveDescription, setSideActiveDescription] = useState(false);
    const [sideActiveGloss, setSideActiveGloss] = useState(false);

    function openSideDesc() {
        console.log("MTF STOP HIDING ME")
        setSideActiveDescription(!sideActiveDescription);
    }

    function openSideGloss() {
        console.log("WELCOME TO THE GLOSS SIDE OF THINGS")
        setSideActiveGloss(!sideActiveGloss);
    }


    return (
        <div>
            <XenoHeader/>
            <div className="superContainer">
                <div className="sideBarLeft-Nav">

                    <div className="sideBarLeft-Nav__button" onClick={openSideDesc}>
                        <p className="rotateText"> aBOUT.</p>
                    </div>

                    <div className="sideBarLeft-Nav__button" onClick={openSideGloss}>
                        <p className="rotateText"> gLOSSARY.</p>
                    </div>

                </div>

                {sideActiveDescription &&
                    <ProjectDescription/>
                }

                <div className="mainContainerAlt">
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