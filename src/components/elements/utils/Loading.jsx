import React from "react"

const Loading = () => {
    return(
        <div className={"container__loading"}>
            <p className={"container__loading-text rhizome fast"}>loading...</p>
            <h1 className={"container__loading-text-overlay"}>loading...</h1>
        </div>
    )
}

export default Loading;