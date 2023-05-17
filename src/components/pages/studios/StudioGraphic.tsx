import * as React from "react"

const StudioGraphicHome = () => {

    return(
        <div className={"grid--even_3"}>
            {/* // first column */}
            <div className={"gridH--1-2 lineV"}>
                <div style={{margin: "30px"}}>
                    <h1 className={"home"} style={{fontSize:"5vw", textAlign:"justify"}}>STUDIO</h1>
                    <h1 className={"home"} style={{fontSize:"5vw"}}>GRAPHIC</h1>
                </div>
                <div></div>
            </div>

            {/* // second column */}
            <div className={"lineV"} style={{height: "100vh"}}>

            </div>

            {/* // third column */}
            <div className={"lineV"} style={{height: "100vh"}}>

            </div>
        </div>
    )
}

export default StudioGraphicHome;