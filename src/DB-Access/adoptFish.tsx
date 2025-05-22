import { createClient } from "@supabase/supabase-js";
import { getCurrentUserEmail } from "@/db-access/fetchUserData";
import { FishProps } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function adoptFish(fishArray: { fish: string, price: number, image: string, x_cor: number, y_cor: number, species: string, quantity: number, fish_link: string }[]): Promise<string> {
    try {
        const userEmail = await getCurrentUserEmail();

        for (const fish of fishArray) {
            // Check if the fish already exists for this user
            const { data: existingFish, error: fetchError } = await supabase
                .from("UsersAdoptedFish")
                .select("quantity")
                .eq("user_email", userEmail)
                .eq("fish", fish.fish)
                .single();

            if (fetchError && fetchError.code !== "PGRST116") { // Ignore "no rows found" error
                throw fetchError;
            }

            if (existingFish) {
                // If fish already exists, update quantity
                const { error: updateError } = await supabase
                    .from("UsersAdoptedFish")
                    .update({ quantity: existingFish.quantity + fish.quantity })
                    .eq("user_email", userEmail)
                    .eq("fish", fish.fish);

                if (updateError) {
                    throw updateError;
                }
            } else {
                // Insert new fish if it does not exist
                const { error: insertError } = await supabase
                    .from("UsersAdoptedFish")
                    .insert([
                        {
                            user_email: userEmail,
                            fish_link: fish.fish,
                            fish: fish.fish,
                            quantity: fish.quantity,
                        }
                    ]);

                if (insertError) {
                    throw insertError;
                }
            }
        }

        // add a new instance to the payment history
        const { error: paymentInsertError } = await supabase
            .from("paymentHistory")
            .insert([
                {
                    userEmail: userEmail,
                    fishAdopted: fishArray.map(fish => ({ name: fish.fish, quantity: fish.quantity, price: fish.price })),
                    purchaseDate: new Date().toISOString(),
                    amountPaid: fishArray.reduce((total, fish) => total + fish.price * fish.quantity, 0),
                    adoptedOrDonated: "adopted",
                }
            ]);

        if (paymentInsertError) {
            console.error("Payment History Insert Error:", paymentInsertError);
            throw paymentInsertError;
        }


        return `All fish have been successfully adopted.`;
    } catch (error) {
        console.error("Error adopting fish:", error);
        throw new Error("Failed to adopt fish.");
    }
}

export async function getAdoptedFish(userId: string): Promise<FishProps[]> {
    try {
        const { data, error } = await supabase
            .from("fish")
            .select("*")
            .eq("adopted_by", userId);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error fetching adopted fish:", error);
        throw new Error("Failed to fetch adopted fish.");
    }
}