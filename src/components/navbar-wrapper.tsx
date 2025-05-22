
import Navbar from "./navbar";
import { createClient } from "@/utils/supabase/server";

export const NavbarWrapper = async ({ trackMouse } : { trackMouse?: boolean }) => {
    const supabase = await createClient();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();
  

    return (
        <Navbar user={user} trackMouse={trackMouse} />
    )
}