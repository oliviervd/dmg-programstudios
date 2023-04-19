import React, {useState} from "react"
import ObjectViewer from "../elements/subjectpages/ObjectViewer";
import {useNavigate, useParams} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {fetchObjectsByID, fetchRelatedObjects} from "../utils/data_parsers";
import useAgentQuery from "../hooks/useAgentQuery";
import useThesaurusQuery from "../hooks/useThesaurusQuery";
import useObjectsQuery from "../hooks/useObjectsQuery";

const ObjectPage = () => {

    const { id } = useParams();
    //MEDIA QUERIES
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 600px)'
    })

    const [details, setDetails] = useState("");
    const _pers = useAgentQuery().data;
    const _thes = useThesaurusQuery().data;
    const _objects = useObjectsQuery().data;

    let _related;
    let imageBlock

    setTimeout(()=> {
        setDetails(fetchObjectsByID(_objects, id))
    }, 1000)

    try {
        _related = fetchRelatedObjects(_objects, details, _thes);
        imageBlock = _related.map(image => (
            <img className={"related_img"}
                 src={image["iiif_image_uris"][0].replace("/full/0/default.jpg", "/400,/0/default.jpg")}
                 onClick={()=>routeChangeObject(image)}
            />
        ))
    } catch (e) {console.log(e)}


    const navigate = useNavigate()
    const routeChange = () => {
        navigate("/index/color/")
    }


    let images = ""
    try {
        images = details["iiif_image_uris"][0]
    } catch(error) {
        //console.log(error)
    }

    function routeChangeObject(input) {
        let _uri = '/index/object/' + input["objectNumber"]
        navigate(_uri)
        fetchObjectsByID(input["objectNumber"])
    }


    return(
        <div className="container">
            {isDesktopOrLaptop&&
                <div className="grid--3_4_3">
                    <h1 className="home">object</h1>
                    <div></div>
                    <h1 className="home" style={{textAlign: "right"}} onClick={()=>routeChange()}>index</h1>
                </div>
            }

            <div style={{height: "100%"}}>
                <div className="lineH"></div>
                <ObjectViewer description={true} details = {details}
                              image={images} colorStrip={false}
                              thesaurus={_thes} personen={_pers}
                              box={true}
                />
            </div>

            {isDesktopOrLaptop &&

                <div>
                    <div className={"lineH"}></div>
                    <h1 className={"home"} style={{fontSize: "18px"}}>related objects;</h1>
                    <div className={"lineH"}></div>

                    <div className={"masonry"} style={{height: "300px", overflowY:"scroll", marginLeft: "5vw", marginRight:"5vw", marginTop:"1vh"}}>
                        {imageBlock}
                    </div>
                    <div className={"lineH"}></div>

                </div>

            }

        </div>
    )
}

export default ObjectPage

