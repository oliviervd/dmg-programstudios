import React, {Suspense} from "react"
import {useParams} from "react-router-dom";

const StudioLanding = (props) => {

    const InteractionBar = React.lazy(()=>import("../elements/interactionBar"))
    const id = useParams(); //fetch id from URL

    return(
        <div className="full-page container grid-home-main-open">
                <div>
                    <h1 className="home ">studio</h1>
                    <h1 className="home ">{id.id}</h1>
                </div>
                <div>

                </div>
                <div className="lineH">
                    <Suspense>
                        <InteractionBar/>
                    </Suspense>
                </div>
                <div>

                </div>
        </div>



    )
}

export default StudioLanding