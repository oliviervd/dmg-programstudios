import React, {lazy, Suspense} from 'react';

const DisplayTimeDate = React.lazy(()=> import("./timeGovernement"))
const FontChanger  = React.lazy(() => import("./FontChanger"))

const InteractionBar = () => {
    return(
        <div className='grid--even_3'>
            <p className='text-center'></p>
            <Suspense>
                <DisplayTimeDate/>
            </Suspense>
            <Suspense>
                <FontChanger/>
            </Suspense>
        </div>
    )
}

export default InteractionBar;