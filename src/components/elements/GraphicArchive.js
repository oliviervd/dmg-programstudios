import React, {useState} from "react";

const GraphicArchive = (props) => {

    let langHeaderOpen, langHeaderClosed;
    const lang = props.lang;
    if(lang==='EN') {
        langHeaderOpen = "X";
        langHeaderClosed = "graphic archive";
    } else if(lang==='NL') {
        langHeaderOpen = "X";
        langHeaderClosed = "grafisch archief";
    } else {
        langHeaderOpen = "X";
        langHeaderClosed = "archive graphiques";
    }

    const [openArchive, setOpenArchive] = useState(false)

    if(!openArchive){
        return(
            <div className="grid--even_3">
                <div/>
                <div/>
                <p onClick={()=>setOpenArchive(!openArchive)}>{langHeaderClosed}</p>
            </div>
        )
    }
    if(openArchive){
        return(
            <div>
                <div className="grid--even_3">
                    <div/>
                    <div/>
                    <p onClick={()=>setOpenArchive(!openArchive)}>{langHeaderClosed}</p>
                </div>
                <div className="grid--even_3 graphicArchiveBox">
                    <div/>
                    <div/>
                    <div>
                        <div className="borderLine-top">
                            <ul>protagonist #1</ul>
                            <ul>protagonist #2</ul>
                            <ul>protagonist #3</ul>
                            <ul>protagonist #4</ul>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default GraphicArchive;