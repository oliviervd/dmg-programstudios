import React, {useState, useEffect} from "react"

const DisplayTimeDate = () => {

    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {

            setInterval(() => setDateState(new Date()), 300);
    }, []);


    return(
        <div className="text-center">
            <p className={"rhizome"}>{dateState.toLocaleString()}</p>
            <p></p>
        </div>
    )
}
export default DisplayTimeDate;