import React, {useState} from "react";
import {headerAbout} from "../utils/data_parsers";

const HamburgerMenu = (props) => {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    return(
        <div>
            {hamburgerOpen &&
                <div onClick={() => setHamburgerOpen(!hamburgerOpen)} className="button-burger"
                     aria-controls="primary-navigation" aria-expanded="false">
                    <svg className="hamburger">
                        <rect className="top" width="60" height="3" x="10" y="25"/>
                        <rect className="top" width="60" height="3" x="10" y="45"/>
                        <rect className="top" width="60" height="3" x="10" y="65"/>
                    </svg>
                </div>
            }
            {!hamburgerOpen &&
                <div>
                    <div onClick={() => setHamburgerOpen(!hamburgerOpen)} className="button-burger"
                         aria-controls="primary-navigation" aria-expanded="false">
                        <svg className="hamburger italic">
                            <rect class="burgerIcon" className="top firstBar" width="60" height="3" x="10" y="25"/>
                            <rect class="burgerIcon" className="top secondBar" width="60" height="3" x="10" y="45"/>
                            <rect class="burgerIcon" className="top" width="60" height="3" x="10" y="65"/>
                        </svg>
                    </div>
                    <div className="hamburgerMenu">
                        <div>
                            <h1 onClick={()=>props.setAbout(!props.about)} className="text-center italic">{headerAbout(props.language)}</h1>

                            <div className="grid--even_3">
                                <div/>
                                <div className="grid--even_3" style={{marginBottom:0}}>
                                    <h2 className="uppercase text-center italic" style={{margin: 10}} onClick={() => props.setLanguage("EN")}>EN</h2>
                                    <h2 className="uppercase text-center italic" style={{margin: 10}} onClick={() => props.setLanguage("NL")}>NL</h2>
                                    <h2 className="uppercase text-center italic" style={{margin: 10}} onClick={() => props.setLanguage("FR")}>FR</h2>
                                </div>
                                <div/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default HamburgerMenu;