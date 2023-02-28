import React from "react"

const AgentViewer = (props) =>  {

    let name = ""
    let sex = ""
    let birth = ""
    let _basePERS = props.agent

    if (_basePERS) {
        name = _basePERS.LDES_raw.object["https://data.vlaanderen.be/ns/persoon#volledigeNaam"]
        try {
            sex = _basePERS.LDES_raw.object["https://data.vlaanderen.be/ns/persoon#geslacht"]["@value"]
        } catch (error) {}

        try {
            birth = _basePERS.LDES_raw.object["https://data.vlaanderen.be/ns/persoon#heeftGeboorte"]
        } catch (error) {}
    }

    console.log(name)
    return(
        <div className={"grid--5_95"}>
            <div></div>
            <div>
                <div>
                    {name &&
                        <h1 className={"home"} style={{fontSize: "4vw"}}>{name}</h1>
                    }
                </div>
                <div className={"grid--4_6-ObjectViewer"}>
                    <div></div>

                    {sex != "" &&
                        <div>
                            <p className={"underlined"}>gender:</p>
                            <p>{sex}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AgentViewer;