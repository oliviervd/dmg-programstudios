import React from "react";

const model1_0 = "Collections can be indexed in many ways based on the information that can be extracted from the collection database. " +
    "One form of indexation that is common and often referred to as go-to entrypoint when navigating through large collections is the object and its author. \n" +
    "Although this seems a logic way to approach design, we have to be wary of how this mode of looking also imposes a " +
    "hierarchical structure of power that transcends the qualities of the object itself. " +
    "This reign of authorship, is one that is problematic when taking in consideration the ongoing debate on sustainable forms of production as it implies a necessity for the new"

const model1_1 =
    "As a counter-proposal and alternative curatorial model, SENSE AND SENSIBILITY, (re-)negotiates form as a base principle for design and looks into fe. " +
    "the role of color as a sensorial mode of learning and relates this to current practices in the museum.  " +
    "In doing so, I don't wish to negate the role of authorship but rather establish a mutual relationship based on " +
    "scales and values that are more appropriate for our current times. ";

const Model1 = () => {
    return(
        <div>
            <h1 className="center">MODEL 1: SENSE AND SENSIBILITY</h1>
            <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}>{model1_0}</div>
            <br/>
            <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}>{model1_1}</div>

        </div>
    )
}

export default Model1;