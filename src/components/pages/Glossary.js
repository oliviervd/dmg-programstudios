import React, {Suspense} from "react";
import Accordion from "../elements/Accordion";
import useGoogleSheets from "use-google-sheets"

const XenoHeader = React.lazy(() => import("../elements/xenoHeader"))

const Glossary = () => {

    // connect with google sheets API.
    const {data} = useGoogleSheets({
        apiKey: "AIzaSyDHjinRVt4Hi3VeWbRhkq5z-jyAPsli1sg",
        sheetId: "1p8nTYZBJ4nZfyVON_v_JA_YhAWoEvfcoRwar-qfD-3E"
    })

    // push objets in array
    let reTard = [];
    data.map((sub)=>{
        sub.data.map((x) => {
            //console.log(x);
            reTard.push(x);
        })
    })

    console.log(reTard);

    return(
        <div>
            <Suspense>
                <XenoHeader header_nav={true}/>
            </Suspense>

            <Accordion>
                {reTard.map((sub) => (
                        <Accordion.Item key={sub.id}>
                            <Accordion.Collapsed id={sub.id}>
                                <h1>{sub.glossary_term}</h1>
                                <p>{sub.id}</p>
                            </Accordion.Collapsed>
                            <Accordion.Expanded>
                                <div className="grid--3_4_3">
                                    <div></div>
                                    <p style={{fontSize: "20px"}}>{sub.glossary_description}</p>
                                    <></>
                                </div>
                                <p>kin to: {sub.glossary_use}</p>
                            </Accordion.Expanded>
                        </Accordion.Item>

                ))}
            </Accordion>

        </div>
    )
}

export default Glossary;