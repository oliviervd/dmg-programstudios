import { createClient } from '@supabase/supabase-js'
import invariant from "tiny-invariant";

export function getSupabaseBrowserClient() {
    // get the environment variables

    invariant(process.REACT_APP_SUPABASE_URL, `Supabase URL was not provided`);
    invariant(process.REACT_APP_SUPABASE_ANON_KEY, `Supabase Anon key was not provided`);

    return createClient(
        process.REACT_APP_SUPABASE_URL,
        process.REACT_APP_SUPABASE_ANON_KEY
    )

}

