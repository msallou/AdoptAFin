import { NavbarWrapper } from "@/components/navbar-wrapper";
import { ViewMyFish } from "./my-fish";
// import { createClient } from "@/utils/supabase/client";
// import { importFish } from "../actions";

export default async function AdoptPage() {
    // const supabase = await createClient();

    return (
        <>
            <div className="">
                <NavbarWrapper />
            </div>
            <ViewMyFish />
        </>
    )
}