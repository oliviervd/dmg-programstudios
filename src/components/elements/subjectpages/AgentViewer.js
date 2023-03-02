import React, {useState} from "react"
import {
    fetchPersWikidata,
    fetchPersGender,
    fetchPersBirth,
    fetchPersDeath
} from "../../utils/data_parsers/dataParserPers";
import {harvestWikimedia} from "../../utils/data_parsers/wikimediaHarvester";
import {fetchOeuvre} from "../../utils/data_parsers";
import {useNavigate} from "react-router-dom";

const AgentViewer = (props) =>  {

    let name = ""
    let sex = ""
    let birth = ""
    let death = ""
    let wikidataURI = ""
    let oeuvre = ""

    let _basePERS = props.agent
    let _baseLDES = props.objects
    let PERS = props.personen
    let THES = props.thesaurus

    const [objectRoute, setObjectRoute] = useState("");
    const navigate = useNavigate()



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

        try {
            oeuvre = fetchOeuvre(_baseLDES, _basePERS, PERS, THES)
            console.log(oeuvre)
        } catch (error) {}


    }

    function routeChangeObject(input) {
        let _uri = '/index/object/' + input["objectNumber"]
        setObjectRoute(_uri)
        navigate(_uri)
    }


    let imageBlock = ""
    try {
        imageBlock = oeuvre.map(image => (
            <img
                src={image["iiif_image_uris"][0].replace("/full/0/default.jpg", "/400,/0/default.jpg")}
                onClick={()=>routeChangeObject(image)}
            />
        ))
    } catch {}


    return(
        <div>
            <div className={"grid--5_95"}>
                <div></div>
                <div className={"grid--4_6"}>


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
                                                <br/>
                                            </div>
                                        }

                                        {birth.place &&
                                            <div>
                                                <p className={"underlined"}>birth place:</p>
                                                <p>{birth.place}</p>
                                                <br/>
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
                                                <br/>
                                            </div>
                                        }

                                        {death.place &&
                                            <div>
                                                <p className={"underlined"}>death place:</p>
                                                <p>{death.place}</p>
                                                <br/>
                                            </div>
                                        }
                                    </div>
                                }

                            </div>
                            <div>
                                <div className={"lineH"}></div>
                                <h2>work featured in exhibitions:</h2>
                            </div>

                        </div>

                    </div>

                    <div>
                        <div>
                            <div>
                                <div className={"masonry"} style={{height: "90vh", overflowY:"scroll", marginLeft: "5vw", marginRight:"5vw", marginTop:"1vh"}}>
                                    {imageBlock}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

        </div>
    )
}

export default AgentViewer;