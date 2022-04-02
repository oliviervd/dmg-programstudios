import React from "react";

const model1_intro = "Designers today are transforming our relationship with the natural world. In rethinking the consequences " +
    "of our actions on the environment they are challenging basic assumptions that relate to modes of production, " +
    "authorship as well as redefining our relationship to nature through speculative forms of design, hinting at new possible outcomes. " +
    "Yet, we remain confronted with resource hungry museums that seem to contradict the very models we elevate in our exhibitions on sustainable and sensible design. " +
    "This raises questions on expanding the role museum as a model, a care-taking institution, " +
    "not only of its collection but also for its community and environment."

const model1_0 = "Collections can be indexed in many ways based on the information that can be extracted from their " +
    "collection databases. One form of indexation that is common and often referred to as the go-to entry point when " +
    "navigating through large collections is the object and its author. Although this seems a logical way to approach " +
    "design, we have to be wary of how this mode of looking also imposes a hierarchical structure of power that " +
    "transcends the qualities of the object itself. And how this reign of authorship is problematic when taking into " +
    "consideration the ongoing debate on sustainable forms of production as it implies a certain constant rethinking and production of the new."

const model1_1 =
    "As a counter-proposal and alternative curatorial model, SENSE AND SENSIBILITY, (re-)negotiates form as a base principle" +
    " for design and looks into for example the role of colour as a sensorial mode of learning and relates this to current " +
    "practices in the museum. In doing so, I don't wish to negate the role of authorship but rather establish a mutual " +
    "relationship based on scales and values that are more appropriate for our current times."

const Model1 = () => {
    return(
        <div>
            <h1 className="center">MODEL 1: SENSE AND SENSIBILITY</h1>
            <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_italic_master_web"}}>{model1_intro}</div>
            <br/>
            <h2 className="left box" style={{borderLeft: "3px solid black", paddingLeft: "5px"}}>__Who are we taking care for? <br/> On the Logic of Collecting and Sovereignty towards a Collection of Care.</h2>
            <br/>
            <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}>{model1_0}</div>
            <br/>
            <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}>{model1_1}</div>

        </div>
    )
}

export default Model1;