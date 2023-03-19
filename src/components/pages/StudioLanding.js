import React, {Suspense, useState} from "react"
import {useParams} from "react-router-dom";
import {fetchTitleStudios} from "../utils/data_parsers";

const StudioLanding = (props) => {

    const InteractionBar = React.lazy(()=>import("../elements/utils/interactionBar"))
    const id = useParams(); //fetch id from URL
    const Header = React.lazy(()=> import("../elements/utils/Header"))
    const [language, setLanguage] = useState("EN");

    console.log(id.id)

    const Title = fetchTitleStudios(id.id, language, "studio")
    console.log(Title)

    return(
        <div className="full-page grid-home-main-open">


                <Suspense>
                    <Header content={Title} big={true} showAbout={false} language={language} setLanguage={setLanguage} ></Header>
                </Suspense>
                <div>

                </div>
                <div>
                    <Suspense>
                        <InteractionBar/>
                    </Suspense>
                </div>
                <div className="lineH">

                </div>
        </div>



    )
}

export default StudioLanding