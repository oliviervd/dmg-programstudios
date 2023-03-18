import useSupabase from "../hooks/useSupabase";
import {useQuery} from "@tanstack/react-query";
import {getObjects} from "../utils/SupabaseQueries";

function useObjectsQuery() {
    const client = useSupabase();
    const key = ["OBJECTS"]

    return useQuery(key, async () => {
        return await getObjects(client).then(
            (result) => result.data
        );
    });
}

export default useObjectsQuery