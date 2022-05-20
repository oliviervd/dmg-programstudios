import React, {Suspense} from "react"

const XenoHeader = React.lazy(() => import("../header+footer/xenoHeader"))


const EssayAlgoMuseum = () => {
    return(
        <div>
            <div className="headerContainer">
                <Suspense>
                    <XenoHeader/>
                </Suspense>
                <div className="languages_button_box">
                    <div className="button-lang">NL</div>
                    <div className="button-lang">EN</div>
                </div>
                <div>
                    <crypto--h1 className="center underlined">THE MUSEUM AND THE COMPUTATIONAL</crypto--h1>
                </div>
            </div>
        </div>
    );
}

export default EssayAlgoMuseum;