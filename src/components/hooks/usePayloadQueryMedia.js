import React from "react";
import {useQuery} from "@tanstack/react-query";

async function usePayloadQueryMedia()  {

    const key = ["OBJECTS"]
    const response = await fetch("/api/media/", {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        accept: 'application/json'
    })

    return useQuery(key, async () => {
        return await response.json().then(
            (result) => result.data.docs
        )
    })
}

export default usePayloadQueryMedia;