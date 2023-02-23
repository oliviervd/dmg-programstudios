import React, {useEffect, useState} from "react";
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
    fetchCurrentLocation
    , fetchObjectType
} from "../../utils/data_parsers";
import {useNavigate} from "react-router-dom";

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
    //todo: add async function to display data -- https://www.geeksforgeeks.org/how-to-escape-try-catch-hell-in-javascript/

    if (_LDES[0]){

        let _baseLDES = _LDES[0]["LDES_raw"]

        objectNumber = fetchObjectNumber(_baseLDES)
        title = fetchTitle(_baseLDES)
        location = fetchCurrentLocation(_baseLDES)
        console.log(type);


        try{
            type = fetchObjectType(_baseLDES)
        } catch {}

        try{ // description
            description = _LDES[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"]
        } catch {description = ""}

        try{ // productiedatum
            production_date = _LDES[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
        } catch {production_date=""}

        try { // composition P46 --> has note + is composed of
            let note = _LDES[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P46_is_composed_of"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"] //fetch note
            //composition = note;
            // append note + material

        } catch {composition=''}


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

        fetchMaterials(_baseLDES, material)
        try {
            productions = fetchProductionInfo(_baseLDES)
        } catch {}

        try {
            creations = fetchCreatorInfo(_baseLDES)
        } catch {}

        try {
            exhibitions = fetchExhibitions(_baseLDES)
        } catch {}


    }

    let href_objectpage = "/index/object/" + objectNumber
    console.log(href_objectpage)
    const routeChange = () => {
        navigate(href_objectpage);
    }

    //todo: add mediaquery to make responsive.

    return (
        <div className="ObjectViewer grid--5_95">
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
                <h2>{production_date}</h2>
                <p>objectnummer: {objectNumber}</p>
                <div className={"grid--4_6"}>
                    <img src={props.image.replace("/full/0/default.jpg", "/1000,/0/default.jpg")}></img>
                    <div>
                        {props.description &&
                            <p>{description}</p>
                        }

                        <br/>

                        {type != "" &&
                            <div>
                                <p className={"underlined"}>type:</p>
                                <p>{type}</p>
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

                        <br/>

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
                            </div>
                        }

                        <br/>
                        <div className={"grid--3_7"}>
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
                            </div>
                            }
                        </div>

                        <br></br>

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
                            </div>
                        }

                        <div>
                            <p>{composition}</p>
                        </div>

                        {location != "" &&
                            <div>
                                <p className={"underlined"}>current location:</p>
                                <p>{location}</p>
                            </div>

                        }

                    </div>
                </div>
            </div>

        </div>

    )
    //fetchObjects()


}
export default ObjectViewer;