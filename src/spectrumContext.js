import React, {createContext} from "react";
import object_colors from "./data/objectsColor_10.json";

//todo: move both object_colors and nanNums to app.js

const spectrumContext = createContext();

export function SpectrumProvider({children}) {
    return(
        <spectrumContext.provider value={object_colors}>
            {children}
        </spectrumContext.provider>
    )
}

export default spectrumContext;