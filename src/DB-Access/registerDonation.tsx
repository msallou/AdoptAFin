import { createClient } from "@supabase/supabase-js";
import { getCurrentUserEmail } from "@/db-access/fetchUserData";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function registerDonation(amount_donated: number): Promise<string> {
    const userEmail = await getCurrentUserEmail();
    try {
        const { error } = await supabase
            .from("paymentHistory")
            .insert([
                {
                    userEmail: userEmail,
                    fishAdopted: null,
                    purchaseDate: new Date().toISOString(),
                    amountPaid: amount_donated,
                    adoptedOrDonated: "donated",
                }
            ]);

        if (error) {
            console.error("Error inserting donation record:", error);
            return "Error inserting donation record";
        }

        return "Donation record inserted successfully";
    }
    catch (error) {
        console.error("Error inserting donation record:", error);
        return "Error inserting donation record";
    }
}