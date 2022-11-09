import React from "react";
import useGoogleSheets from "use-google-sheets";
import {fetchTitle, fetchDescription, headerTitle, headerAbout, fetchImage, fetchText} from "../utils/data_parsers";
import {useState} from "react";
const Home = () => {

    const [language, setLanguage] = useState("EN");
    const [about, setAbout] = useState(false);

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
            <div className="gridH--1_5_4 full-page">
                <div className="grid--even_10">
                    <h2 className="uppercase text-center" style={{margin: 10}}>{headerTitle(language)}</h2>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <h2 className="uppercase text-center" style={{margin: 10}} onClick={() => setAbout(!about)}>{headerAbout(language)}</h2>
                    <div className="grid--even_3">
                        <h2 className="uppercase text-center" style={{margin: 10}} onClick={() => setLanguage("EN")}>EN</h2>
                        <h2 className="uppercase text-center" style={{margin: 10}} onClick={() => setLanguage("NL")}>NL</h2>
                        <h2 className="uppercase text-center" style={{margin: 10}} onClick={() => setLanguage("FR")}>FR</h2>

                    </div>

                </div>
                <div className="grid--even_3">
                    <div style={{margin: 10}}>
                        {_studios.map((text => {
                            let _text;
                            _text = fetchText(text, language, "about");
                            if (typeof _text !== "undefined"){
                                const _t = _text.map((t)=>
                                    <p className="paragraph">{t}</p>
                                )
                                console.log(_text);

                                if (about === true){
                                    return(
                                        <div className="about gridH--even_5">
                                            <p>{_t}</p>
                                        </div>
                                    )
                                }
                            }
                        }))}
                    </div>
                    <div/>
                    <div/>
                </div>

                <div className="lineH grid--even_5">
                    {_studios.map((studio => {
                        let title_en, description_en, studioImage;
                        title_en = fetchTitle(studio, language, "studio");
                        description_en = fetchDescription(studio, language, "studio");
                        studioImage = fetchImage(studio, "studio");
                        return(
                            <div className="scrollable">
                                <h2 className="text-center uppercase box-title">{title_en}</h2>
                                <img className="img__fit center" src={studioImage}/>
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