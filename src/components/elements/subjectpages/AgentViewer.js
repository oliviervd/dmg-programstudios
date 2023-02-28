import React from "react"

const AgentViewer = (props) =>  {

    let name = ""
    let _basePERS = props.agent

    if (_basePERS) {
        name = _basePERS.LDES_raw.object["https://data.vlaanderen.be/ns/persoon#volledigeNaam"]
    }

    console.log(name)
    return(
        <div>
            {name &&
                <h1 className={"home"} style={{fontSize: "4vw"}}>{name}</h1>
            }
        </div>
    )
}

export default AgentViewer;