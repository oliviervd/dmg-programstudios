import React, {Suspense} from "react";
const  SketchLanding = React.lazy(() => import("../sketches/sketchLanding"));

const Landing = () => {

    return(
        <Suspense>
            <SketchLanding/>
        </Suspense>
    )
}

export default Landing;