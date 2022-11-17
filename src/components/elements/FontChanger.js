import React, {useState} from "react";

const FontChanger = (props) => {

    const [font, setFont] = useState("KWBio27-Display");
    return(
        <div className="grid--even_5">
            <div/>
            <div/>
            <div/>
            <p onClick={()=> setFont()}>font A</p>
            <p onClick={()=> setFont()}>font B</p>
        </div>
    )
}

export default FontChanger;

