import {useMemo} from "react";
import {getSupabaseBrowserClient} from "../utils/SupaBaseClient";

function useSupabase() {
    return useMemo(getSupabaseBrowserClient, []);
}
export default useSupabase;