import React from "react";

const model1_intro = "Designers today are transforming our relationship with the natural world. In rethinking the consequences " +
    "of our actions on the environment they are challenging basic assumptions that relate to modes of production, " +
    "authorship as well as redefining our relationship to nature through speculative forms of design, hinting at new possible outcomes. " +
    "Yet, we remain confronted with resource hungry museums that seem to contradict the very message we send out to our public in our exhibitions;** " +
    "This raises questions on how we can transform the museum model towards a care-taking institution. Not only of its " +
    "collections but also for its community and environment. In order to do so, we need to critically address all dimensions " +
    "of the museum, its full metabolism, starting at its core, in its collecting and archival practices."

const model1_0 = "Collections  can be indexed in many ways based on the information that can be  extracted from the collection database. " +
    "One form of indexation that is  common and often referred to as the go-to entry point when navigating " +
    "through large collections is the object and its author.  Although this  seems a logical way to approach design, " +
    "we have to be wary of how this  model evokes power structures that might not be sensible in terms of the debates that are topical today, " +
    "in which the notion of authorship is questioned in terms of its ecological impact as it implies a certain constant rethinking and production of the new. " +
    "The urge is now to reposition and seek alternative ways of knowledge productions that are concerned with the debates that are topical today, the challenges of the 21st century. "

const model1_1 = "As a counter-proposal and exploratory curatorial model, SENSE AND  SENSIBILITY, (re-)negotiates form " +
    "as a base principle for design, looking beyond the status of recognized authorship and undocumented artifacts. " +
    "This does not mean to embrace anonymity, nor the  wish to negate the role and importance of the designer but rather " +
    "to establish a mutual relationship and recognition of the other based on scales and values that are more appropriate for our current times."


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