import React from "react";
import {useQuery} from "@tanstack/react-query"

async function usePayloadQueryStudios() {
    const key = ["STUDIO"]
    useQuery(key, async () => {
        const [result] = await Promise.all([fetch("https://p01--admin-cms--qbt6mytl828m.code.run/api/studios/", {
            credentials: 'include',
        }).then((req) => req.json())]);
        return result;
    }, {staleTime:Infinity})
}

export default usePayloadQueryStudios;