import React, {useState} from "react";
import {headerAbout} from "../utils/data_parsers";

const HamburgerMenu = (props) => {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    return(
        <div>
            {hamburgerOpen &&
                <div onClick={() => setHamburgerOpen(!hamburgerOpen)}>
                    <div>▓▓OPEN▓▓</div>
                </div>
            }
            {!hamburgerOpen &&
                <div>
                    <div onClick={() => setHamburgerOpen(!hamburgerOpen)} className="button-burger">
                        <div>▓▓CLOSE▓▓</div>
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