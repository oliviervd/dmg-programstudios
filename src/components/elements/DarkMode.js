import React from "react";

const DarkMode = (props) => {

    let switch_mode;
    if (props.darkMode) {
        switch_mode = "light mode"
    } else {
        switch_mode = "dark mode"
    }

    return(
        <p className={"text-center"} onClick={()=>props.setDarkMode(!props.darkMode)}>{switch_mode}</p>
    )
}

export default DarkMode;