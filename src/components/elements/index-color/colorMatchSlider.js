import React from "react";

const ColorMatchSlider= (props) => {
    return(
        <div className={"gridH--even_2"}>
            <input type={"range"} value={props.numberOfMatchingColors}
                   max={10} onChange={(e)=>props.setNumberOfMatchingColors(e.target.valueAsNumber)}/>
            <div className={"gridH--even_2"}>
                <h4>number of matching colors: {props.numberOfMatchingColors}</h4>
                <h4>matches found: {props.matches}</h4>
            </div>
        </div>
    )
}

export default ColorMatchSlider