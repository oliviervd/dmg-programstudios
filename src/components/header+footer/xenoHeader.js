import React from 'react';
import {Link} from "react-router-dom";

const XenoHeader = (props) => {

    let model_title;

    if (props.model == "model_1") {
        model_title = <h3 className="scroll-text"> model 1: sense and sensibility || model 1: sense and sensibility || model 1: sense and sensibility || model 1: sense and sensibility ||</h3>
    }

    return (
        <div className="headerContainer">
            <div>

                {props.header_main &&
                    <Link to="/">
                        <div className="scroll-container">
                            <crypto--h1--large className="scroll-text"> models from the past for the future | </crypto--h1--large>
                        </div>
                    </Link>
                }

                {props.header_models &&
                    <div className="scroll-container ">
                        <h2 className="scroll-text"> SPECTRUM | the transhistorical | SPECTRUM | the current | SPECTRUM | the xeno-morphic | SPECTRUM | the past-future | SPECTRUM | the sensible | SPECTRUM | the computational |</h2>
                        <h2 className="scroll-text"> SPECTRUM | the transhistorical | SPECTRUM | the current | SPECTRUM | the xeno-morphic | SPECTRUM | the past-future | SPECTRUM | the sensible | SPECTRUM | the computational |</h2>
                        <h2 className="scroll-text"> SPECTRUM | the transhistorical | SPECTRUM | the current | SPECTRUM | the xeno-morphic | SPECTRUM | the past-future | SPECTRUM | the sensible | SPECTRUM | the computational |</h2>
                        <h2 className="scroll-text"> SPECTRUM | the transhistorical | SPECTRUM | the current | SPECTRUM | the xeno-morphic | SPECTRUM | the past-future | SPECTRUM | the sensible | SPECTRUM | the computational |</h2>
                    </div>
                }

                {props.header_model &&
                    <div className="scroll-container background__transparent__flow " style={{}}>
                        {model_title}{model_title}{model_title}{model_title}{model_title}
                    </div>
                }

            </div>

            <div className="languages_button_box">
                <div className="button-lang">NL</div>
                <div className="button-lang">EN</div>
            </div>


        </div>
    )
}

export default XenoHeader;