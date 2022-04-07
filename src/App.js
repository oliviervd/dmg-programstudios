import React, {useState, useEffect} from "react";
import XenoHeader from "./components/header+footer/xenoHeader"
import SpectreMain from "./components/spectre"
import ProjectDescription from "./components/projectDescription";

function App() {

    const _objectNum = 4;

    //todo: select language

    //switch for hiding or showing the sidebar (description + glossary)
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

    useEffect(() => {
        console.log("check")
    }) 


    return (
        <div>
            <div className="headerContainer">
                <XenoHeader/>
                <div className="languages_button_box">
                    <div className="button-lang">NL</div>
                    <div className="button-lang">EN</div>
                </div>
            </div>
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