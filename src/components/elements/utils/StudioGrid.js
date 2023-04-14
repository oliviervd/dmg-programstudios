import React, {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {fetchDataStudiosPayload, fetchPayloadMediaById} from "../../utils/data_parsers";
import {wait} from "../../utils/utils";
import axios from "axios";

const StudioGrid = (props) => {


    let navigate = useNavigate();

    const keyStudios = ["STUDIOS"]
    const {data, isLoading} =  useQuery(keyStudios, ()=>{
        return axios.get("/api/studios/", {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            accept: 'application/json'
        })

    })

    const keyMedia = ["MEDIA"]
    const media = useQuery(keyMedia, () => {
        return axios.get("/api/media/", {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            accept: 'application/json'
        })
    })

    if (data) {
        console.log(data)
        return(
            <div style={{paddingLeft: "1vh", paddingRight: "1vh"}}
                 className={"lineH grid--even_4 HomeProjectGridContainer"}>
                 {data?.data.docs.map((studio => {
                    let title_en, description, studioImage, studioID, href;

                    title_en = fetchDataStudiosPayload(studio, props.language, "title")
                    description = fetchDataStudiosPayload(studio, props.language, "description")
                    console.log(description)
                    studioImage = fetchPayloadMediaById(studio.coverImage.id, media.data.data.docs)
                    console.log(studioImage)
                    studioID = ""

                    href = ""
                    //href = "/studio/" + studio.title_en.split(" ")[1].toLowerCase();

                    const routeChange = () => {
                        navigate(href);
                    }
                    return (
                        <div id="HomeProjectGrid" className="rowScroll fade-in open">
                            <div>
                                <h2 className="text-center uppercase box-title grow main"
                                    onClick={routeChange}>{title_en}</h2>
                                <p className="uppercase justify padding-10"
                                   style={{height: '10vh'}}>{description}</p>
                                <img className="img__fit center" alt={""} src={studioImage}
                                    //onClick={() => props.setCarouselState(!props.carouselState)}
                                />
                            </div>
                        </div>
                    )

                }))}
            </div>
        )
    } else {
        return(
                <div style={{paddingLeft: "1vh", paddingRight: "1vh"}}>
                     <p>loading..</p>
                </div>
        )
    }
}

export default StudioGrid