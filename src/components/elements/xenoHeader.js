import React from 'react';
import {Link} from "react-router-dom";

const XenoHeader = (props) => {

    let model_title;

    if (props.model === "model_1") {
        model_title = <h3 className="scroll-text"> model 1: sense and sensibility || model 1: sense and sensibility || model 1: sense and sensibility || model 1: sense and sensibility ||</h3>
    }

    return (
        <div>
            <div>

                {props.header_main &&
                    <Link to="/home" style={{ textDecoration: 'none' }}>
                        <div className="scroll-container background__cool-to-warm-spectrum">
                            <h1 className="scroll-text" > models from the past for the future | </h1>
                            <h1 className="scroll-text" > models from the past for the future | </h1>
                            <h1 className="scroll-text" > models from the past for the future | </h1>
                            <h1 className="scroll-text" > models from the past for the future | </h1>
                            <h1 className="scroll-text" > models from the past for the future | </h1>
                        </div>
                    </Link>
                }

                {props.header_models &&
                    <div className="scroll-container " style={{background: "#ffe600"}}>
                        <h2 className="scroll-text"> SPECTRUM | the transhistorical | SPECTRUM | the current | SPECTRUM | the xeno-morphic | SPECTRUM | the past-future | SPECTRUM | the sensible | SPECTRUM | the computational |</h2>
                        <h2 className="scroll-text"> SPECTRUM | the transhistorical | SPECTRUM | the current | SPECTRUM | the xeno-morphic | SPECTRUM | the past-future | SPECTRUM | the sensible | SPECTRUM | the computational |</h2>
                        <h2 className="scroll-text"> SPECTRUM | the transhistorical | SPECTRUM | the current | SPECTRUM | the xeno-morphic | SPECTRUM | the past-future | SPECTRUM | the sensible | SPECTRUM | the computational |</h2>
                        <h2 className="scroll-text"> SPECTRUM | the transhistorical | SPECTRUM | the current | SPECTRUM | the xeno-morphic | SPECTRUM | the past-future | SPECTRUM | the sensible | SPECTRUM | the computational |</h2>
                    </div>
                }

                {props.header_model &&
                    <div className="scroll-container background__transparent__flow ">
                        {model_title}{model_title}{model_title}{model_title}{model_title}{model_title}{model_title}{model_title}{model_title}
                    </div>
                }

                {props.header_nav &&
                    <div className="background__transparent__flow grid--even_6" style={{textAlign: "center"}}>
                        <Link to="/home">
                            <h3>ABOUT</h3>
                        </Link>
                        <div></div>
                        <div></div>
                        <div></div>
                        <Link to="/glossary">
                            <h3>GLOSSARY</h3>
                        </Link>
                        <Link to="/reading-list">
                            <h3>READING LIST</h3>
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