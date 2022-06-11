import React, {useState, Suspense} from "react";

const XenoHeader = React.lazy(() => import("./components/elements/xenoHeader"));
const SpectreMain = React.lazy(()=> import("./components/spectre"));
const XenoFooter = React.lazy(() => import("./components/elements/xenoFooter"))

function App() {

    //todo: select language

    //switch for hiding or showing the sidebar (description + glossary)
    const [_objectNum] = useState(3)

    return (
        <div>
            <Suspense>
                <XenoHeader header_main={true} header_models={false} header_model={true} model="model_1" header_nav={true}/>
            </Suspense>

            <div>

                <div>
                    <Suspense>
                        <SpectreMain num={_objectNum}/>
                    </Suspense>
                    <div className="dotLine"/>
                </div>
            </div>
            <Suspense>
                <XenoFooter/>
            </Suspense>

        </div>
    );
}


export default App;