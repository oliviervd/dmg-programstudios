import React, {createContext, useState} from "react";
import object_colors from "./data/objectsColor_20.json";

//todo: move both object_colors and nanNums to app.js

object_colors = object_colors.filter(function(entry) {
    return entry.color_names.includes("coffee") //filter objects based on picked color.
})

const spectrumContext = createContext();

export function SpectrumProvider({children}) {
    return(
        <spectrumContext.provider value={object_colors}>
            {children}
        </spectrumContext.provider>
    )
}

export default spectrumContext;