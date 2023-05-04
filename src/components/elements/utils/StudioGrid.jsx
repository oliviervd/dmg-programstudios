import {useQuery} from "@tanstack/react-query";
import {useNavigate, Link} from "react-router-dom";
import {fetchDataStudiosPayload} from "../../utils/data_parsers";
import axios from "axios";

const StudioGrid = (props) => {
    let navigate = useNavigate();
    const studioData = props.data.docs

    const {data, isLoading, status} = useQuery({
        queryKey:['MEDIA'],
        queryFn: () =>
            fetch("https://p01--admin-cms--qbt6mytl828m.code.run/api/media/",{
                credentials:'include',
                method: 'GET'
            }).then((req)=>req.json())
    });

    return(
        <div style={{paddingLeft: "1vh", paddingRight: "1vh"}}
             className={"lineH grid--even_4 HomeProjectGridContainer"}>

             {studioData?.map((studio => {
                 let title_en, description, studioImage, studioID, href;

                 title_en = fetchDataStudiosPayload(studio, props.language, "title")
                 description = fetchDataStudiosPayload(studio, props.language, "description")
                 href = "/studio/" + title_en.split(" ")[1].toLowerCase();

                 const routeChange = () => {
                        navigate(href);
                 }
                return (
                    <div id="HomeProjectGrid" className="rowScroll fade-in open" style={{overflow: "scroll"}}>
                        <div>
                            <div style={{textAlign:"center"}}>
                                <Link className="HeaderLinkIndex uppercase" to={""} >{title_en}</Link>
                            </div>
                            <p className="uppercase justify padding-10"
                               style={{height: '10vh'}}>{description}</p>
                            {!isLoading&&
                                <img style={{maxWidth: "90%"}} className="img__fit center" alt={""} src={studio.studioImage.url}
                                    //onClick={() => props.setCarouselState(!props.carouselState)}
                                />
                            }

                        </div>
                    </div>
                )
             }))}
        </div>
    )


}

export default StudioGrid