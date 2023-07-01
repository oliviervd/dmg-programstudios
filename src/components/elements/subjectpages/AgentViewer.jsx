import React, {useState} from "react"
import {
    fetchPersGender,
    fetchPersBirth,
    fetchPersDeath,
} from "../../utils/data_parsers_utils/dataParserPers";
import translations from '../../data/translations.json';
import {fetchOeuvreV2, listOfParticipatedExhibitions} from "../../utils/data_parsers";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

const AgentViewer = (props) =>  {

    //MEDIA QUERIES
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 700px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 700px)'
    })

    const [language, setLanguage] = useState("EN");

    let _lang
    try{
        _lang = props.language
    } catch {
        _lang = language
    }

    // todo: clean up code and add these to translation file.
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

    let name, sex, birth, death, _bios, wikiSnippet, wikiSnippetSource, oeuvre, exhibitions = ""

    let _basePERS = props.agent
    let _baseLDES = props.objects
    let PERS = props.personen
    let THES = props.thesaurus

    const [objectRoute, setObjectRoute] = useState("");
    const navigate = useNavigate()

    // mobile
    const [openBiography, setOpenBiography] = useState(false);

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
            oeuvre = fetchOeuvreV2(_baseLDES, _basePERS, PERS, THES)
        } catch (error) {}

        try {
            exhibitions = listOfParticipatedExhibitions(oeuvre);
        } catch(e) {console.log(e)}

        let WikiSnippet = "loading";

        try {
            //todo: put in generic function.
            _bios = eval('('+_basePERS["wikipedia_bios"]+')' )
            try {
                if (props.language === "NL") {
                    if (_bios.nl.snippet != "no data") {
                        wikiSnippet = _bios.nl.snippet
                        wikiSnippetSource = _bios.nl.source
                    } else {
                        wikiSnippet = "Om meer informatie te geven over de personen en instellingen gerelateerd aan objecten uit onze collectie maakt het museum gebruik van informatie op Wikipedia. Voor deze persoon of instelling is er echter nog geen Wikipedia pagina beschikbaar."
                    }
                } else if (props.language === "EN") {
                    if (_bios.en.snippet != "no data") {
                        wikiSnippet = _bios.en.snippet
                        wikiSnippetSource = _bios.en.source
                    } else {
                        wikiSnippet = "To provide more information about the people and institutions related to objects in our collection, the museum uses information on Wikipedia. However, a Wikipedia page is not yet available for this person or institution."
                    }
                } else if (props.language === "FR") {
                    if (_bios.fr.snippet != "no data") {
                        wikiSnippet = _bios.fr.snippet
                        wikiSnippetSource = _bios.fr.source
                    } else {
                        wikiSnippet = "Pour fournir plus d'informations sur les personnes et les institutions liées aux objets de notre collection, le musée utilise les informations de Wikipedia. Cependant, il n'existe pas encore de page Wikipédia pour cette personne ou cette institution."
                    }
                }
                console.log(_bios)
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
            {isDesktopOrLaptop &&
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
                                    <div className={"masonry"} style={{height: "90vh", overflowY:"hidden", marginLeft: "5vw", marginRight:"5vw", marginTop:"1vh"}}>
                                        {imageBlock}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {isMobile &&
                <div>
                    <div>
                        <br/>
                        <div className={"grid--even_3"}>
                            <h2 className={"text-center"}>NL</h2>
                            <h2 className={"text-center"}>EN</h2>
                            <h2 className={"text-center"}>FR</h2>
                        </div>
                        <br/>
                        <div className={"lineH"}></div>



                        {name &&
                            <h1 className={"home text-center"} style={{fontSize: "10vw" ,padding: "10px"}}>{name}</h1>
                        }

                        {!openBiography &&
                            <div>
                                <div className={"lineH"}></div>
                                <br></br>
                                <h2 onClick={()=>setOpenBiography(true)}>↨ {labels[props.language][0]}</h2>
                                <br></br>
                                <div className={"lineH"}></div>
                            </div>
                        }
                        {openBiography &&
                            <div>
                                {_bios != "" &&
                                    <div style={{padding: "10px"}} >
                                        <br/>
                                        <div>
                                            <p style={{fontSize: "20px"}}>{wikiSnippet}</p>
                                            <br/>
                                        </div>
                                        <h2 onClick={()=>setOpenBiography(false)}>close</h2>
                                    </div>
                                }
                            </div>
                        }

                        <div>
                            <h2>works in the collection ({oeuvre.length})</h2>
                            <div className={"lineH"}></div>
                            <div className={"masonry"} style={{overflowY:"scroll", padding: "5px", height: "auto"}}>
                                {imageBlock}
                            </div>
                        </div>

                    </div>
                </div>
            }

        </div>
    )
}

export default AgentViewer;