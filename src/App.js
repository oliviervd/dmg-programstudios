import React, {useState, Suspense} from "react";
import {LanguageProvider} from "./components/containers/language";


const SpectreMain = React.lazy(()=> import("./components/spectre"));

function App() {

    //todo: select language

    //switch for hiding or showing the sidebar (description + glossary)
    const [_objectNum] = useState(3)

    return (
        <LanguageProvider>
                <div>

                    <div>

                        <div>
                            <Suspense>
                                <SpectreMain num={_objectNum}/>
                            </Suspense>
                            <div className="dotLine"/>
                        </div>
                    </div>
                </div>
        </LanguageProvider>
    );
}


export default App;