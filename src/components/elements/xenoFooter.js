import React from "react";

const XenoFooter = () => {
    return(
        <div style={{height:'120px'}}>
            <div className="dotLine"/>
            <div className="grid--3_4_3">
                <img src={require("./Logo Design Museum Gent.png")} style={{height:'150px'}}></img>
                <p>THIS IS A FOOTER</p>
                <p>A PROJECT BY..</p>
            </div>
        </div>
    )
}

export default XenoFooter;