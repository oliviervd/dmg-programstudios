import * as React from "react"
import {useParams} from "react-router-dom";

const ExhibitionPage = (props) => {

    // data management
    let id = useParams(); // fetch ID from url
    console.log(id);

    return(
        <div>
            <h1>{id.id}</h1>
        </div>
    )
}

export default ExhibitionPage

