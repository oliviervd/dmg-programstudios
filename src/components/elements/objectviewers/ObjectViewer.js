import React, {useEffect, useState} from "react";
import {createClient} from "@supabase/supabase-js";
import {fetchProductionInfo, fetchMaterials} from "../../utils/data_parsers";

const ObjectViewer = (props) => {
    // declare object and its metadata (json) to be used in the viewer
    const [object, setObject] = useState("");
    const [data, setData] = useState("");

    let title = ""
    let description = ""
    let productions;
    let production_date = ""
    let producer = ""
    let creator = ""
    let objectNumber = ""
    let dimensions = ""
    let material = []
    let composition = ""

    if (props.details[0]){

        objectNumber = props.details[0]["LDES_raw"]["object"]["http://www.w3.org/ns/adms#identifier"][1]["skos:notation"]["@value"]
        title = props.details[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P102_has_title"]["@value"];
        try{ // description
            description = props.details[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"]
        } catch {description = ""}
        try{ // productiedatum
            production_date = props.details[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
        } catch {production_date=""}

        try{
            creator = props.details[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P67i_is_referred_to_by"]["http://www.cidoc-crm.org/cidoc-crm/P94i_was_created_by"]["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]["label"]["@value"]
        } catch {}

        try { // composition P46 --> has note + is composed of
            let note = props.details[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P46_is_composed_of"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"] //fetch note
            //composition = note;
            // append note + material

        } catch {composition=''}


        try { // dimensions
            let height, height_unit, width, width_unit, depth, depth_unit, diamter, diameter_unit;

            function fetchDimensionValue(i) {
                return props.details[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension"][i]["https://schema.org/value"]["@id"].split("/")[7]
            }

            function fetchDimensionUnit(i) {
                return props.details[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension"][i]["https://schema.org/unitText"]
            }

            // DIMENSIONS = H x W x D
            if (props.details[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension"][1]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"]["@id"] === "https://apidg.gent.be/opendata/adlib2eventstream/v1/dmg/breedte") {

                height = fetchDimensionValue(0)
                height_unit =fetchDimensionUnit(0)

                width = fetchDimensionValue(1)
                width_unit = fetchDimensionUnit(1)

                depth = fetchDimensionValue(2)
                depth_unit = fetchDimensionUnit(2)

                try{dimensions = "( H:"+height + height_unit + " / W:" + width + width_unit + " / D:" + depth + depth_unit + " )"} catch {}

            // DIMENSIONS = H x ø
            } else if (props.details[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension"][1]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"]["@id"] === "https://apidg.gent.be/opendata/adlib2eventstream/v1/dmg/diameter") {

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

        fetchMaterials(props.details[0]["LDES_raw"], material)
        productions = fetchProductionInfo(props.details[0]["LDES_raw"])
        console.log(productions)

    }

    return (
        <div className="ObjectViewer grid--5_95">
            <div className="LineObjectViewer" style={{borderColor: props.color}}>
                <div className="LineObjectViewer"></div>
            </div>
            <div>
                <div className="grid--9_1">
                    <h1 className={"home"} style={{fontSize: "4vw"}} onClick={()=>props.setShowDetailUI(!props.showDetailUI)}>{title}</h1>
                    <h3 className={"underlined"} style={{fontSize: "4vw"}} onClick={()=>props.setShowDetailUI(!props.showDetailUI)}>X</h3>

                </div>
                <h2>{production_date}</h2>
                <p>objectnummer: {objectNumber}</p>
                <div className={"grid--4_6"}>
                    <img src={props.image.replace("/full/0/default.jpg", "/1000,/0/default.jpg")}></img>
                    <div>
                        <p>{description}</p>

                        <br/>

                        {creator != "" &&
                            <div>
                                <p className={"underlined"}>created by:</p>
                                <h2>{creator}</h2>
                            </div>
                        }

                        <br/>

                        <div>
                            <p className={"underlined"}>produced by:</p>
                            {productions.map(prod => {
                                console.log(prod)
                                return(
                                    <div>
                                        <h2>{prod.producer}</h2>
                                        <p>location: {prod.place}</p>
                                        <p>date: {prod.date}</p>
                                        <br/>
                                    </div>
                                )
                            })}
                        </div>

                        <br/>

                        {dimensions != "" &&
                            <div>
                                <p className={"underlined"}>dimensions:</p>
                                <p>{dimensions}</p>
                            </div>
                        }

                        <br/>
                        <div className={"grid--3_7"}>
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

                        <div>
                            <p>{composition}</p>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
    //fetchObjects()


}
export default ObjectViewer;