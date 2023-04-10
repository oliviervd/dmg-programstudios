import React from "react";

const usePayloadQueryMedia = async() => {
    const response = await fetch("api/media", {
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        accept: 'application/json'
    })
    return await response.json()
}

export default usePayloadQueryMedia;