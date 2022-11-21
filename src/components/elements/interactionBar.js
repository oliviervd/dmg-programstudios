import React, {lazy, Suspense} from 'react';

const DisplayTimeDate = React.lazy(()=> import("./timeGovernement"))
const GraphicArchive  = React.lazy(() => import("./GraphicArchive"))

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
            <Suspense>
                <GraphicArchive lang={props.lang}/>
            </Suspense>
        </div>
    )
}

export default InteractionBar;