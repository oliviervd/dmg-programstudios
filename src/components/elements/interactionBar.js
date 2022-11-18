import React, {lazy, Suspense} from 'react';

const DisplayTimeDate = React.lazy(()=> import("./timeGovernement"))
const GraphicArchive  = React.lazy(() => import("./GraphicArchive"))

const InteractionBar = (props) => {
    return(
        <div className='grid--even_3'>
            <p className='text-center'></p>
            <Suspense>
                <DisplayTimeDate/>
            </Suspense>
            <Suspense>
                <GraphicArchive lang={props.lang}/>
            </Suspense>
        </div>
    )
}

export default InteractionBar;
 //https://drive.google.com/uc?export=view&id=1ZS7gKTHMMLTlvQk8OJexD1PzrsuL38hk
 //https://drive.google.com/uc?export=view&id=1bMpOI8NNXwzDY0U-A7XGobGtnzVq2cPn
