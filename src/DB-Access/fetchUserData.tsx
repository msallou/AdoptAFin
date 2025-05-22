"use server"

import { PaymentHistory } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";


export async function getCurrentUserEmail(): Promise<string | undefined> {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
        console.log('No user is currently signed in.');
        return undefined;
    }

    return data.user?.email;
}

export async function getAmountDonated(email: string) : Promise<number> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('paymentHistory')
        .select('amountPaid')
        .eq('userEmail', email)
        .eq('adoptedOrDonated', 'donated')

    if (error) {
        console.error('Error fetching amount donated:', error);
        return 0
    }

    const totalAmount = data.reduce((acc, donation) => acc + donation.amountPaid, 0);
    return totalAmount;
}

export async function getPaymentHistory(email: string, limit: number | null): Promise<PaymentHistory[]> {
    const supabase = await createClient();
    let query = supabase
        .from('paymentHistory')
        .select('*')
        .eq('userEmail', email)
        .order('purchaseDate', { ascending: false });

    if (typeof limit === 'number') {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching payment history:', error);
        return [];
    }

    return data as PaymentHistory[];
}

export async function getNumberFishAdopted(email: string) : Promise<number> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('UsersAdoptedFish')
        .select('quantity')
        .eq('user_email', email)

    if (error) {
        console.error('Error fetching number of fish adopted:', error);
        return 0;
    }

    const totalFish = data.reduce((acc, quantity) => acc + quantity.quantity, 0);

    return totalFish;
}

export async function checkIfFishAdopted(email: string, fish: string) : Promise<boolean> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('UsersAdoptedFish')
        .select('quantity')
        .eq('user_email', email)
        .eq('fish', fish)

    if (error) {
        console.error('Error checking if fish is adopted:', error);
        return false;
    }

    return data.length > 0;
}