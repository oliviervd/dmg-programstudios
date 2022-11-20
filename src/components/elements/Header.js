import React from "react";
import {headerAbout, headerTitle} from "../utils/data_parsers";
import HamburgerMenu from "./HamburgerMenu";

import {useMediaQuery} from "react-responsive";

const Header = props => {

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const isMobile = useMediaQuery({
        query: '(max-width: 1224px)'
    })

    return(
        <div>

            {isDesktopOrLaptop &&
                <div className="grid--even_10">
                    <h2 className="uppercase text-center" style={{margin: 10}}>{headerTitle(props.language)}</h2>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <h2 className="uppercase text-center" style={{margin: 10}} onClick={() => props.setAbout(!props.about)}>{headerAbout(props.language)}</h2>

                    <div className="grid--even_3">
                        <h2 className="uppercase text-center" style={{margin: 10}} onClick={() => props.setLanguage("EN")}>EN</h2>
                        <h2 className="uppercase text-center" style={{margin: 10}} onClick={() => props.setLanguage("NL")}>NL</h2>
                        <h2 className="uppercase text-center" style={{margin: 10}} onClick={() => props.setLanguage("FR")}>FR</h2>
                    </div>
                </div>
            }
            {isMobile &&
                //todo: change to hamburger menu.
                <div className="grid--even_4">
                    <h2 className="uppercase text-center" style={{margin: 10}}>{headerTitle(props.language)}</h2>
                    <div/>
                    <div/>
                    <HamburgerMenu/>
                </div>
            }

        </div>
    )
}

export default Header;