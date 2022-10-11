import React, {Suspense, useState} from "react";
import {Link} from "react-router-dom";
import LanguageSelector from "../LanguageSelector";
import {Text, LanguageContext} from "../containers/language";
import {slide as Menu} from "react-burger-menu";
import {useMediaQuery} from "react-responsive";
import Sketch_studios from "../sketches/sketch_studios";

const XenoHeader = React.lazy(() => import("../elements/xenoHeader"))

const Home = () => {

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const isMobileOrTablet = useMediaQuery({
        query: '(max-width: 1224px)'
    })


    return(
            <div>
                <Suspense>

                    <div className="grid--2_6_2 border-dots">

                        {isDesktopOrLaptop && //don't show hamburger menu
                            <div className="gridH--even_3">
                                <div></div>
                                <div className="grid--3_4_3">
                                    <h2 className="nav--header">ABOUT</h2>
                                    <Link className="nav--header" to="../M01_C01">
                                        <h2>PROJECTS</h2>
                                    </Link>
                                    <h2 className="nav--header">ARCHIVE</h2>
                                </div>
                                <div></div>
                            </div>
                        }
                        {isMobileOrTablet && //show hamburger menu
                            <div>
                                <Menu>
                                    <a><h2 className="nav--header">ABOUT</h2></a>
                                    <a><h2 className="nav--header">PROJECTS</h2></a>
                                    <a><h2 className="nav--header">ARCHIVE</h2></a>
                                </Menu>
                            </div>
                        }

                        <XenoHeader
                            className="text-white"
                            header_home={true}
                            header_main={false}
                            header_models={false}
                            header_model={false}
                            header_nav={false}/>
                        <div className="grid--2_6_2">
                            <div/>
                            <form>
                                <label>
                                    <h2>SEARCH:</h2>
                                </label>
                                <input className="searchbox" type="text"></input>
                            </form>
                            <div/>
                        </div>
                    </div>
                </Suspense>

                <div className="rowScrollMain">

                    <Suspense fallback={<img src="../sketches/assets/49.png" alt="DREAMING OF IMAGES"/>}>
                        <Sketch_studios style={{"z-index": -30000}} />
                    </Suspense>

                    <div className="black-box">
                        <p className="text-white-home">
                            <Text tid="introduction-text-home"></Text>
                        </p>
                    </div>
                    <div className="black-box">
                        <div className="grid--even_3">
                            <div className="border-white text-center">
                                <h2 className="box-title uppercase text-center text-white"><Text tid="studio_DIG"></Text></h2>
                                <div className="lineH_dash"></div>
                                <p className="box-text text-center text-white"><Text tid="studio_DIG_intro"></Text></p>
                            </div>
                            <div className="border-white text-center">
                                <h2 className="uppercase text-center text-white"><Text tid="studio_COL"></Text></h2>
                                <div className="lineH_dash"></div>
                                <p className="box-text text-center text-white"><Text tid="studio_DIG_intro"></Text></p>
                            </div>
                            <div className="border-white text-center">
                                <h2 className="uppercase text-center text-white"><Text tid="studio_GD"></Text></h2>
                                <div className="lineH_dash"></div>
                                <p className="box-text text-center text-white"><Text tid="studio_DIG_intro"></Text></p>
                            </div>
                        </div>
                        <div className="grid--even_3">
                            <div className="border-white text-center"/>
                            <div className="border-white text-center"/>
                            <div className="border-white text-center"/>
                        </div>
                    </div>
                    <h1></h1>
                </div>
            </div>
    )

}

export default Home;