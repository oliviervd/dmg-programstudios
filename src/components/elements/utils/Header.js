import React, {lazy, Suspense} from "react";
import {useNavigate} from "react-router-dom";
import {headerAbout, headerTitle} from "../../utils/data_parsers";
import {useMediaQuery} from "react-responsive";

const HamburgerMenu = lazy(() => import("./HamburgerMenu"));

const Header = props => {

    let title = ""
    const navigate = useNavigate();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const isMobile = useMediaQuery({
        query: '(max-width: 1224px)'
    })

    if (props.showTitle) {
        if (props.big) {
            title = <div className="home  text-center" style={{margin: 10}}>{props.content}</div>
        } else if (!props.big) {
            title = <div className="home  text-center" style={{margin: 10}}>{headerTitle(props.language)}</div>
        }
    } else {
        title = <div/>
    }

    return(
        <div>
            {isDesktopOrLaptop &&
                <div className="grid--even_10">
                    {title}
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <h2 className="uppercase text-center" style={{margin: 10}} onClick={() => navigate("/index/color/")}>INDEX</h2>
                    {props.showAbout &&
                        <h2 className="uppercase text-center" style={{margin: 10}} onClick={() => props.setAbout(!props.about)}>{headerAbout(props.language)}</h2>
                    }
                    {!props.showAbout &&
                        <div/>
                    }

                    <div className="grid--even_3">
                        <h2 className="uppercase text-center" style={{margin: 10}} onClick={() => props.setLanguage("EN")}>EN</h2>
                        <h2 className="uppercase text-center" style={{margin: 10}} onClick={() => props.setLanguage("NL")}>NL</h2>
                        <h2 className="uppercase text-center" style={{margin: 10}} onClick={() => props.setLanguage("FR")}>FR</h2>
                    </div>
                </div>
            }
            {isMobile &&
                //todo: change to hamburger menu.
                <div className="grid--3_1">
                    <h2 className="home uppercase" style={{marginLeft: "3.33vw"}}>{headerTitle(props.language, true)}</h2>
                    <div>
                        <Suspense>
                            <HamburgerMenu setLanguage={props.setLanguage} language={props.language} setAbout={props.setAbout} about={props.about}/>
                        </Suspense>
                    </div>
                </div>
            }
        </div>
    )
}

export default Header;