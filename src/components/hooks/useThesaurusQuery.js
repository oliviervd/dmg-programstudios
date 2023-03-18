import useSupabase from "./useSupabase";
import {useQuery} from "@tanstack/react-query";
import {getThesaurus} from "../utils/SupabaseQueries";

function useThesaurusQuery() {
    const client = useSupabase();
    const key = ["THESAURUS"]

    return useQuery(key, async () => {
        return await getThesaurus(client).then(
            (result) => result.data
        )
    })
}

export default useThesaurusQuery;