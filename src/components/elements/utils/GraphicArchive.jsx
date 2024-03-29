import React, {useState} from "react";

const GraphicArchive = (props) => {

    let langHeaderClosed;
    const lang = props.lang;
    if(lang==='EN') {
        langHeaderClosed = "graphic archive";
    } else if(lang==='NL') {
        langHeaderClosed = "grafisch archief";
    } else {
        langHeaderClosed = "archive graphiques";
    }

    const [openArchive, setOpenArchive] = useState(false)

    function setArchive(_style) {
        props.setVisualIdentity(_style)
        setOpenArchive(!openArchive)
    }

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
                    <p className='underlined' onClick={()=>setOpenArchive(!openArchive)}>{langHeaderClosed}</p>
                </div>
                <div className="borderLine-left grid--even_3 graphicArchiveBox">
                    <div className="borderLine-left"/>
                    <div className="borderLine-left"/>
                    <div>
                        <div className="borderLine-top">
                            <p className='italic' onClick={()=>setArchive("graphic_archive_01")}>identity #1</p>
                            <p className='italic' onClick={()=>setArchive("graphic_archive_02")}>identity #2</p>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default GraphicArchive;