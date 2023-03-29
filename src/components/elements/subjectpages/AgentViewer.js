import React, {useState} from "react"
import {
    fetchPersGender,
    fetchPersBirth,
    fetchPersDeath
} from "../../utils/data_parsers/dataParserPers";
import {fetchOeuvre} from "../../utils/data_parsers";
import {useNavigate} from "react-router-dom";

const AgentViewer = (props) =>  {

    let labels = {
        "EN": {
            0: "biography",
            1: "sex",
            2: "date of birth",
            3: "place of birth",
            4: "date of decease",
            5: "place of decease",
            6: "work shown in exhibitions"
        },
        "NL": {
            0: "biografie",
            1: "geslacht",
            2: "geboortedatum",
            3: "geboorteplaats",
            4: "sterfdatum",
            5: "plaats van overlijden",
            6: "werk gepresenteerd in tentoonstellingen"
        },
        "FR": {
            0: "biographie",
            1: "sex",
            2: "date de naissance",
            3: "lieu de naissance",
            4: "date de décès",
            5: "lieu de décès",
            6: "expositions présentant des œuvres"
        }
    }

    let name = ""
    let sex = ""
    let birth = ""
    let death = ""
    let _bios = ""
    let wikiSnippet = ""
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

    //todo: translate all fields.

    if (_basePERS) {
        name = _basePERS.LDES_raw.object["https://data.vlaanderen.be/ns/persoon#volledigeNaam"]
        if (name.split(",").length === 2) {
            name = name.split(",")[1] + " " + name.split(",")[0]
        } else {
            name = _basePERS.LDES_raw.object["https://data.vlaanderen.be/ns/persoon#volledigeNaam"]
        }
        try {
            sex = fetchPersGender(_basePERS)
        } catch (error) {}

        try {
            birth = fetchPersBirth(_basePERS, THES)
        } catch (error) {}

        try {
            death = fetchPersDeath(_basePERS, THES)
        } catch (error) {}

        try {
            oeuvre = fetchOeuvre(_baseLDES, _basePERS, PERS, THES)
            console.log(oeuvre);
        } catch (error) {}

        try {
            //todo: put in generic function.
            _bios = eval('('+_basePERS["wikipedia_bios"]+')' )
            try {
                if (props.language === "NL") {
                    if (_bios.nl.snippet != "no data") {
                        wikiSnippet = _bios.nl.snippet
                        wikiSnippetSource = _bios.nl.source
                    } else {
                        _bios = ""
                    }
                } else if (props.language === "EN") {
                    if (_bios.en.snippet != "no data") {
                        wikiSnippet = _bios.en.snippet
                        wikiSnippetSource = _bios.en.source
                    } else {
                        _bios = ""
                    }
                } else if (props.language === "FR") {
                    if (_bios.fr.snippet != "no data") {
                        wikiSnippet = _bios.fr.snippet
                        wikiSnippetSource = _bios.fr.source
                    } else {
                        _bios = ""
                    }
                }

            } catch {}
        } catch (e) {}


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
                                {_bios != "" &&
                                    <div>
                                        <h2>{labels[props.language][0]}</h2>
                                        <br/>

                                        <div>
                                            <p>{wikiSnippet}</p>
                                            <br/>
                                        </div>
                                    </div>

                                }

                                {sex != "" &&
                                    <div>
                                        <p className={"underlined"}>{labels[props.language][1]}:</p>
                                        <p>{sex}</p>
                                        <br/>
                                    </div>
                                }
                                {birth != "" &&
                                    <div>
                                        {birth.date &&
                                            <div>
                                                <p className={"underlined"}>{labels[props.language][2]}:</p>
                                                <p>{birth.date}</p>
                                                <br/>
                                            </div>
                                        }

                                        {birth.place &&
                                            <div>
                                                <p className={"underlined"}>{labels[props.language][3]}:</p>
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
                                                <p className={"underlined"}>{labels[props.language][4]}:</p>
                                                <p>{death.date}</p>
                                                <br/>
                                            </div>
                                        }

                                        {death.place &&
                                            <div>
                                                <p className={"underlined"}>{labels[props.language][5]}:</p>
                                                <p>{death.place}</p>
                                                <br/>
                                            </div>
                                        }
                                    </div>
                                }

                            </div>
                            <div>
                                <div className={"lineH"}></div>
                                <h2>{labels[props.language][6]}:</h2>
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