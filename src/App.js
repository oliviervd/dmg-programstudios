import React, {useState} from "react";
import { useMediaQuery } from "react-responsive";

// components
import XenoHeader from "./components/header+footer/xenoHeader"
import SpectreMain from "./components/spectre"
import ProjectDescription from "./components/projectDescription";
import Glossary from "./components/Glossary";

function App() {


    //todo: select language

    //set responsive dimensions
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})


    //switch for hiding or showing the sidebar (description + glossary)
    const [_objectNum, setObjectNum] = useState(3)
    const [sideActiveDescription, setSideActiveDescription] = useState(false);
    const [sideActiveGloss, setSideActiveGloss] = useState(false);

    function openSideDesc() {
        setSideActiveDescription(!sideActiveDescription);
/*        if (_objectNum == 3) {
            setObjectNum(() => 2)
        } else {
            setObjectNum(() => 3)
        }*/
    }

    function openSideGloss() {
        setSideActiveGloss(!sideActiveGloss);
    }

    function myFunction() {
        document.getElementById("myDIV").style.gridTemplateColumns = "50px 50px 50px";
    }


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
                    </div>s

                    <div className="sideBarLeft-Nav__button" onClick={openSideGloss}>
                        <p className="rotateText"> gLOSSARY.</p>
                    </div>

                </div>

                {sideActiveDescription &&
                    <ProjectDescription/>
                }

                {sideActiveGloss &&
                    <Glossary/>
                }

                <div className="mainContainerAlt">
                    <div className="dotLine"/>
                    <SpectreMain num={_objectNum}/>
                    <div className="dotLine"/>
                </div>
            </div>
        </div>
    );
}


export default App;