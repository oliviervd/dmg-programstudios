import React, {Suspense, useEffect, useState} from "react";

import {createClient} from "@supabase/supabase-js";
import {
    errorHandler,
    fetchTitle,
    fetchProductionInfo,
    fetchMaterials,
    fetchCreatorInfo,
    fetchExhibitions,
    fetchObjectNumber,
    fetchDescription,
    fetchCurrentLocation,
    fetchObjectType
} from "../../utils/data_parsers";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

const ImageViewer = React.lazy(() => import("./ImageViewer"));
const ObjectViewer = (props) => {
    // declare object and its metadata (json) to be used in the viewer

    let navigate = useNavigate();

    let title = ""
    let description = ""
    let productions = ""
    let creations = ""
    let production_date = ""
    let objectNumber = ""
    let dimensions = ""
    let material = []
    let composition = ""
    let exhibitions = ""
    let location = ""
    let type = ""

    let _LDES = props.details
    let _THES = props.thesaurus
    let _PERS = props.personen
    //todo: add async function to display data -- https://www.geeksforgeeks.org/how-to-escape-try-catch-hell-in-javascript/

    //MEDIA QUERIES
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 700px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 700px)'
    })

    if (_LDES[0] && _THES){

        let _baseLDES = _LDES[0]["LDES_raw"]
        let _baseTHES = _THES
        let _basePERS = _PERS

        fetchMaterials(_baseLDES, _baseTHES, material)
        try {
            productions = fetchProductionInfo(_baseLDES, _basePERS, _baseTHES)
        } catch(error) {console.log(error)}

        objectNumber = fetchObjectNumber(_baseLDES)
        title = fetchTitle(_baseLDES)
        location = fetchCurrentLocation(_baseLDES)

        try{
            type = fetchObjectType(_baseLDES, _baseTHES)
        } catch (error) {console.log(error)}

        try{ // description
            description = _LDES[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"]
        } catch(error) {description = ""}

        try { // dimensions
            let height, height_unit, width, width_unit, depth, depth_unit, diamter, diameter_unit;

            function fetchDimensionValue(i) {
                return _LDES[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension"][i]["https://schema.org/value"]["@id"].split("/")[7]
            }

            function fetchDimensionUnit(i) {
                return _LDES[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension"][i]["https://schema.org/unitText"]
            }

            // DIMENSIONS = H x W x D
            if (_LDES[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension"][1]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"]["@id"] === "https://apidg.gent.be/opendata/adlib2eventstream/v1/dmg/breedte") {

                height = fetchDimensionValue(0)
                height_unit =fetchDimensionUnit(0)

                width = fetchDimensionValue(1)
                width_unit = fetchDimensionUnit(1)

                depth = fetchDimensionValue(2)
                depth_unit = fetchDimensionUnit(2)

                try{dimensions = "( H:"+height + height_unit + " / W:" + width + width_unit + " / D:" + depth + depth_unit + " )"} catch {}

                // DIMENSIONS = H x ø
            } else if (_LDES[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension"][1]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"]["@id"] === "https://apidg.gent.be/opendata/adlib2eventstream/v1/dmg/diameter") {

                height = fetchDimensionValue(0)
                height_unit =fetchDimensionUnit(0)

                diamter = fetchDimensionValue(1)
                diameter_unit = fetchDimensionUnit(1)

                try {dimensions = "( H:"+height + height_unit + " / ø:" + diamter + diameter_unit +" )"} catch {}
                // dimensions = H
            } else {
                dimensions = "( H:" + height + height_unit +")"
            }

        } catch {dimensions=""}


        try {
            creations = fetchCreatorInfo(_baseLDES, _basePERS, _baseTHES)
        } catch (error) {console.log(error)}

        try {
            exhibitions = fetchExhibitions(_baseLDES)
        } catch {}


    }

    let href_objectpage = "/index/object/" + objectNumber

    const routeChange = () => {
        navigate(href_objectpage);
    }

    //todo: add media-query to make responsive.

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
                        <div className="grid--9_1">
                            <h1 className={"home"} style={{fontSize: "4vw"}} onClick={()=>routeChange()}>{title}</h1>
                            {props.indexUI &&
                                <h3 className={"underlined"} style={{fontSize: "4vw"}} onClick={()=>props.setShowDetailUI(!props.showDetailUI)}>X</h3>
                            }

                        </div>
                        <p>objectnummer: {objectNumber}</p>
                        <div className={"grid--4_6-ObjectViewer"}>
                            <Suspense>
                                <ImageViewer media={props.image} details={props.details}/>
                            </Suspense>
                            <div></div>
                            <div style={{marginLeft: "40px", marginRight: "10vw", marginTop:"10px"}}>
                                {props.description &&
                                    <div>
                                        <p>{description}</p>
                                        <br/>
                                    </div>
                                }



                                {type != "" &&
                                    <div>
                                        <p className={"underlined"}>type:</p>
                                        {type.map(t => {
                                            return(
                                                <div>
                                                    <p>{t}</p>
                                                </div>)
                                        })}
                                        <br/>
                                    </div>

                                }

                                {creations != "" &&
                                    <div>
                                        <p className={"underlined"}>designed by:</p>
                                        {creations.map(crea => {
                                            //console.log(prod)
                                            return(
                                                <div>
                                                    {crea.creator &&
                                                        <h2>{crea.creator}</h2>
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


                                {productions != "" &&
                                    <div>
                                        <p className={"underlined"}>produced by:</p>
                                        {productions.map(prod => {
                                            //console.log(prod)
                                            return(
                                                <div>
                                                    {prod.producer &&
                                                        <h2>{prod.producer}</h2>
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

                                {dimensions != "" &&
                                    <div>
                                        <p className={"underlined"}>dimensions:</p>
                                        <p>{dimensions}</p>
                                        <br/>

                                    </div>
                                }

                                <div>
                                    {material != "" &&
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
                                </div>



                                {exhibitions != "" &&
                                    <div className={"grid--3_7"}>
                                        <p className={"underlined"}>shown in exhibitions:</p>
                                        <div>
                                            {exhibitions &&
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

                                {location != "" &&
                                    <div>
                                        <br></br>
                                        <p className={"underlined"}>current location:</p>
                                        <p>{location}</p>
                                    </div>

                                }

                            </div>
                        </div>
                    </div>

                </div>
            }
            {isMobile &&
                <div>
                    <h1 className={"home"} style={{fontSize: "6vw", padding: "5%"}} onClick={()=>routeChange()}>{title}</h1>

                    <Suspense>
                        <ImageViewer style={{padding: "5%"}}  media={props.image} details={props.details}/>
                    </Suspense>
                    <div className={props.box? "border-box": ""} style={{padding: "5%"}}>
                        {props.description &&
                            <div>
                                <p>{description}</p>
                                <br/>
                            </div>
                        }

                        {creations != "" &&
                            <div>
                                <p className={"underlined"}>designed by:</p>
                                {creations.map(crea => {
                                    //console.log(prod)
                                    return(
                                        <div>
                                            {crea.creator &&
                                                <h2>{crea.creator}</h2>
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


                        {productions != "" &&
                            <div>
                                <p className={"underlined"}>produced by:</p>
                                {productions.map(prod => {
                                    //console.log(prod)
                                    return(
                                        <div>
                                            {prod.producer &&
                                                <h2>{prod.producer}</h2>
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

                        {dimensions != "" &&
                            <div>
                                <p className={"underlined"}>dimensions:</p>
                                <p>{dimensions}</p>
                                <br/>
                            </div>
                        }

                        {type != "" &&
                            <div>
                                <p className={"underlined"}>type:</p>
                                <p>{type}</p>
                                <br/>
                            </div>

                        }

                        {material != "" &&
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

                        {exhibitions != "" &&
                            <div className={"grid--3_7"}>
                                <p className={"underlined"}>shown in exhibitions:</p>
                                <div>
                                    {exhibitions &&
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

                        {location != "" &&
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