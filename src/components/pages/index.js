import React from "react"

const Index = () => {
    return(
        <div className="container">
            <h1 className="home">index</h1>
            <div className="gridH--even_3" style={{height: "70vh"}}>
                <div style={{height: "100%"}}>
                    <div className="lineH"/>
                    <p>people</p>

                </div>
                <div style={{height: "100%"}}>
                    <div className="lineH"/>
                    <p>systems</p>
                    <div className="grid--even_10">
                        <h2>019</h2>
                        <h2>DESIGN MUSEUM GENT</h2>
                    </div>

                </div>
                <div style={{height: "100%"}}>
                    <div className="lineH"/>
                    <p>people</p>
                    <div className="grid--even_8">

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Index;