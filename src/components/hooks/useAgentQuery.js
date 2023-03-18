import useSupabase from "./useSupabase";
import {useQuery} from "@tanstack/react-query";
import {getAgents} from "../utils/SupabaseQueries";

function useAgentQuery() {
    const client = useSupabase()
    const key = ["AGENT"]

    return useQuery(key, async () => {
        return await getAgents(client).then(
            (result) => result.data
        )
    })
}
export default useAgentQuery;