import React from "react";
import XenoHeader from "./header+footer/xenoHeader";

const Glossary = () => {
    return(
        <div>
            <div className="headerContainer">
                <XenoHeader/>
                <div className="languages_button_box">
                    <div className="button-lang">NL</div>
                    <div className="button-lang">EN</div>
                </div>
            </div>
            <div className='glossaryContainer__main'>
                <div></div>
                <div>
                    <crypto--h1>GLOSSARY</crypto--h1>
                    <h2>XENOMORPHIC</h2>
                    <p>Meillisoux argues that one can only approach the contingent
                        "nature of the world, which he calls 'hyperchaos', by creating a toolbox in which constant change could manifest itself.
                        "As a research platform, we aim to demonstrate the changing nature of museum collections by evoking the fictions, narratives and frameworks
                        "in which these changes occur. Whether by being part of the exhibition or the lack thereof...</p>
                </div>
                <div></div>

            </div>
        </div>
    )
}

export default Glossary;