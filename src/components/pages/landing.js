import React, {Suspense} from "react";
import {Link} from "react-router-dom";
import LoginButton from "../elements/LoginButton";

const SketchLanding = React.lazy(() => import("../sketches/sketchLanding"));

const Landing = () => {

    return(
        <>
            <Link to="../home">
                <LoginButton/>
            </Link>

            <Suspense fallback={<img src="../sketches/assets/49.png" alt="DREAMING OF IMAGES"/>}>
                <SketchLanding style={{"z-index": -30000}}/>
            </Suspense>
        </>
    )
}

export default Landing;