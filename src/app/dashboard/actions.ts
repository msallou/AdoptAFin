"use server";
import { createClient } from "@/utils/supabase/server";
import { UsersAdoptedFish } from "@/lib/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export async function getFishByName(fish: UsersAdoptedFish) : Promise<UsersAdoptedFish | null> {
    const name = fish.fish;

    const supabase = await createClient();

    const { data: newFish }: PostgrestSingleResponse<UsersAdoptedFish> = await supabase
        .from("fish")
        .select()
        .eq("fish", name)
        .single();

    return newFish;
}

export async function importFish(): Promise<{ data: UsersAdoptedFish[] | null, error: string | null }> {
  const supabase = await createClient();
  const user = supabase.auth.getUser();

  const userEmail = (await user).data.user?.email;

  const { data: fish, error } = await supabase
      .from("UsersAdoptedFish")
      .select()
      .eq("user_email", userEmail);

  if (error || !fish) {
      return { data: null, error: error?.message || "No fish found." };
  }

  const myFish: UsersAdoptedFish[] = [];
  for (const f of fish) {
      const newFish = await getFishByName(f);
      if (newFish) {
          myFish.push(newFish);
      }
  }

  return { data: myFish, error: null };
}

// export async function fetchFeaturedFish() : Promise<(FishProps | null)[] | null> {
//     const supabase = await createClient();

//     const { data: fish }: PostgrestSingleResponse<FeaturedFishProps[]> = await supabase
//         .from("featuredFish")
//         .select()

//     if (!fish) {
//         return null;
//     }

//     const featuredFish: (FishProps | null)[] = []

//     for (const f of fish) {
//         const newFish = await getFishById(f);
//         featuredFish.push(newFish);
//     }

//     return featuredFish;
// }

// export const importFish = async () => {
//   const supabase = await createClient();
//   const user = supabase.auth.getUser();

//   if (!(await user).data.user) {
//     console.log('No user is currently signed in.');
//     return { data: null, error: 'No user is currently signed in.' };
//   }

//   const userEmail = (await user).data.user?.email;

//   const { data, error } = await supabase
//     .from('UsersAdoptedFish')
//     .select('*')
//     .eq('user_email', userEmail);

//   if (error) {
//     console.error('Error fetching fish:', error);
//     return { data: null, error: error.message };
//   }

//   return { data, error: null };
// };

export const importAllFish = async () => {
  const supabase = await createClient();
  const user = supabase.auth.getUser();

  if (!(await user).data.user) {
    console.log('No user is currently signed in.');
    return { data: null, error: 'No user is currently signed in.' };
  }

  const { data, error } = await supabase
    .from('fish')
    .select('*')

  if (error) {
    console.error('Error fetching fish:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
};

export const importDonations = async () => {
  const supabase = await createClient();
  const user = supabase.auth.getUser();

  if (!(await user).data.user) {
    console.log('No user is currently signed in.');
    return { data: null, error: 'No user is currently signed in.' };
  }

  const userEmail = (await user).data.user?.email;

  const { data, error } = await supabase
    .from('donations')
    .select('*')
    .eq('user_email', userEmail);

  if (error) {
    console.error('Error fetching donations:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
};