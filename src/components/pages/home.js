import React from "react";
import useGoogleSheets from "use-google-sheets";
import {fetchTitleEn, fetchDescriptionEn} from "../utils/data_parsers";

const Home = () => {

    const {data, loading, error} = useGoogleSheets({
        apiKey: "AIzaSyAhfyQ_9XDc6ajRYDy3qPXPAp8mkLKja90",
        sheetId: "1t8c2FwHlhGBXQ22zg0BRPNdElKNg5_yu8CUAMGY_hvw",
        datasheetOptions: [{id: 'Studios'}],
    });

    if (loading) {
        return <div><p>loading...</p></div>
    }

    if (error) {
        return <div><p>error!</p></div>
    }

    let _studios = [];
    data.map((x)=>{
        x.data.map((l)=>{
            _studios.push(l);
        })
    })

    return(
        <div>
            <div className="gridH--6_4 full-page">
                <div className="background__pinkLight grid--even_10">
                    <h2 className="uppercase text-center" style={{margin: 10}}>program studios</h2>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <h2 className="uppercase text-center" style={{margin: 10}}>about</h2>

                </div>
                <div className="lineH grid--even_5">
                    {_studios.map((studio => {
                        let title_en, description_en
                        title_en = fetchTitleEn(studio);
                        description_en = fetchDescriptionEn(studio);
                        console.log(title_en);
                        return(
                            <div>
                                <h2 className="text-center uppercase box-title">{title_en}</h2>
                                <p className="uppercase justify padding-10">{description_en}</p>
                            </div>
                        )

                    }))}
                </div>


            </div>
        </div>


    )
}

export default Home;