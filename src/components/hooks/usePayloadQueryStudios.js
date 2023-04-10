import React from "react";

const usePayloadQueryStudios = async () => {
    const response = await fetch("/api/studios", {
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        accept: 'application/json'
    })
    return await response.json()
}

export default usePayloadQueryStudios;