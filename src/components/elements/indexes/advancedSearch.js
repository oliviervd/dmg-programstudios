import React, {useMemo} from "react"

const AdvancedSearch = (props) => {

    const images = useMemo(() => props.queryResults, [props.queryResults]);

    let _r;
    let counter = 0


    function fetchImage(image) {
        try {
            let im = image["item"]["source"]["iiif_image_uris"][0].replace("/full/0/default.jpg", "/400,/0/default.jpg")
            counter = counter + 1
            return im
        } catch {
        }
    }

    try{
        _r = images.map(im => (
            <img
                className={"hoverImage"}
                //onClick={()=>handleImgClick(image[0])}
                //alt={'INSERT ALT HERE'} // todo: alt
                src={fetchImage(im)}
            />
        ))

    } catch(e) {
        _r = ""
    }



    return(
        <div className="grid--even" style={{width: "inherit"}}>
            <div style={{width:"inherit"}}>
                <h2>results ({counter})</h2>
                <div className={"masonry"} style={{height: "700px", overflowY:"scroll", padding: "5px"}}>
                    {_r}
                </div>
            </div>
        </div>
    )
}

export default AdvancedSearch;