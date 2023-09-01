import useSupabase from "./useSupabase";
import {useQuery} from "@tanstack/react-query";
import {getArchief} from "../utils/SupabaseQueries";

function useArchiveQuery() {
    const client = useSupabase()
    const key = ["ARCHIVE"]

    return useQuery(key, async () => {
        return await getArchief(client).then(
            (result) => result.data
        )
    })
}
export default useArchiveQuery