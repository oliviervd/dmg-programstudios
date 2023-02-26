import React, {useEffect, useState} from "react"
import ObjectViewer from "../elements/objectviewers/ObjectViewer";
import {createClient} from "@supabase/supabase-js";
import {useNavigate, useParams} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {fetchRelatedObjects} from "../utils/data_parsers";
const supabase = createClient("https://nrjxejxbxniijbmquudy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yanhlanhieG5paWpibXF1dWR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDMwNTY0NCwiZXhwIjoxOTg5ODgxNjQ0fQ.3u7yTeQwlheX12UbEzoHMgouRHNEwhKmvWLtNgpkdBY")


const ObjectPage = () => {
    //MEDIA QUERIES
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 600px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 600px)'
    })

    const { id } = useParams()
    const [details, setDetails] = useState('');
    const [objects, setObjects] = useState('');
    const [personen, setPersonen] = useState('');
    const [thesaurus, setThesaurus] = useState("");
    const [related, setRelated] = useState("");
    const [objectRoute, setObjectRoute] = useState("");

    console.log(objectRoute)

    useEffect(()=>{
        fetchObjectsByID(id)
        fetchThesaurus()
        fetchPersonen()
        fetchAll()
    }, [])

    const navigate = useNavigate()
    const routeChange = () => {
        navigate("/index/")
    }

    async function fetchAll() {
        const { data } = await supabase
            .from("dmg_objects_LDES")
            .select("color_names, HEX_values, iiif_image_uris, objectNumber, LDES_raw",   {'head':false})
            .not("color_names", 'is', null)
        setObjects(data)
    }

    async function fetchObjectsByID(objectNumber) {
        const { data } = await supabase
            .from("dmg_objects_LDES")
            .select("LDES_raw, objectNumber, iiif_image_uris")
            .eq("objectNumber", objectNumber)
        setDetails(data)
    }

    async function fetchThesaurus() {
        const { data } = await supabase
            .from("dmg_thesaurus_LDES")
            .select("*",  {'head':false})
        setThesaurus(data)
    }

    async function fetchPersonen() {
        const { data } = await supabase
            .from("dmg_personen_LDES")
            .select("*",  {'head':false})
        setPersonen(data)
    }

    let images = ""
    try {
        images = details[0]["iiif_image_uris"][0]
    } catch(error) {
        console.log(error)
    }

    function routeChangeObject(input) {
        setObjectRoute(input["objectNumber"])
        let x = objectRoute
        console.log(objectRoute)
        let _uri = '/index/object/' + x
        if (_uri != '/index/object/') {
            console.log(_uri)
            navigate(_uri)
        }
    }

    const _related = fetchRelatedObjects(objects, details);
    console.log(_related)
    const imageBlock = _related.map(image => (
        <img
            src={image["iiif_image_uris"][0].replace("/full/0/default.jpg", "/400,/0/default.jpg")}
            onClick={()=> routeChangeObject(image)}
        />
    ))
    return(
        <div className="container">
            {isDesktopOrLaptop&&
                <div className="grid--3_4_3">
                    <h1 className="home">object</h1>
                    <div></div>
                    <h2 onClick={()=>routeChange()}>back to index</h2>
                </div>
            }

            <div style={{height: "100%"}}>
                <div className="lineH"></div>
                <ObjectViewer description={true} details = {details}
                              image={images} colorStrip={false}
                              thesaurus={thesaurus} personen={personen}
                              box={true}
                />
            </div>

            {isDesktopOrLaptop &&

                <div>
                    <div className={"lineH"}></div>
                    <p>related objects;</p>
                    <div className={"masonry"} style={{height: "300px", overflowY:"scroll", marginLeft: "40px", marginRight:"40px", marginTop:"10px"}}>
                        {imageBlock}
                    </div>
                    <div className={"lineH"}></div>

                </div>

            }

        </div>
    )
}

export default ObjectPage

