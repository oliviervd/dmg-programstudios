import React from "react";

const ProjectHomeView = (props) => {
    let varH, varW;
    const img  = props.img;
    varH = Math.random() * 1000;
    varW = Math.random() * 200;
    varH = varH + "px";
    varW = varW + "px";
    return(
        <div>
            <img className="img__thumbnail" src={img} alt={img} style={{marginLeft: varH, marginTop: varW}}/>
        </div>
    )
}

export default ProjectHomeView