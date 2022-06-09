import React, { Suspense } from "react";
const XenoHeader = React.lazy(()=>(import("../elements/xenoHeader")))

const ReadingList = () => {
    return (
        <div>
            <Suspense>
                <XenoHeader header_main={true} header_nav={true}/>
            </Suspense>
            <h1 className="center">READING LIST</h1>
        </div>
    )
}

export default ReadingList;