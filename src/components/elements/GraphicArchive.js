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
                <div className="grid--even_3 graphicArchiveBox">
                    <div/>
                    <div/>
                    <div>
                        <div className="borderLine-top">
                            <ul className='italic'>protagonist #1</ul>
                            <ul className='italic'>protagonist #2</ul>
                            <ul className='italic'>protagonist #3</ul>
                            <ul className='italic'>protagonist #4</ul>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default GraphicArchive;