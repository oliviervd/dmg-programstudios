import React, {useState} from "react";

const ExhibitionIndex = (props) => {

    const [loading, setLoading] = useState(true);

    let ExhOptions;

    if (props.exhibitionList){
        const _exhCounts = {};
        try{
            for (const _exh of props.exhibitionList) {
                _exhCounts[_exh] = _exhCounts[_exh] ? _exhCounts[_exh] + 1 : 1;
            }
        } catch {}

        ExhOptions = Object.entries(_exhCounts).map(([key, i]) => (
            <p className={"grid-text-autoflow"}
               style={{color: "black"}}>
                #{key},
            </p>
        ))
        console.log(_exhCounts)
    }

    return(
        <div>
            <div style={{width:"inherit",  height: "200px",
                overflowY:"scroll"}}>
                {ExhOptions}
            </div>
        </div>
    )
}

export default ExhibitionIndex