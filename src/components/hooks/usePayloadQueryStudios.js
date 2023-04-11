import React from "react";
import {useQuery} from "@tanstack/react-query"
import axios from "axios";

async function usePayloadQueryStudios() {
    const key = ["OBJECTS"]
    useQuery(key, ()=>{
        const {isLoading, data} = axios.get("/api/studios/", {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            accept: 'application/json'
        })

    })


}

export default usePayloadQueryStudios;