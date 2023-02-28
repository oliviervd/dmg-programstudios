import React from "react"
import {
    fetchPersWikidata,
    fetchPersGender,
    fetchPersBirth,
    fetchPersDeath
} from "../../utils/data_parsers/dataParserPers";
import {harvestWikimedia} from "../../utils/data_parsers/wikimediaHarvester";

const AgentViewer = (props) =>  {

    let name = ""
    let sex = ""
    let birth = ""
    let death = ""
    let wikidataURI = ""

    let _basePERS = props.agent

    if (_basePERS) {
        name = _basePERS.LDES_raw.object["https://data.vlaanderen.be/ns/persoon#volledigeNaam"]
        try {
            sex = fetchPersGender(_basePERS)
        } catch (error) {}

        try {
            birth = fetchPersBirth(_basePERS)
        } catch (error) {}

        try {
            death = fetchPersDeath(_basePERS)
        } catch (error) {}

        try {
            wikidataURI = fetchPersWikidata(_basePERS)
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
                    <div>*</div>
                    <div>
                        <h2>biographical info</h2>
                        <br/>

                        {sex != "" &&
                            <div>
                                <p className={"underlined"}>gender:</p>
                                <p>{sex}</p>
                                <br/>
                            </div>
                        }
                        {birth != "" &&
                            <div>
                                {birth.date &&
                                    <div>
                                        <p className={"underlined"}>birth date:</p>
                                        <p>{birth.date}</p>
                                    </div>
                                }

                                {birth.place &&
                                    <div>
                                        <p className={"underlined"}>birth place:</p>
                                        <p>{birth.place}</p>
                                    </div>
                                }
                            </div>
                        }

                        {death != "" &&
                            <div>
                                {death.date &&
                                    <div>
                                        <p className={"underlined"}>death date:</p>
                                        <p>{death.date}</p>
                                    </div>
                                }

                                {death.place &&
                                    <div>
                                        <p className={"underlined"}>death place:</p>
                                        <p>{death.place}</p>
                                    </div>
                                }
                            </div>
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default AgentViewer;