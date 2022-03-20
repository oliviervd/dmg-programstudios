import {createContext, useState} from "react";

const SpectrumContext = createContext();

export function SpectrumProvider({children}) {
    return(
        <SpectrumContext.provider>
            {children}
        </SpectrumContext.provider>
    )
}

export default SpectrumContext;