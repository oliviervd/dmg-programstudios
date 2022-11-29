import React, {lazy, Suspense} from "react";
import {Link} from "react-router-dom";
import {headerAbout, headerTitle} from "../utils/data_parsers";
import {useMediaQuery} from "react-responsive";

const HamburgerMenu = lazy(() => import("./HamburgerMenu"));

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
                    <Link to={"../"}>
                        <h1 className="uppercase text-center" style={{margin: 10}}>{headerTitle(props.language)}</h1>
                    </Link>
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
                    <Suspense>
                        <HamburgerMenu setLanguage={props.setLanguage} language={props.language} setAbout={props.setAbout} about={props.about}/>
                    </Suspense>
                </div>
            }

        </div>
    )
}

export default Header;