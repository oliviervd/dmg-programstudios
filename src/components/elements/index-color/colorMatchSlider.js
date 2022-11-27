import React from "react";

const ColorMatchSlider= (props) => {

    let matchNum, matchCount;
    if (props.lang === "EN") {
        matchNum = "number of matching colors: "
        matchCount = "matches found: "
    } else if (props.lang === "NL") {
        matchNum = "aantal overeenkomstige kleuren: "
        matchCount = "gevonden matches: "
    } else {
        matchNum = "nombre de couleurs assorties: "
        matchCount = "matchs trouvés: "
    }

    return(
        <div className={"gridH--even_2"}>
            <input type={"range"} value={props.numberOfMatchingColors}
                   max={10} onChange={(e)=>props.setNumberOfMatchingColors(e.target.valueAsNumber)}/>
            <div className={"gridH--even_2"}>
                <h3 style={{fontWeight: "lighter"}}>{matchNum} {props.numberOfMatchingColors}</h3>
                <h3 style={{fontWeight: "lighter"}}>{matchCount} {props.matches}</h3>
            </div>
        </div>
    )
}

export default ColorMatchSlider