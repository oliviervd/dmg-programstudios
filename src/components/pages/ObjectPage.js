import React, {useEffect, useState} from "react"
import ObjectViewer from "../elements/objectviewers/ObjectViewer";
import {createClient} from "@supabase/supabase-js";
import {useNavigate, useParams} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
const supabase = createClient("https://nrjxejxbxniijbmquudy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yanhlanhieG5paWpibXF1dWR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDMwNTY0NCwiZXhwIjoxOTg5ODgxNjQ0fQ.3u7yTeQwlheX12UbEzoHMgouRHNEwhKmvWLtNgpkdBY")


const ObjectPage = () => {
    //MEDIA QUERIES
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 1224px)'
    })

    const { id } = useParams()
    const [details, setDetails] = useState('');
    const [personen, setPersonen] = useState('');
    const [thesaurus, setThesaurus] = useState("");

    useEffect(()=>{
        fetchObjectsByID(id)
        fetchThesaurus()
        fetchPersonen()
    }, [])

    const navigate = useNavigate()
    const routeChange = () => {
        navigate("/index/")
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

    return(
        <div className="container">
            {isDesktopOrLaptop&&
                <div className="grid--3_4_3">
                    <h1 className="home">object</h1>
                    <div></div>
                    <h2 onClick={()=>routeChange()}>back to index</h2>
                </div>
            }

            <div>
                <div className="lineH"></div>
                <ObjectViewer description={true} details = {details}
                              image={images} colorStrip={false}
                              thesaurus={thesaurus} personen={personen}
                              box={true}
                />
            </div>
        </div>
    )
}

export default ObjectPage

