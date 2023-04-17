import React, {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {fetchDataStudiosPayload, fetchPayloadMediaById} from "../../utils/data_parsers";
import axios from "axios";

const StudioGrid = (props) => {

    let navigate = useNavigate();

    const studioData = props.data.data.docs;
    console.log(studioData);

    const keyMedia = ["MEDIA"]
    const media = useQuery(keyMedia, () => {
        return axios.get("/api/media/", {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            accept: 'application/json'
        })
    })


    return(
        <div style={{paddingLeft: "1vh", paddingRight: "1vh"}}
             className={"lineH grid--even_4 HomeProjectGridContainer"}>

             {studioData?.map((studio => {
                 console.log(studio)
                 let title_en, description, studioImage, studioID, href;

                 title_en = fetchDataStudiosPayload(studio, props.language, "title")
                 description = fetchDataStudiosPayload(studio, props.language, "description")

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
                            <img className="img__fit center" alt={""} src={""}
                                //onClick={() => props.setCarouselState(!props.carouselState)}
                            />
                        </div>
                    </div>
                )

             }))}
        </div>
    )


}

export default StudioGrid