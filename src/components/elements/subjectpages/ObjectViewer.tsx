import React, {Suspense, useState} from "react";
import {
    fetchTitle,
    fetchProductionInfo,
    fetchMaterials,
    fetchCreatorInfo,
    fetchExhibitions,
    fetchObjectNumber,
    fetchCurrentLocation,
    fetchObjectType, fetchDimensions,
    fetchAcquisitionHistory,
    fetchCollection
} from "../../utils/data_parsers";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import Loading from "../utils/Loading";
import {Link} from "react-router-dom";
import translations from '../../data/translations.json';


const ImageViewer = React.lazy(() => import("./ImageViewer"));
const ObjectViewer = (props) => {
    // declare object and its metadata (json) to be used in the viewe
    let navigate = useNavigate();

    let title: any[] = []
    let description: string = ""
    let productions: any[] = []
    let creations: string = ""
    let objectNumber: string = ""
    let dimensions: string = ""
    let material = []
    let exhibitions: string = ""
    let location: string = ""
    let type: string = ""
    let acquisition
    let collection = []

    let _LDES = props.details
    let _THES = props.thesaurus
    let _PERS = props.personen

    const [openDescription, setOpenDescription] = useState(false)
    const [openColors, setOpenColors] = useState(false)
    const [openMetadata, setOpenMetadata] = useState(false);
    const [selectColor, setSelectColor] = useState("")
    const [language, setLanguage] = useState("EN")

    let _lang
    try{
        _lang = props.language
    } catch {
        _lang = language
    }

    function translate(_term, _lang) {
        return translations[_term][_lang] // _lang = key.
    }

    //todo: add async function to display data -- https://www.geeksforgeeks.org/how-to-escape-try-catch-hell-in-javascript/

    //MEDIA QUERIES
    const isBigScreen = useMediaQuery({
            query: '(min-width: 1400px)'
    })

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 700px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 700px)'
    })

    if (_LDES && _THES){

        let _baseLDES = _LDES["LDES_raw"] // raw data for LDES (object description)
        let _baseTHES = _THES // raw data for concept list (thesaurus)
        let _basePERS = _PERS // raw data for agent list (individuals and organisations)


        try {
            collection = fetchCollection(_baseLDES, _baseTHES)
        } catch(e) {}

        fetchMaterials(_baseLDES, _baseTHES, material)
        try {
            productions = fetchProductionInfo(_baseLDES, _basePERS, _baseTHES)
        } catch(e) {}

        objectNumber = fetchObjectNumber(_baseLDES)
        title = fetchTitle(_baseLDES)
        location = fetchCurrentLocation(_baseLDES)

        try{
            type = fetchObjectType(_baseLDES, _baseTHES)
        } catch (e) {}

        try{ // description
            description = _LDES["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"]
        } catch(e) {description = ""}

        try {
            if (fetchDimensions(_baseLDES) !== undefined){
                dimensions = fetchDimensions(_baseLDES)
            }
        } catch {dimensions=""}

        try {
            creations = fetchCreatorInfo(_baseLDES, _basePERS, _baseTHES)
        } catch (e) {}

        try {
            exhibitions = fetchExhibitions(_baseLDES)
        } catch {}

        try {
            acquisition = fetchAcquisitionHistory(_baseLDES)
        } catch {}
    }

    let href_objectpage = "/index/object/" + objectNumber

    function routeToCollectionPage(id) {
        navigate("/index/collection/"+id)
    }

    function routeToAgentPage(id){
        navigate("/index/agent/"+id)
    }

    let split = false;
    if (isBigScreen && props.split) {
            split = true
    }

    // check if colors are available - if not then make sure not to parse color hex.
    let _colors = false
    try{
        if (_LDES["HEX_values"][0]){
            _colors = true
        } else { _colors = false }
    } catch(e) {console.log(e)}


    const URI = "https://data.designmuseumgent.be/id/object/"+objectNumber+".json"

    return (
        <div>
            {isDesktopOrLaptop &&
                <div className="ObjectViewer grid--5_95" style={{height: "100%"}}>
                    {props.colorStrip &&
                        <div className="LineObjectViewer" style={{borderColor: props.color}}/>
                    }
                    {!props.colorStrip &&
                        <div></div>
                    }

                    <div>
                        <div className="grid--1_1">
                            <Link className={"HeaderLinkBig home italic"} style={{fontSize: "2vw"}} to={href_objectpage}>{title}</Link>
                            {props.indexUI &&
                                <h3 className={"underlined"} style={{fontSize: "4vw"}} onClick={()=>props.setShowDetailUI(!props.showDetailUI)}>X</h3>
                            }

                        </div>
                        <p>{translate("objectNumber", _lang)}: {objectNumber}</p>
                        <div className={"grid--4_6-ObjectViewer"}>
                            <div>
                                <Suspense fallback={<Loading />}>
                                    <Suspense fallback={<Loading />}>
                                        <ImageViewer viewer={props.viewer} media={props.image} details={props.details} language={_lang}/>
                                    </Suspense>
                                    {!props.description &&
                                        <div style={{marginLeft: "28px"}}>
                                            {_colors &&
                                                <div >
                                                    {!openColors&&
                                                        <div>
                                                            <div className={"lineH"}></div>
                                                            <br></br>
                                                            <h2 onClick={()=>setOpenColors(true)}>↨ {translate("colors", _lang)}</h2>
                                                            <br></br>
                                                            <div className={"lineH"}></div>
                                                            <br></br>
                                                        </div>
                                                    }
                                                    {openColors&&
                                                        <div>
                                                            <div className={"lineH"}></div>
                                                            <div className={"grid--even_5"}>
                                                                {_LDES["HEX_values"][0].map(color=>{return(
                                                                    <div style={{
                                                                        background:color,
                                                                        margin: '10px',
                                                                        height: "2vh",
                                                                        width: "2vh"
                                                                    }}></div>
                                                                )})}
                                                            </div>
                                                            <br></br>
                                                            <h2 onClick={()=>setOpenColors(false)}>↥ {translate("close",_lang)}</h2>
                                                            <br></br>
                                                            <div className={"lineH"}></div>
                                                            <br></br>
                                                        </div>
                                                    }
                                                </div>
                                            }
                                            {!openDescription &&
                                                <div>
                                                    <div className={"lineH"}></div>
                                                    <br></br>
                                                    <h2 onClick={()=>setOpenDescription(true)}>↨ {translate("description", _lang)}</h2>
                                                    <br></br>
                                                    <div className={"lineH"}></div>
                                                    <br></br>
                                                </div>
                                            }
                                            {openDescription &&
                                                <div>
                                                    <p>{description}</p>
                                                    <br/>
                                                    <h2 onClick={()=>setOpenDescription(false)}>↥ {translate("close",_lang)}</h2>
                                                    <br/>
                                                    <div className={"lineH"}></div>
                                                    <br/>
                                                </div>
                                            }
                                        </div>

                                    }
                                </Suspense>
                            </div>

                            <div>
                            </div>
                            <div style={{paddingLeft: "40px", paddingRight: "10vw", paddingTop:"10px"}}>
                                {props.description &&
                                    <div>
                                        {!openDescription &&
                                            <div>
                                                <div className={"lineH"}></div>
                                                <br></br>
                                                <h2 onClick={()=>setOpenDescription(true)}>↨ {translate("description", _lang)}</h2>
                                                <br></br>
                                                <div className={"lineH"}></div>
                                                <br></br>
                                            </div>
                                        }
                                        {openDescription &&
                                            <div>
                                                <p style={{fontSize: "1em"}}>{description}</p>
                                                <br/>
                                                <h2 onClick={()=>setOpenDescription(false)}>↥ {translate("close",_lang)}</h2>
                                                <br/>
                                                <div className={"lineH"}></div>
                                                <br/>
                                            </div>
                                        }
                                    </div>
                                }
                                {!isBigScreen &&
                                    <div>
                                        {props.colorCubes &&
                                            <div >
                                                {!openColors&&
                                                    <div>
                                                        <div className={"lineH"}></div>
                                                        <br></br>
                                                        <h2 onClick={()=>setOpenColors(true)}>↨ {translate("colors", _lang)}</h2>
                                                        <br></br>
                                                        <div className={"lineH"}></div>
                                                        <br></br>
                                                    </div>
                                                }
                                                {openColors&&
                                                    <div>
                                                        <div className={"lineH"}></div>
                                                        <div className={"grid--even_5"}>
                                                            {_LDES["HEX_values"][0].map(color=>{return(
                                                                <div style={{
                                                                    background:color,
                                                                    margin: '10px',
                                                                    height: "5vw",
                                                                    width: "5vw"
                                                                }} onClick={()=>setSelectColor(color)} ></div>
                                                            )})}
                                                        </div>
                                                        <br></br>
                                                        <h2 onClick={()=>setOpenColors(false)}>↥ {translate("close",_lang)}</h2>
                                                        <br></br>
                                                        <div className={"lineH"}></div>
                                                        <br></br>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                }

                                <div className={split?"grid--4_2_4":""}>


                                    <div>
                                        <div className={"gridPills"}>
                                            {collection.map(col=>{return(
                                                <div className={"pillBox"} onClick={()=>{routeToCollectionPage(col)}}>
                                                    <p className={"pillContent"}>{col}</p>
                                                </div>
                                            )
                                            })}
                                        </div>
                                        <br/>
                                        <br/>
                                        {type !== "" &&
                                            <div>
                                                <p className={"underlined"}>{translate("type", _lang)}:</p>
                                                {type.map(t => {
                                                    return(
                                                        <div>
                                                            <p>{t}</p>
                                                        </div>)
                                                })}
                                                <br/>
                                            </div>
                                        }

                                        {creations !== "" &&
                                            <div>
                                                <p className={"underlined"}>{translate("designedBy", _lang)}:</p>
                                                {creations.map(crea => {
                                                    //console.log(prod)
                                                    return(
                                                        <div>
                                                            <div style={{marginTop: "0px", marginBottom: "5px"}}>
                                                                {crea.qualification &&
                                                                    <p>{crea.qualification}</p>
                                                                }
                                                                {crea.creator &&
                                                                    <h2 className={"italic"} onClick={()=> routeToAgentPage(crea.id)}>{crea.creator}</h2>
                                                                }
                                                            </div>
                                                            {crea.creation_place &&
                                                                <p>{translate("location", _lang)}: {crea.creation_place}</p>
                                                            }
                                                            {crea.date &&
                                                                <p>{translate("date", _lang)}: {crea.date}</p>
                                                            }
                                                            <br/>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }

                                        {productions !== "" &&
                                            <div>
                                                <p className={"underlined"}>{translate("producedBy", _lang)}:</p>
                                                {productions.map(prod => {
                                                    //console.log(prod)
                                                    return(
                                                        <div>
                                                            <div style={{marginTop: "0px", marginBottom: "5px"}}>
                                                                {prod.qualification &&
                                                                    <p>{prod.qualification}</p>
                                                                }
                                                                {prod.producer &&
                                                                    <h2 className={"italic"} onClick={()=> routeToAgentPage(prod.id)}>{prod.producer}</h2>
                                                                }
                                                            </div>
                                                            {prod.place &&
                                                                <p>{translate("location", _lang)}: {prod.place}</p>
                                                            }
                                                            {prod.date &&
                                                                <p>{translate("date", _lang)}: {prod.date}</p>
                                                            }
                                                            {prod.technique &&
                                                                <p>{translate('technique', _lang)}: {prod.technique}</p>
                                                            }

                                                            <br/>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }

                                        {dimensions !== "" &&
                                            <div>
                                                <p className={"underlined"}>{translate("dimensions",_lang)}:</p>
                                                <p>{dimensions}</p>
                                                <br/>

                                            </div>
                                        }
                                        <div>
                                            {material !== undefined &&
                                                <div>
                                                    <p className={"underlined"}>{translate("materials",_lang)}:</p>
                                                    <div>
                                                        {material &&
                                                            material.map(mat => {
                                                                return(
                                                                    <p>
                                                                        {mat}
                                                                    </p>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <br></br>
                                                </div>
                                            }
                                        </div>

                                        {acquisition !== undefined &&
                                            <div>
                                                <p className={"underlined"}>{translate("acquisition", _lang)}:</p>
                                                <div>
                                                    {acquisition.date &&
                                                        <p>{acquisition.date} ({acquisition.method})</p>
                                                    }
                                                    {!acquisition.date &&
                                                        <p>date unknown ({acquisition.method})</p>
                                                    }
                                                </div>
                                                <br/>
                                            </div>
                                        }

                                        {exhibitions !== "" &&
                                            <div>
                                                <p className={"underlined"}>{translate("shownInExhibitions", _lang)}:</p>
                                                <div>
                                                    {exhibitions[0] &&
                                                        exhibitions.map(exh =>{
                                                            return(
                                                                <div>
                                                                    <p>{exh.title}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <br></br>
                                            </div>
                                        }

                                        {location !== "" &&
                                            <div>
                                                <p className={"underlined"}>{translate("currentLocation", _lang)}:</p>
                                                <p>{location}</p>
                                            </div>
                                        }

                                        {!isBigScreen&&
                                            <div>
                                                <br/>
                                                {!openMetadata &&
                                                    <div>
                                                        <div className={"lineH"}></div>
                                                        <br></br>
                                                        <h2 onClick={()=>setOpenMetadata(true)}>↨ {translate("source", _lang)}</h2>
                                                        <br></br>
                                                        <div className={"lineH"}></div>
                                                        <br></br>
                                                    </div>
                                                }
                                                {openMetadata &&
                                                    <div>
                                                        <div className={"lineH"}></div>
                                                        <br></br>
                                                        <div>
                                                            <a href={URI} target="_blank">{URI}</a>
                                                        </div>
                                                        <br/>
                                                        <h2 onClick={()=>setOpenMetadata(false)} className={"underlined"}>↥ {translate("close", _lang)}</h2>
                                                        <br></br>
                                                        <div className={"lineH"}></div>
                                                    </div>
                                                }
                                            </div>

                                        }

                                    </div>
                                    <div className={"lineV"} style={{margin:"40px"}}/>
                                    <div>
                                        {isBigScreen &&
                                            <div>
                                                {props.colorCubes &&
                                                    <div >
                                                        {!openColors&&
                                                            <div>
                                                                <div className={"lineH"}></div>
                                                                <br></br>
                                                                <h2 onClick={()=>setOpenColors(true)}>↨ {translate("colors", _lang)}</h2>
                                                                <br></br>
                                                                <div className={"lineH"}></div>
                                                                <br></br>
                                                            </div>
                                                        }
                                                        {openColors&&
                                                            <div>
                                                                <div className={"lineH"}></div>
                                                                <div className={"grid--even_5"}>
                                                                    {_LDES["HEX_values"][0].map(color=>{return(
                                                                        <div style={{
                                                                            background:color,
                                                                            margin: '10px',
                                                                            height: "2vw",
                                                                            width: "2vw"
                                                                        }} onClick={()=>setSelectColor(color)} ></div>
                                                                    )})}
                                                                </div>
                                                                <br></br>
                                                                <h2 onClick={()=>setOpenColors(false)}>↥ {translate("close",_lang)}</h2>
                                                                <br></br>
                                                                <div className={"lineH"}></div>
                                                                <br></br>
                                                            </div>
                                                        }
                                                        <div>
                                                            {!openMetadata &&
                                                                <div>
                                                                    <div className={"lineH"}></div>
                                                                    <br></br>
                                                                    <h2 onClick={()=>setOpenMetadata(true)}>↨ {translate("source", _lang)}</h2>
                                                                    <br></br>
                                                                    <div className={"lineH"}></div>
                                                                    <br></br>
                                                                </div>
                                                            }
                                                            {openMetadata &&
                                                                <div>
                                                                    <div className={"lineH"}></div>
                                                                    <br></br>
                                                                    <div>
                                                                        <a href={URI} target="_blank">{URI}</a>
                                                                    </div>
                                                                    <br/>
                                                                    <h2 onClick={()=>setOpenMetadata(false)} className={"underlined"}>↥ {translate("close", _lang)}</h2>
                                                                    <br></br>
                                                                    <div className={"lineH"}></div>
                                                                </div>
                                                            }
                                                        </div>


                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>


                                </div>



                            </div>
                        </div>
                    </div>

                </div>
            }
            {isMobile &&
                <div>
                    <h1 className={"home"} style={{fontSize: "6vw", padding: "5%"}}>{title}</h1>

                    <Suspense>
                        <ImageViewer viewer={props.viewer} style={{padding: "5%"}}  media={props.image} details={props.details} language={_lang}/>
                    </Suspense>
                    <div style={{padding: "5%"}}>
                        {props.description &&
                            <div>
                                {!openDescription &&
                                    <div>
                                        <div className={"lineH"}></div>
                                        <br></br>
                                        <h2 onClick={()=>setOpenDescription(true)}>↨ description</h2>
                                        <br></br>
                                        <div className={"lineH"}></div>
                                        <br></br>
                                    </div>
                                }
                                {openDescription &&
                                    <div>
                                        <p>{description}</p>
                                        <br/>
                                        <h2 onClick={()=>setOpenDescription(false)}>↥ close</h2>
                                        <br/>
                                        <div className={"lineH"}></div>
                                        <br/>
                                    </div>
                                }

                                {props.colorCubes &&
                                    <div >
                                        {!openColors&&
                                            <div>
                                                <div className={"lineH"}></div>
                                                <br></br>
                                                <h2 onClick={()=>setOpenColors(true)}>↨ colors</h2>
                                                <br></br>
                                                <div className={"lineH"}></div>
                                                <br></br>
                                            </div>
                                        }
                                        {openColors&&
                                            <div>
                                                <div className={"lineH"}></div>
                                                <div className={"grid--even_5"}>
                                                    {_LDES["HEX_values"][0].map(color=>{return(
                                                        <div style={{
                                                            background:color,
                                                            marginLeft: "25%",
                                                            marginTop: "30%",
                                                            height: "4vh",
                                                            width: "4vh"
                                                        }} onClick={()=>setSelectColor(color)}></div>
                                                    )})}
                                                </div>
                                                <br></br>
                                                <h2 onClick={()=>setOpenColors(false)}>↥ close</h2>
                                                <br></br>
                                                <div className={"lineH"}></div>
                                                <br></br>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        }

                        {creations !== "" &&
                            <div>
                                <p className={"underlined"}>designed by:</p>
                                {creations.map(crea => {
                                    //console.log(prod)
                                    return(
                                        <div>
                                            {crea.creator &&
                                                <h2 onClick={()=> routeToAgentPage(crea.id)}>{crea.creator}</h2>
                                            }
                                            {crea.creation_place &&
                                                <p>location: {crea.creation_place}</p>
                                            }
                                            {crea.date &&
                                                <p>date: {crea.date}</p>
                                            }
                                            <br/>
                                        </div>
                                    )
                                })}
                            </div>
                        }


                        {productions !== "" &&
                            <div>
                                <p className={"underlined"}>produced by:</p>
                                {productions.map(prod => {
                                    //console.log(prod)
                                    return(
                                        <div>
                                            {prod.producer &&
                                                <h2 onClick={()=> routeToAgentPage(prod.id)}>{prod.producer}</h2>
                                            }
                                            {prod.place &&
                                                <p>location: {prod.place}</p>
                                            }
                                            {prod.date &&
                                                <p>date: {prod.date}</p>
                                            }
                                            {prod.technique &&
                                                <p>technique: {prod.technique}</p>
                                            }
                                            <br/>
                                        </div>
                                    )
                                })}
                            </div>
                        }

                        {dimensions !== "" &&
                            <div>
                                <p className={"underlined"}>dimensions:</p>
                                <p>{dimensions}</p>
                                <br/>
                            </div>
                        }

                        {type !== "" &&
                            <div>
                                <p className={"underlined"}>type:</p>
                                <p>{type}</p>
                                <br/>
                            </div>

                        }

                        {material !== "" &&
                            <div>
                                <p className={"underlined"}>materials:</p>
                                <div>
                                    {material &&
                                        material.map(mat => {
                                            return(
                                                <p>
                                                    {mat}
                                                </p>
                                            )
                                        })
                                    }
                                </div>
                                <br></br>
                            </div>
                        }

                        {acquisition !== undefined &&
                            <div>
                                <p className={"underlined"}>acquired:</p>
                                <div>
                                    <p>{acquisition.date} ({acquisition.method})</p>
                                </div>
                                <br/>
                            </div>
                        }

                        {exhibitions !== "" &&
                            <div className={"grid--3_7"}>
                                <p className={"underlined"}>shown in exhibitions:</p>
                                <div>
                                    {exhibitions[0] &&
                                        exhibitions.map(exh =>{
                                            return(
                                                <div>
                                                    <p>{exh.title}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <br></br>
                            </div>
                        }

                        {location !== "" &&
                            <div>
                                <br></br>
                                <p className={"underlined"}>current location:</p>
                                <p>{location}</p>
                            </div>

                        }
                    </div>
                </div>
            }
        </div>
    )



}
export default ObjectViewer;