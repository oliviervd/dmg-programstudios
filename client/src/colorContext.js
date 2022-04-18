import {createContext} from "react";
import colorRef from "./colorRef";

const colorContext = createContext();

export function ColorProvider (children) {
    return (
        <colorContext value={{colorRef}}>
            {children}
        </colorContext>
    )
}