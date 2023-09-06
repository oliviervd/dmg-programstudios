import React, {useState, useEffect} from "react"

const Loading = () => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        let timeout = setTimeout(() => setShow(true), 300)
        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return (
        <>
            {show &&
                <div className={"container__loading"}>
                    <p className={"container__loading-text rhizome fast"}>loading...</p>
                    <h1 className={"container__loading-text-overlay"}>loading...</h1>
                </div>
            }
        </>
    )
}

export default Loading;