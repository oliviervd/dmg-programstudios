import React, {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import {useNavigate} from "react-router-dom";
import AgentViewer from "../elements/subjectpages/AgentViewer"
import {useParams} from "react-router-dom";
import useAgentQuery from "../hooks/useAgentQuery";
import useThesaurusQuery from "../hooks/useThesaurusQuery";
import useObjectsQuery from "../hooks/useObjectsQuery";

const AgentPage = () => {

    //* ---- UI: MEDIA QUERIES ----- *//
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 600px)'
    })

    const isMobile = useMediaQuery({
        query: '(max-width: 600px)'
    })

    //* ---- DATA MANAGEMENT ------ *//

    // fetch id from url.
    let id = useParams();

    //* ---- API (SUPABASE) CALLS --- *//
    const _pers = useAgentQuery().data;
    const _thes = useThesaurusQuery().data;
    const _objects = useObjectsQuery().data;

    let _agent;
    try {
        _agent = fetchAgentRecordwithID(_pers, id.id) // set agent based on ID
    } catch (e) {console.log(e)}

    const [personen, setPersonen] = useState("");
    const [objects, setObjects] = useState("");
    const [thesaurus, setThesaurus] = useState("");
    const [bitonal, setBitonal] = useState(false)

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
                <AgentViewer bitonal={bitonal} agent={_agent} objects={_objects} thesaurus={_thes} personen={_pers}>

                </AgentViewer>
            </div>
        </div>
    )
}

export default AgentPage