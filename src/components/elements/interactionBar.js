import React, {lazy, Suspense} from 'react';

const DisplayTimeDate = React.lazy(()=> import("./timeGovernement"))

const InteractionBar = () => {
    return(
        <div className='grid--even_3'>
            <p className='text-center'></p>
            <Suspense>
                <DisplayTimeDate/>
            </Suspense>
            <p className='text-center'></p>
        </div>
    )
}

export default InteractionBar;