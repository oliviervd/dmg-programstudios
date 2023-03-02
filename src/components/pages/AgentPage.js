import React, {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import {useNavigate} from "react-router-dom";
import AgentViewer from "../elements/subjectpages/AgentViewer"
import {createClient} from "@supabase/supabase-js";
import {useParams} from "react-router-dom";

const supabase = createClient("https://nrjxejxbxniijbmquudy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yanhlanhieG5paWpibXF1dWR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDMwNTY0NCwiZXhwIjoxOTg5ODgxNjQ0fQ.3u7yTeQwlheX12UbEzoHMgouRHNEwhKmvWLtNgpkdBY")

const AgentPage = () => {

    let id = useParams();
    console.log(id)

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 600px)'
    })

    const isMobile = useMediaQuery({
        query: '(max-width: 600px)'
    })

    const [personen, setPersonen] = useState("");
    const [objects, setObjects] = useState("");
    const [thesaurus, setThesaurus] = useState("");
    const [bitonal, setBitonal] = useState(true)

    useEffect(() => {
        fetchPersonen()
        fetchAgentRecordwithID(personen, id.id)
        fetchThesaurus()
        fetchAll()
    }, [])


    async function fetchPersonen() {
        const { data } = await supabase
            .from("dmg_personen_LDES")
            .select("*",  {'head':false})
        setPersonen(data)
    }

    async function fetchAll() {
        const { data } = await supabase
            .from("dmg_objects_LDES")
            .select("color_names, HEX_values, iiif_image_uris, objectNumber, LDES_raw",   {'head':false})
            .not("color_names", 'is', null)
        setObjects(data)
    }

    async function fetchThesaurus() {
        const { data } = await supabase
            .from("dmg_thesaurus_LDES")
            .select("*",  {'head':false})
        setThesaurus(data)
    }



    function fetchAgentRecordwithID(LDES, refPID) {
        let _len = LDES.length
        for (let i = 0; i < _len; i++) {
            try{
                let PID = LDES[i]["LDES_raw"]["object"]["http://www.w3.org/ns/adms#identifier"][1]["skos:notation"]["@value"]
                try {
                    if (refPID === PID) {
                        let match = LDES[i]
                        return match
                    }
                } catch(e) {}
            } catch(error) {}
        }
    }

    const _agent = fetchAgentRecordwithID(personen, id.id)

    const navigate = useNavigate()
    const routeChange = () => {
        navigate("/index/")
    }

    // fetch details on specific persons

    return(
        <div className={"container"}>
            {isDesktopOrLaptop&&
                <div className="grid--3_4_3">
                    <h1 className="home">agent</h1>
                    <div></div>
                    <h1 style={{bottom: "0px",textAlign: "right", fontSize: "20px"}} onClick={()=>routeChange()}>back to index</h1>
                </div>
            }

            <div className={"grid--even_2"}>
                <div/>
                <div className={"grid--even_2"}>
                    <p>>>> scroll this way >>>></p>
                    {bitonal &&
                        <p onClick={()=> setBitonal(!bitonal)} >◧ bitonal</p>
                    }
                    {!bitonal &&
                        <p onClick={()=> setBitonal(!bitonal)} >⧅ bitonal</p>
                    }
                </div>

            </div>

            <div style={{height: "100%"}}>
                <div className="lineH"></div>
                <AgentViewer bitonal={bitonal} agent={_agent} objects={objects} thesaurus={thesaurus} personen={personen}>

                </AgentViewer>
            </div>
        </div>
    )
}

export default AgentPage