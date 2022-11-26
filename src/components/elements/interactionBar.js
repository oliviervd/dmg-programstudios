import React, {Suspense} from 'react';

const DisplayTimeDate = React.lazy(()=> import("./timeGovernement"))
const GraphicArchive  = React.lazy(() => import("./GraphicArchive"))
const DarkMode = React.lazy(() => import("./DarkMode"))

const InteractionBar = (props) => {

    let symbol;
    if (props.carouselState) {
        symbol = "V close V"
    } else {
        symbol = "◊ open ◊";
    }

    return(
        <div className='grid--even_3'>
            <Suspense>
                <DisplayTimeDate/>
            </Suspense>
            <p className="italic text-center" onClick={()=>props.setCarouselState(!props.carouselState)}>{symbol}</p>
            <div className="grid--even_2">
                <Suspense>
                    {props.archiveShow &&
                        <GraphicArchive lang={props.lang}
                                        visualIdentity={props.visualIdentity}
                                        setVisualIdentity={props.setVisualIdentity}>
                        </GraphicArchive>
                    }
                    {!props.archiveShow &&
                        <div/>}
                </Suspense>
                <Suspense>
                    {props.darkModeShow&&
                        <DarkMode darkMode={props.darkMode} setDarkMode={props.setDarkMode}/>
                    }
                    {props.lastFetch &&
                        <p>last update: 20221125</p>
                    }
                    {!props.darkModeShow&&
                        <div/>}
                </Suspense>
            </div>
        </div>
    )
}

export default InteractionBar;