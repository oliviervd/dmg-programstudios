import React from 'react';
import {Link} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

const XenoHeader = (props) => {

    let model_title;

    if (props.model === "model_1") {
        model_title = <h3 className="scroll-text"> model 1: sense and sensibility || model 1: sense and sensibility || model 1: sense and sensibility || model 1: sense and sensibility ||</h3>
    }

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const isMobileOrTablet = useMediaQuery({
        query: '(max-width: 1224px)'
    })

    return (
        <div>
            <div>

                {props.header_home &&
                    <Link to="/home" style={{ textDecoration: 'none' }}>
                        <div className="scroll-container">
                            <h1 className="scroll-text-big" style={{fontFamily:'P-ACR-AGON-Regular'}}>| STUDIO DESIGN MUSEUM GENT | </h1>
                            <h1 className="scroll-text-big" style={{fontFamily:'P-ACR-AGON-Regular'}}>| STUDIO DESIGN MUSEUM GENT | </h1>
                            <h1 className="scroll-text-big" style={{fontFamily:'P-ACR-AGON-Regular'}}>| STUDIO DESIGN MUSEUM GENT | </h1>
                            <h1 className="scroll-text-big" style={{fontFamily:'P-ACR-AGON-Regular'}}>| STUDIO DESIGN MUSEUM GENT | </h1>
                            <h1 className="scroll-text-big" style={{fontFamily:'P-ACR-AGON-Regular'}}>| STUDIO DESIGN MUSEUM GENT | </h1>
                            <h1 className="scroll-text-big" style={{fontFamily:'P-ACR-AGON-Regular'}}>| STUDIO DESIGN MUSEUM GENT | </h1>
                        </div>
                    </Link>
                }

                {props.header_main &&
                    <Link to="/home" style={{ textDecoration: 'none' }}>
                        <div className="scroll-container background__cool-to-warm-spectrum">
                            <h1 className="scroll-text" style={{fontFamily:'P-ACR-AGON-Regular'}}>| STUDIO DIGITAL | </h1>
                            <h1 className="scroll-text" style={{fontFamily:'P-ACR-AGON-Regular'}}>| STUDIO DIGITAL | </h1>
                            <h1 className="scroll-text" style={{fontFamily:'P-ACR-AGON-Regular'}}>| STUDIO DIGITAL | </h1>
                            <h1 className="scroll-text" style={{fontFamily:'P-ACR-AGON-Regular'}}>| STUDIO DIGITAL | </h1>
                            <h1 className="scroll-text" style={{fontFamily:'P-ACR-AGON-Regular'}}>| STUDIO DIGITAL | </h1>
                            <h1 className="scroll-text" style={{fontFamily:'P-ACR-AGON-Regular'}}>| STUDIO DIGITAL | </h1>
                        </div>
                    </Link>
                }

                {props.header_models &&
                    <div className="scroll-container " style={{background: "#f1f1f1"}}>
                        <h2 className="scroll-text"> models from the past for the future | models from the past for the future | models from the past for the future | models from the past for the future |</h2>
                        <h2 className="scroll-text"> models from the past for the future | models from the past for the future | models from the past for the future | models from the past for the future |</h2>
                        <h2 className="scroll-text"> models from the past for the future | models from the past for the future | models from the past for the future | models from the past for the future |</h2>
                        <h2 className="scroll-text"> models from the past for the future | models from the past for the future | models from the past for the future | models from the past for the future |</h2>
                    </div>
                }

                {props.header_model &&
                    <div className="scroll-container background__transparent__flow ">
                        {model_title}{model_title}{model_title}{model_title}{model_title}{model_title}{model_title}{model_title}{model_title}
                    </div>
                }

                {props.header_nav &&
                    <div className="background__transparent__flow grid--even_8" style={{textAlign: "center"}}>
                        <Link to="/home">
                            <h3 className="nav--header">ABOUT</h3>
                        </Link>
                        <div></div>
                        <div><h3 className="nav--header" style={{fontFamily:'P-ACR-AGON-Regular'}}>||</h3></div>
                        <div><h3 className="nav--header">PAST(S)</h3></div>
                        <div><h3 className="nav--header">FUTURE(S)</h3></div>
                        <div><h3 className="nav--header" style={{fontFamily:'P-ACR-AGON-Regular'}}>||</h3></div>
                        <Link to="/glossary">
                            <h3 className="nav--header">GLOSSARY</h3>
                        </Link>
                        <Link to="/reading-list">
                            <h3 className="nav--header">READING LIST</h3>
                        </Link>
                    </div>
                }


            </div>

            {/*<div className="gridH--even_2 background__yellow" >
                <div className="button-lang">NL</div>
                <div className="button-lang">EN</div>
            </div>*/}


        </div>
    )
}

export default XenoHeader;