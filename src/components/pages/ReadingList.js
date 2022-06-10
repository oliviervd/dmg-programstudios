import React, { Suspense } from "react";
import useGoogleSheets from "use-google-sheets";
const XenoHeader = React.lazy(()=>(import("../elements/xenoHeader")))

const ReadingList = () => {

    const {data} = useGoogleSheets({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
        sheetsNames: ['reading_list'],
    })

    let x = JSON.stringify(data);

    return (
        <div>
            <Suspense>
                <XenoHeader header_main={true} header_nav={true}/>
            </Suspense>
            <h1 className="center">READING LIST</h1>
            <p className="center text">{x}</p>
        </div>
    )
}

export default ReadingList;