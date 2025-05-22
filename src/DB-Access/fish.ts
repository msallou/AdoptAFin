
import { FeaturedFishProps, FishProps } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export async function getFishById(fish: FeaturedFishProps) : Promise<FishProps | null> {
    const id = fish.fish_id;

    const supabase = await createClient();

    const { data: newFish }: PostgrestSingleResponse<FishProps> = await supabase
        .from("fish")
        .select()
        .eq("id", id)
        .single();

    return newFish;
}

export async function fetchFish() : Promise<FishProps[] | null> {
    const supabase = await createClient();

    const { data: fish }: PostgrestSingleResponse<FishProps[]> = await supabase
        .from("fish")
        .select()

    return fish;
}


export async function fetchFeaturedFish() : Promise<(FishProps | null)[] | null> {
    const supabase = await createClient();

    const { data: fish }: PostgrestSingleResponse<FeaturedFishProps[]> = await supabase
        .from("featuredFish")
        .select()

    if (!fish) {
        return null;
    }

    const featuredFish: (FishProps | null)[] = []

    for (const f of fish) {
        const newFish = await getFishById(f);
        featuredFish.push(newFish);
    }

    return featuredFish;
}