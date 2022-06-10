import React, {Suspense} from "react";
import Accordion from "../elements/Accordion";
import useGoogleSheets from "use-google-sheets"

const XenoHeader = React.lazy(() => import("../elements/xenoHeader"))

const Glossary = () => {

    // connect with google sheets API.
    const {data} = useGoogleSheets({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
        sheetsNames: ['glossary']
    })

    // push objets in array
    let reTard = [];
    data.map((sub)=>{
        sub.data.map((x) => {
            //console.log(x);
            reTard.push(x);
        })
    })

    let _x = JSON.stringify(data);

    return(
        <div>
            <Suspense>
                <XenoHeader header_nav={true} header_main={true}/>
            </Suspense>

            {/* ROW1 */}

            <p className="center text">{_x}</p>

            {/*<Accordion>
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
            </Accordion>*/}

        </div>
    )
}

export default Glossary;