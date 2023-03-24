import React, {useState} from "react"
import {
    fetchPersGender,
    fetchPersBirth,
    fetchPersDeath
} from "../../utils/data_parsers/dataParserPers";
import {fetchOeuvre} from "../../utils/data_parsers";
import {useNavigate} from "react-router-dom";

const AgentViewer = (props) =>  {

    let name = ""
    let sex = ""
    let birth = ""
    let death = ""
    let _bios = ""
    let wikiSnippetNl = ""
    let wikiSnippetSource = ""
    let oeuvre = ""

    let _basePERS = props.agent
    let _baseLDES = props.objects
    let PERS = props.personen
    let THES = props.thesaurus

    //console.log(wikiBios)

    const [objectRoute, setObjectRoute] = useState("");
    const navigate = useNavigate()

    //setBios(fetchBioWikipedia(props.id));


    if (_basePERS) {
        console.log(_basePERS.LDES_raw)
        name = _basePERS.LDES_raw.object["https://data.vlaanderen.be/ns/persoon#volledigeNaam"]
        try {
            sex = fetchPersGender(_basePERS)
        } catch (error) {}

        try {
            birth = fetchPersBirth(_basePERS, THES)
            console.log(birth)
        } catch (error) {}

        try {
            death = fetchPersDeath(_basePERS, THES)
            console.log(death)
        } catch (error) {}

        try {
            oeuvre = fetchOeuvre(_baseLDES, _basePERS, PERS, THES)
        } catch (error) {}

        try {
            _bios = eval('('+_basePERS["wikipedia_bios"]+')' )
            console.log(typeof _bios)
            try {
                wikiSnippetNl = _bios.nl.snippet
                wikiSnippetSource = _bios.nl.source
            } catch {}
        } catch (e) {console.log(e)}


    }

    function routeChangeObject(input) {
        let _uri = '/index/object/' + input["objectNumber"]
        setObjectRoute(_uri)
        navigate(_uri)
    }


    let imageBlock = ""
    try {
        if(props.bitonal){
            imageBlock = oeuvre.map(image => (
                <img
                    src={image["iiif_image_uris"][0].replace("/full/0/default.jpg", "/400,/0/bitonal.jpg")}
                    onClick={()=>routeChangeObject(image)}
                />
            ))
        } else {
            imageBlock = oeuvre.map(image => (
                <img
                    src={image["iiif_image_uris"][0].replace("/full/0/default.jpg", "/400,/0/default.jpg")}
                    onClick={()=>routeChangeObject(image)}
                />
            ))
        }

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
                        <div className={"grid--4_6-ObjectViewer"} style={{height: "30vh"}}>
                            <div></div>
                            <div>*</div>
                            <div>
                                <h2>biographical info</h2>
                                <br/>

                                {_bios != "" &&
                                    <div>
                                        <p>{wikiSnippetNl}</p>
                                        <br/>
                                    </div>
                                }
                                >

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