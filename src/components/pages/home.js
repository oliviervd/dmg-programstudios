import React, {Suspense, useState} from "react";
import {Link} from "react-router-dom";
import LanguageSelector from "../LanguageSelector";
import {Text, LanguageContext} from "../containers/language";

const XenoHeader = React.lazy(() => import("../elements/xenoHeader"))

const Home = () => {

    return(
            <div>
                <Suspense>
                    <div className="grid--2_6_2">
                        <div className="gridH--even_3">
                            <div></div>
                            <div className="grid--3_4_3">
                                <h2 className="nav--header">ABOUT</h2>
                                <Link className="nav--header" to="../M01_C01">
                                    <h2>PROJECTS</h2>
                                </Link>
                                <h2 className="nav--header">ARCHIVE</h2>

                            </div>
                            <div >

                            </div>
                        </div>
                        <XenoHeader header_home={true} header_main={false} header_models={false} header_model={false} header_nav={false}/>
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
                <div className="black-box">
                    <p className="text-white-home">
                        <Text tid="introduction-text-home"></Text>
                        Studio DMG is <u>multimedia platform</u> for collective reflection on the future, past and present of the museum.
                        All studio's reside and co-exist as part of a larger ecosystem. They mingle, converse and change accordingly.
                    </p>
                </div>
                <div className="background__transparent__flow">

                </div>

                <h1></h1>
            </div>
    )

}

export default Home;